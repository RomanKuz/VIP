using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using BLogic;
using BLogic.Concrete;
using BLogic.Concrete.WordsComp.Concrete;
using BLogic.Interfaces;
using BLogic.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using SimpleInjector;
using SimpleInjector.Diagnostics;
using SimpleInjector.Integration.AspNetCore;
using WordsComp.Concrete;
using WordsComp.Concrete.Auth;
using WordsComp.Interfaces;
using WordsComp.Options;
using WordsComp.RestModels;
using IApplicationBuilder = Microsoft.AspNetCore.Builder.IApplicationBuilder;

namespace WordsComp
{
    public class Startup
    {
        private static readonly Regex guidRegex = new Regex("^/roomId=[{(]?[0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12}[)}]?&level=[1-3]$",
                                                            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        private class SimpleInjectorHubActivator : IHubActivator
        {
            private readonly Container container;

            public SimpleInjectorHubActivator(Container container)
            {
                this.container = container;
            }

            public IHub Create(HubDescriptor descriptor)
            {
                return (IHub)container.GetInstance(descriptor.HubType);
            }
        }

        private readonly Container container = new Container();

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(options => options.SignInScheme = AuthConstants.SIGN_IN_SCHEME);
            services.AddAuthorization();

            services.AddSignalR(options =>
            {
                options.Hubs.EnableDetailedErrors = true;
                options.Hubs.EnableJavaScriptProxies = true;
            });
            services.Configure<FacebookAuthOptions>(Configuration.GetSection("facebook"))
                    .Configure<GoogleAuthOptions>(Configuration.GetSection("google"))
                    .Configure<TwitterAuthOptions>(Configuration.GetSection("twitter"));
            services.AddMvc();
            services.AddSingleton<IHubActivator>(
                new SimpleInjectorHubActivator(container));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            container.Options.DefaultScopedLifestyle = new AspNetRequestLifestyle();

            InitializeContainer(app);

            container.Verify();

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            var fileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),
                env.EnvironmentName == "Development" ? @"wwwroot\dev" : @"wwwroot\dist"));

            ConfigureAuth(app);

            app.UseWebSockets()
               .UseSignalR()
               .UseDefaultFiles(new DefaultFilesOptions()
               {
                   FileProvider = fileProvider
               })
               .UseStaticFiles()
               .UseSimpleInjectorAspNetRequestScoping(container);


            // Will not work correctly for dev environment, 
            // because dev environment uses different port for ssl
            app.Use(async (context, next) =>
            {
                if (context.Request.IsHttps)
                {
                    await next();
                }
                else
                {
                    var httpsUrl = $"https://{context.Request.Host}{context.Request.Path}";
                    context.Response.Redirect(httpsUrl);
                }
            });

            app.MapWhen(context =>
            {
                var path = context.Request.Path.Value;
                return path.EndsWith(".html")
                       || path.EndsWith(".js")
                       || path.EndsWith(".css")
                       || path.EndsWith(".ico")
                       || path.EndsWith(".woff")
                       || path.EndsWith(".woff2"); // fonts
            }, config => config.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = fileProvider
            }));

            // Match requests for friends room game
            app.MapWhen(context => guidRegex.IsMatch(context.Request.Path.Value), 
                branch =>
                {
                    branch.Use((context, next) =>
                    {
                        context.Request.Path = new PathString("/index.html");
                        return next();
                    });

                    branch.UseStaticFiles(new StaticFileOptions()
                    {
                        FileProvider = fileProvider
                    });
                });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
            InitializeMapper();
            SetUpDbConnection();
            StartInteractionWithUser();
        }

        private void ConfigureAuth(IApplicationBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = false,
                AuthenticationScheme = AuthConstants.SIGN_IN_SCHEME,
                ExpireTimeSpan = TimeSpan.FromDays(30 * 4),
                SlidingExpiration = true,
                CookieHttpOnly = false,
                CookieName = "UserClaims",
                TicketDataFormat = new JWTDataFormat()
            });
        }

        private void InitializeContainer(IApplicationBuilder app)
        {
            // Cross-wire ASP.NET services (if any). For instance:
            container.RegisterSingleton(app.ApplicationServices.GetService<ILoggerFactory>());
            // NOTE: Prevent cross-wired instances as much as possible.
            // See: https://simpleinjector.org/blog/2016/07/

            container.RegisterSingleton<IServiceProvider>(container);
            container.RegisterSingleton<IUserGroupsCollector, UserGroupsCollector>();
            container.RegisterSingleton<IUserGroupsProvider, UserGroupsProvider>();
            container.RegisterSingleton<IUserInteractionAdapter, UserInteractionAdapter>();
            container.RegisterSingleton(app.ApplicationServices.GetService<IConnectionManager>);
            container.Register<IWordStorageAdapter, WordStorageAdapter>();
            container.Register<IGameProvider, GameProvider>();
            container.RegisterSingleton<IHttpContextAccessor>(new HttpContextAccessor());

            DependencyResolverHelper.RegisterDependencies(container);
            var registration = container.GetRegistration(typeof(IGameProvider)).Registration;
            registration.SuppressDiagnosticWarning(DiagnosticType.DisposableTransientComponent,
                "UserGroupsCollector is responsible for disposing the object");
        }

        private void StartInteractionWithUser()
        {
            var userInteractionAdapter = container.GetService<IUserInteractionAdapter>();
            userInteractionAdapter.EstablishInteractionWithClients();
        }

        private void InitializeMapper()
        {
            Mapper.Initialize(config =>
            {
                config.CreateMap<UserInfo, UserModel>();
                config.CreateMap<UserGroup, GroupModel>()
                    .ForMember(d => d.GroupId, opts => opts.MapFrom(s => s.GetGroupId()))
                    .ForMember(d => d.UsersList,
                               opts => opts.MapFrom(s => s.GetUsers().Select(Mapper.Map<UserModel>).ToList()));
                config.CreateMap<Score, ScoreModel>();
                config.CreateMap<TranslateVariant, TranslateVariantModel>();
                config.CreateMap<WordBL, WordModel>()
                      .ForMember(d => d.ShortWordRepresentation,
                                 opts => opts.MapFrom(s => s.GetShortWordRepresentation()));
                config.CreateMap<MoveResult, MoveResultModel>();
                config.CreateMap<Game, GameModel>();
                config.CreateMap<GameResult, GameResultModel>();

                MapperInitializerHelper.InitializeMapping(config);
            });
        }

        private void SetUpDbConnection()
        {
            MongoDbInitializerHelper.SetUpMongoClient(Configuration["connectionStrings:gameInfoDbConnectionString"]);
        }
    }
}

