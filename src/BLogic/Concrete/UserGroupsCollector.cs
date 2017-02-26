using System;
using System.Collections.Concurrent;
using System.Reactive;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Threading.Tasks;
using BLogic.Interfaces;
using BLogic.Models;
using Common.Models;
using Microsoft.Extensions.DependencyInjection;

namespace BLogic.Concrete
{
    namespace WordsComp.Concrete
    {
        public class UserGroupsCollector: IUserGroupsCollector
        {
            private class UserFilterKey
            {
                private readonly WordLevel level;
                private readonly int filter;

                public UserFilterKey(WordLevel level, int filter)
                {
                    this.level = level;
                    this.filter = filter;
                }

                public override bool Equals(object obj)
                {
                    var otherKey = obj as UserFilterKey;
                    if (otherKey == null)
                    {
                        return false;
                    }

                    return level == otherKey.level && filter == otherKey.filter;
                }

                public override int GetHashCode()
                {
                    return (int) level * 500 + filter; // suppose filter value could not be bigger than 500
                }
            }

            private static readonly string[] russionMostPopularNames = new[] // TODO: Should be better stored elsewhere to have possibility to configure
            {
                "Настя",
                "Мария",
                "Дарья",
                "Анна",
                "Елизавета",
                "Полина",
                "Вика",
                "Катя",
                "Саша",
                "Максим",
                "Иван",
                "Артем",
                "Дима",
                "Никита",
                "Михаил",
                "Даниил",
                "Егор",
                "Андрей"
            };

            private static readonly ConcurrentDictionary<int, IUserGroup> waitingUsers;
            private static readonly ConcurrentDictionary<string, IUserGroup> userGroupDictionary;
            private static readonly ConcurrentDictionary<string, IUserGroup> friendsRoomsDictionary;
            private static readonly ConcurrentDictionary<UserFilterKey, IDisposable> bots; 
            private readonly IServiceProvider serviceProvider;
            private readonly Subject<IUserGroup> groupFulledSubject;
            private readonly Subject<IUserGroup> userLeftGroupObservable;
            private readonly Subject<string> userAddedToGroup;
            private readonly Subject<IGameProvider> gameStarted;
            private readonly Subject<IUserGroup> failedToLoadGameSubject;

            public UserGroupsCollector(IServiceProvider serviceProvider)
            {
                this.serviceProvider = serviceProvider;
                groupFulledSubject = new Subject<IUserGroup>();
                userLeftGroupObservable = new Subject<IUserGroup>();
                userAddedToGroup = new Subject<string>();
                gameStarted = new Subject<IGameProvider>();
                failedToLoadGameSubject = new Subject<IUserGroup>();
            }

            static UserGroupsCollector()
            {
                waitingUsers = new ConcurrentDictionary<int, IUserGroup>();
                userGroupDictionary = new ConcurrentDictionary<string, IUserGroup>();
                friendsRoomsDictionary = new ConcurrentDictionary<string, IUserGroup>();
                bots = new ConcurrentDictionary<UserFilterKey, IDisposable>();
            }

            private static string GetRandomBotName()
            {
                var rnd = new Random();
                var rindex = rnd.Next(russionMostPopularNames.Length - 1);
                return russionMostPopularNames[rindex];
            }

            private void DelayBotTimer(WordLevel level, int filter)
            {
                IDisposable timerDisp = null;
                if (bots.TryRemove(new UserFilterKey(level, filter), out timerDisp))
                {
                   timerDisp?.Dispose();
                }
            }

            public async Task AddUserToQueue(UserInfo newUser,
                                             int wordsCountFilter,
                                             bool isGameWithFriend = false,
                                             string friendsGroupId = null)
            {
                if (wordsCountFilter <= 0)
                {
                    throw new ArgumentException(nameof(wordsCountFilter));
                }

                if (isGameWithFriend
                    && string.IsNullOrEmpty(friendsGroupId))
                {
                    throw new ArgumentException(nameof(friendsGroupId));
                }

                if (!newUser.IsBot && !isGameWithFriend)
                {
                    DelayBotTimer(newUser.GameLevel, wordsCountFilter);
                }

                if (userGroupDictionary.ContainsKey(newUser.UserId))
                {
                    RemoveUser(newUser.UserId);
                }

                bool isConnectedToExistingGroup = false;
                IUserGroup existingGroup = null;

                if (isGameWithFriend)
                {
                    friendsRoomsDictionary.TryGetValue(friendsGroupId, out existingGroup);
                }
                else
                {
                    if (waitingUsers.TryRemove(wordsCountFilter, out existingGroup))
                    {
                        if (existingGroup != null && existingGroup.IsEmpty())
                        {
                            existingGroup = null;
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
                        await gameProvider.StartGame(users[0], users[1], existingGroup.GetGroupId(), users[0].GameLevel, newUser.IsBot, wordsCountFilter);
                        existingGroup.GameProvider = gameProvider;
                        gameStarted.OnNext(gameProvider);
                    }
                    catch (Exception ex)
                    {
                        // TODO: Log error
                        failedToLoadGameSubject.OnNext(existingGroup);
                        return;
                    }
                   

                    isConnectedToExistingGroup = true;
                }

                if (!isConnectedToExistingGroup 
                    && !newUser.IsBot)
                {
                    var newGroup = serviceProvider.GetService<IUserGroup>();
                    await newGroup.EstablishConnection(newUser);
                    userGroupDictionary.TryAdd(newUser.UserId, newGroup);

                    if (!isGameWithFriend)
                    {
                        waitingUsers.TryAdd(wordsCountFilter, newGroup);
                    }
                    else
                    {
                        newGroup.SetUpFriendToConnectGroupId(friendsGroupId);
                        friendsRoomsDictionary.TryAdd(friendsGroupId, newGroup);
                    }
                    userAddedToGroup.OnNext(newUser.UserId);

                    if (!isGameWithFriend)
                    {
                        SetUpBotTimer(newUser.GameLevel, wordsCountFilter);
                    }
                }
            }

            private void SetUpBotTimer(WordLevel level, int filter)
            {
                var key = new UserFilterKey(level, filter);
                IDisposable timerDisp = null;
                if (bots.TryRemove(key, out timerDisp))
                {
                    timerDisp?.Dispose();
                }

                var disposable = Observable.Interval(TimeSpan.FromSeconds(8))
                            .Take(1)
                            .SelectMany(async _ =>
                            {
                                await AddUserToQueue(new UserInfo(Guid.NewGuid().ToString(),
                                    GetRandomBotName(),
                                    level,
                                    true,
                                    false),
                                    filter);
                                return Unit.Default;
                            })
                            .Subscribe();

                if (!bots.TryAdd(key, disposable))
                {
                    disposable.Dispose();
                }
            }

            public void RemoveUser(string userId)
            {
                if (userId == null) throw new ArgumentNullException(nameof(userId));

                IUserGroup existingGroup;
                if (userGroupDictionary.TryRemove(userId, out existingGroup))
                {
                    existingGroup.DissconnectUser(userId);

                    if (!string.IsNullOrEmpty(existingGroup.FriendToConnectGroupId))
                    {
                        IUserGroup existingFriendsRoom;
                        friendsRoomsDictionary.TryRemove(existingGroup.FriendToConnectGroupId, out existingFriendsRoom);
                    }
                    userLeftGroupObservable.OnNext(existingGroup);
                    existingGroup?.GameProvider?.Dispose();
                }
            }

            public IUserGroup GetUserGroup(string userId)
            {
                if (userId == null) throw new ArgumentNullException(nameof(userId));
                IUserGroup group;
                userGroupDictionary.TryGetValue(userId, out group);
                return group;
            }

            public IObservable<IGameProvider> GameStarted => gameStarted;

            public IObservable<string> UserAddedToGroup => userAddedToGroup;

            public IObservable<IUserGroup> GroupFulledObservable => groupFulledSubject;

            public IObservable<IUserGroup> UserLeftGroupObservable => userLeftGroupObservable;

            public IObservable<IUserGroup> FailedToLoadGameObservable => failedToLoadGameSubject;
        }
    }

}

