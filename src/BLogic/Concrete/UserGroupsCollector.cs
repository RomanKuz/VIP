using System;
using System.Collections.Concurrent;
using System.Reactive;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Threading;
using System.Threading.Tasks;
using BLogic.Interfaces;
using BLogic.Models;
using Microsoft.Extensions.DependencyInjection;

namespace BLogic.Concrete
{
    namespace WordsComp.Concrete
    {
        public class UserGroupsCollector: IUserGroupsCollector
        {
            private static readonly string[] russionMostPopularNames = new[]
            {
                "Анастасия",
                "Мария",
                "Дарья",
                "Анна",
                "Елизавета",
                "Полина",
                "Виктория",
                "Екатерина",
                "Саша",
                "Максим",
                "Иван",
                "Артем",
                "Дмитрий",
                "Никита",
                "Михаил",
                "Даниил",
                "Егор",
                "Андрей"
            };

            private static readonly ConcurrentQueue<UserGroup> internalWaitingBeginerUserQueue;
            private static readonly ConcurrentQueue<UserGroup> internalWaitingIntermediateUserQueue;
            private static readonly ConcurrentQueue<UserGroup> internalWaitingAdvancedUserQueue;
            private static readonly ConcurrentDictionary<string, UserGroup> userGroupDictionary;
            private static readonly ConcurrentDictionary<string, UserGroup> friendsRoomsDictionary;
            private readonly IServiceProvider serviceProvider;
            private readonly Subject<UserGroup> groupFulledSubject;
            private readonly Subject<UserGroup> userLeftGroupObservable;
            private readonly Subject<string> userAddedToGroup;
            private readonly Subject<IGameProvider> gameStarted;
            private readonly Subject<UserGroup> failedToLoadGameSubject;

            private readonly object internalWaitingBeginerUserQueueBotTimerLocker = new object();
            private volatile IDisposable internalWaitingBeginerUserQueueBotTimer;

            private readonly object internalWaitingIntermediateUserQueueBotTimerLocker = new object();
            private volatile IDisposable internalWaitingIntermediateUserQueueQueueBotTimer;

            private readonly object internalWaitingAdvancedUserQueueBotTimerLocker = new object();
            private volatile IDisposable internalWaitingAdvancedUserQueueBotTimer;

            public UserGroupsCollector(IServiceProvider serviceProvider)
            {
                this.serviceProvider = serviceProvider;
                groupFulledSubject = new Subject<UserGroup>();
                userLeftGroupObservable = new Subject<UserGroup>();
                userAddedToGroup = new Subject<string>();
                gameStarted = new Subject<IGameProvider>();
                failedToLoadGameSubject = new Subject<UserGroup>();
            }

            static UserGroupsCollector()
            {
                internalWaitingBeginerUserQueue = new ConcurrentQueue<UserGroup>();
                internalWaitingIntermediateUserQueue = new ConcurrentQueue<UserGroup>();
                internalWaitingAdvancedUserQueue = new ConcurrentQueue<UserGroup>();
                userGroupDictionary = new ConcurrentDictionary<string, UserGroup>();
                friendsRoomsDictionary = new ConcurrentDictionary<string, UserGroup>();
            }

            private static string GetRandomBotName()
            {
                var rnd = new Random();
                var rindex = rnd.Next(russionMostPopularNames.Length - 1);
                return russionMostPopularNames[rindex];
            }

            private static ConcurrentQueue<UserGroup> GetUserQueueByLevel(WordLevel level)
            {
                switch (level)
                {
                    case WordLevel.Beginer:
                        return internalWaitingBeginerUserQueue;
                    
                    case WordLevel.Intermediate:
                        return internalWaitingIntermediateUserQueue;

                    case WordLevel.Advanced:
                        return internalWaitingAdvancedUserQueue;

                    default:
                        throw new ArgumentException(nameof(level));
                }
            }

            private Tuple<IDisposable, object> GetTimerDisposableAndLocker(WordLevel level)
            {
                switch (level)
                {
                    case WordLevel.Beginer:
                        return Tuple.Create(internalWaitingBeginerUserQueueBotTimer,
                                            internalWaitingBeginerUserQueueBotTimerLocker);

                    case WordLevel.Intermediate:
                        return Tuple.Create(internalWaitingIntermediateUserQueueQueueBotTimer,
                                            internalWaitingIntermediateUserQueueBotTimerLocker);

                    case WordLevel.Advanced:
                        return Tuple.Create(internalWaitingAdvancedUserQueueBotTimer,
                                            internalWaitingAdvancedUserQueueBotTimerLocker);

                    default:
                        throw new ArgumentException(nameof(level));
                }
            }

            private void DelayBotTimer(WordLevel level)
            {
                var tuple = GetTimerDisposableAndLocker(level);
                if (tuple.Item1 != null)
                {
                    lock (tuple.Item2)
                    {
                        tuple.Item1?.Dispose();
                    }
                }
            }

            public async Task AddUserToQueue(UserInfo newUser,
                                             bool isGameWithFriend = false,
                                             string friendsGroupId = null)
            {
                if (isGameWithFriend
                    && string.IsNullOrEmpty(friendsGroupId))
                {
                    throw new ArgumentException(nameof(friendsGroupId));
                }

                if (!newUser.IsBot && !isGameWithFriend)
                {
                    DelayBotTimer(newUser.GameLevel);
                }

                if (userGroupDictionary.ContainsKey(newUser.UserId))
                {
                    RemoveUser(newUser.UserId);
                }

                bool isConnectedToExistingGroup = false;
                UserGroup existingGroup = null;
                ConcurrentQueue<UserGroup> queue = null;

                if (isGameWithFriend)
                {
                    friendsRoomsDictionary.TryGetValue(friendsGroupId, out existingGroup);
                }
                else
                {
                    queue = GetUserQueueByLevel(newUser.GameLevel);
                    if (queue.TryDequeue(out existingGroup))
                    {
                        while (existingGroup != null && existingGroup.IsEmpty())
                        {
                            queue.TryDequeue(out existingGroup);
                        }
                    }
                }
                
                if (existingGroup != null)
                {
                    await existingGroup.ConnectUser(newUser);
                    if (!newUser.IsBot)
                    {
                        userGroupDictionary.TryAdd(newUser.UserId, existingGroup);
                        userAddedToGroup.OnNext(newUser.UserId);
                    }
                    groupFulledSubject.OnNext(existingGroup);

                    var gameProvider = (IGameProvider)serviceProvider.GetService(typeof(IGameProvider));
                    var users = existingGroup.GetUsers();

                    try
                    {
                        await gameProvider.StartGame(users[0], users[1], existingGroup.GetGroupId(), users[0].GameLevel);
                        existingGroup.GameProvider = gameProvider;
                        gameStarted.OnNext(gameProvider);
                    }
                    catch (Exception ex)
                    {
                        // TODO: Log error
                        failedToLoadGameSubject.OnNext(existingGroup);
                    }
                   

                    isConnectedToExistingGroup = true;
                }

                if (!isConnectedToExistingGroup 
                    && !newUser.IsBot)
                {
                    var newGroup = serviceProvider.GetService<UserGroup>();
                    await newGroup.EstablishConnection(newUser);
                    userGroupDictionary.TryAdd(newUser.UserId, newGroup);

                    if (!isGameWithFriend)
                    {
                        queue.Enqueue(newGroup);
                    }
                    else
                    {
                        newGroup.SetUpFriendToConnectGroupId(friendsGroupId);
                        friendsRoomsDictionary.TryAdd(friendsGroupId, newGroup);
                    }
                    userAddedToGroup.OnNext(newUser.UserId);

                    if (!isGameWithFriend)
                    {
                        SetUpBotTimer(newUser.GameLevel);
                    }
                }
            }

            private void SetUpBotTimer(WordLevel level)
            {
                var tuple = GetTimerDisposableAndLocker(level);
                lock (tuple.Item2)
                {
                    tuple.Item1?.Dispose();

                    var disposable = Observable.Interval(TimeSpan.FromSeconds(8))
                            .Take(1)
                            .SelectMany(async _ =>
                            {
                                await AddUserToQueue(new UserInfo(Guid.NewGuid().ToString(),
                                    GetRandomBotName(),
                                    level,
                                    true));
                                return Unit.Default;
                            })
                            .Subscribe();

                    switch (level)
                    {
                        case WordLevel.Beginer:
                            internalWaitingBeginerUserQueueBotTimer = disposable;
                            break;

                        case WordLevel.Intermediate:
                            internalWaitingIntermediateUserQueueQueueBotTimer = disposable;
                            break;

                        case WordLevel.Advanced:
                            internalWaitingAdvancedUserQueueBotTimer = disposable;
                            break;
                    }
                }
            }

            public void RemoveUser(string userId)
            {
                if (userId == null) throw new ArgumentNullException(nameof(userId));

                UserGroup existingGroup;
                if (userGroupDictionary.TryRemove(userId, out existingGroup))
                {
                    existingGroup.DissconnectUser(userId);

                    if (!string.IsNullOrEmpty(existingGroup.FriendToConnectGroupId))
                    {
                        UserGroup existingFriendsRoom;
                        friendsRoomsDictionary.TryRemove(existingGroup.FriendToConnectGroupId, out existingFriendsRoom);
                    }
                    userLeftGroupObservable.OnNext(existingGroup);
                }
            }

            public UserGroup GetUserGroup(string userId)
            {
                if (userId == null) throw new ArgumentNullException(nameof(userId));
                UserGroup group;
                userGroupDictionary.TryGetValue(userId, out group);
                return group;
            }

            public IObservable<IGameProvider> GameStarted => gameStarted;

            public IObservable<string> UserAddedToGroup => userAddedToGroup;

            public IObservable<UserGroup> GroupFulledObservable => groupFulledSubject;

            public IObservable<UserGroup> UserLeftGroupObservable => userLeftGroupObservable;

            public IObservable<UserGroup> FailedToLoadGameObservable => failedToLoadGameSubject;
        }
    }

}

