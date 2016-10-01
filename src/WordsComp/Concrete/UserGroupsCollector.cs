using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Reactive.Subjects;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using WordsComp.Interfaces;
using WordsComp.Models;

namespace WordsComp.Concrete
{
    namespace WordsComp.Concrete
    {
        public class UserGroupsCollector: IUserGroupsCollector
        {
            private static readonly ConcurrentQueue<UserGroup> internalWaitingUserQueue;
            private static readonly ConcurrentBag<UserGroup> internalFulledUserGroups;
            private readonly IServiceProvider serviceProvider;
            private readonly Subject<UserGroup> groupFulledSubject;
            private readonly Subject<UserGroup> userLeftGroupObservable;
            private readonly Subject<UserGroup> userAddedToGroup;

            public UserGroupsCollector(IServiceProvider serviceProvider)
            {
                this.serviceProvider = serviceProvider;
                groupFulledSubject = new Subject<UserGroup>();
                userLeftGroupObservable = new Subject<UserGroup>();
                userAddedToGroup = new Subject<UserGroup>();
            }

            static UserGroupsCollector()
            {
                internalWaitingUserQueue = new ConcurrentQueue<UserGroup>();
                internalFulledUserGroups = new ConcurrentBag<UserGroup>();
            }

            public async Task AddUserToQueue(UserInfo newUser)
            {
                UserGroup existingGroup;
                // TODO: Group can be empty
                if (internalWaitingUserQueue.TryDequeue(out existingGroup))
                {
                    await existingGroup.ConnectUser(newUser);
                    internalFulledUserGroups.Add(existingGroup);
                    groupFulledSubject.OnNext(existingGroup);
                }
                else
                {
                    var newGroup = serviceProvider.GetService<UserGroup>();
                    await newGroup.EstablishConnection(newUser);
                    internalWaitingUserQueue.Enqueue(newGroup);
                    userAddedToGroup.OnNext(newGroup);
                }
            }

            public void RemoveUser(UserInfo removedUser)
            {
                var existingGroup = internalFulledUserGroups.FirstOrDefault(g => g.ContainsUser(removedUser.UserId));
                if (existingGroup != null)
                {
                    if (internalFulledUserGroups.TryPeek(out existingGroup))
                    {
                        existingGroup.DissconnectUser(removedUser.UserId);
                        userLeftGroupObservable.OnNext(existingGroup);
                        if (existingGroup.IsEmpty())
                        {
                            internalFulledUserGroups.TryTake(out existingGroup);
                        }
                        else
                        {
                            internalWaitingUserQueue.Enqueue(existingGroup);
                        }
                    }
                }
                else
                {
                    existingGroup = internalWaitingUserQueue.FirstOrDefault(g => g.ContainsUser(removedUser.UserId));
                    if (internalWaitingUserQueue.TryPeek(out existingGroup))
                    {
                        existingGroup.DissconnectUser(removedUser.UserId);
                        userLeftGroupObservable.OnNext(existingGroup);
                    }
                }
            }

            public IObservable<UserGroup> UserAddedToGroup => userAddedToGroup;

            public IObservable<UserGroup> GroupFulledObservable => groupFulledSubject;

            public IObservable<UserGroup> UserLeftGroupObservable => userLeftGroupObservable;
        }
    }

}
