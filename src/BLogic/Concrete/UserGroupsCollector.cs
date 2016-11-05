using System;
using System.Collections.Concurrent;
using System.Reactive.Subjects;
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
            private static readonly ConcurrentQueue<UserGroup> internalWaitingBeginerUserQueue;
            private static readonly ConcurrentQueue<UserGroup> internalWaitingIntermediateUserQueue;
            private static readonly ConcurrentQueue<UserGroup> internalWaitingAdvancedUserQueue;
            private static readonly ConcurrentDictionary<string, UserGroup> userGroupDictionary;
            private readonly IServiceProvider serviceProvider;
            private readonly Subject<UserGroup> groupFulledSubject;
            private readonly Subject<UserGroup> userLeftGroupObservable;
            private readonly Subject<string> userAddedToGroup;
            private readonly Subject<IGameProvider> gameStarted;

            public UserGroupsCollector(IServiceProvider serviceProvider)
            {
                this.serviceProvider = serviceProvider;
                groupFulledSubject = new Subject<UserGroup>();
                userLeftGroupObservable = new Subject<UserGroup>();
                userAddedToGroup = new Subject<string>();
                gameStarted = new Subject<IGameProvider>();
            }

            static UserGroupsCollector()
            {
                internalWaitingBeginerUserQueue = new ConcurrentQueue<UserGroup>();
                internalWaitingIntermediateUserQueue = new ConcurrentQueue<UserGroup>();
                internalWaitingAdvancedUserQueue = new ConcurrentQueue<UserGroup>();
                userGroupDictionary = new ConcurrentDictionary<string, UserGroup>();
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

            public async Task AddUserToQueue(UserInfo newUser)
            {
                if (userGroupDictionary.ContainsKey(newUser.UserId))
                {
                    RemoveUser(newUser.UserId);
                }

                bool isConnectedToExistingGroup = false;
                UserGroup existingGroup;
                var queue = GetUserQueueByLevel(newUser.GameLevel);
                if (queue.TryDequeue(out existingGroup))
                {
                    while (existingGroup != null && existingGroup.IsEmpty())
                    {
                        queue.TryDequeue(out existingGroup);
                    }

                    if (existingGroup != null)
                    {
                        await existingGroup.ConnectUser(newUser);
                        userGroupDictionary.TryAdd(newUser.UserId, existingGroup);
                        userAddedToGroup.OnNext(newUser.UserId);
                        groupFulledSubject.OnNext(existingGroup);

                        var gameProvider = (IGameProvider)serviceProvider.GetService(typeof(IGameProvider));
                        var users = existingGroup.GetUsers();
                        await gameProvider.StartGame(users[0], users[1], existingGroup.GetGroupId(), users[0].GameLevel);
                        existingGroup.GameProvider = gameProvider;
                        gameStarted.OnNext(gameProvider);

                        isConnectedToExistingGroup = true;
                    }
                }
                 
                if (!isConnectedToExistingGroup)
                {
                    var newGroup = serviceProvider.GetService<UserGroup>();
                    await newGroup.EstablishConnection(newUser);
                    userGroupDictionary.TryAdd(newUser.UserId, newGroup);
                    queue.Enqueue(newGroup);
                    userAddedToGroup.OnNext(newUser.UserId);
                }
            }

            public void RemoveUser(string userId)
            {
                if (userId == null) throw new ArgumentNullException(nameof(userId));

                UserGroup existingGroup;
                if (userGroupDictionary.TryRemove(userId, out existingGroup))
                {
                    existingGroup.DissconnectUser(userId);
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
        }
    }

}
