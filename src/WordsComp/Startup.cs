using System;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.AspNetCore.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore;
using SimpleInjector.Integration.AspNetCore.Mvc;
using WordsComp.Concrete;
using WordsComp.Concrete.WordsComp.Concrete;
using WordsComp.Interfaces;
using WordsComp.Models;
using WordsComp.RestModels;
using IApplicationBuilder = Microsoft.AspNetCore.Builder.IApplicationBuilder;

// TODO: Fix when it will be available with signalR full support

namespace WordsComp
{
    public class Startup
    {
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

            if (env.IsEnvironment("Development"))
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddSignalR(options =>
            {
                options.Hubs.EnableDetailedErrors = true;
                options.Hubs.EnableJavaScriptProxies = true;
            });
            services.AddMvc();

            services.AddSingleton<IControllerActivator>(
                new SimpleInjectorControllerActivator(container));
            services.AddSingleton<IViewComponentActivator>(
                new SimpleInjectorViewComponentActivator(container));
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

            app.UseApplicationInsightsRequestTelemetry();
            app.UseApplicationInsightsExceptionTelemetry();

            app.UseWebSockets()
               .UseSignalR()
               .UseMvc()
               .UseStaticFiles()
               .UseSimpleInjectorAspNetRequestScoping(container);
               
            StartInteractionWithUser();
            Mapper.Initialize(config => config.CreateMap<UserInfo, UserModel>());
        }

        private void InitializeContainer(IApplicationBuilder app)
        {
            // Add application presentation components:
            container.RegisterMvcControllers(app);
            container.RegisterMvcViewComponents(app);

            // Cross-wire ASP.NET services (if any). For instance:
            container.RegisterSingleton(app.ApplicationServices.GetService<ILoggerFactory>());
            // NOTE: Prevent cross-wired instances as much as possible.
            // See: https://simpleinjector.org/blog/2016/07/

            container.RegisterSingleton<IServiceProvider>(container);
            container.RegisterSingleton<IUserGroupsCollector, UserGroupsCollector>();
            container.RegisterSingleton<IUserGroupsProvider, UserGroupsProvider>();
            container.RegisterSingleton<IUserInteractionAdapter, UserInteractionAdapter>();
            container.RegisterSingleton(app.ApplicationServices.GetService<IConnectionManager>);
        }

        private void StartInteractionWithUser()
        {
            var userInteractionAdapter = container.GetService<IUserInteractionAdapter>();
            userInteractionAdapter.EstablishInteractionWithClients();
        }
    }
}
