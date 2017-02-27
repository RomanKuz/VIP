using System;
using System.Collections;
using System.Linq;
using System.Collections.Generic;
using System.Reactive.Linq;
using System.Threading;
using System.Threading.Tasks;
using BLogic.Concrete.WordsComp.Concrete;
using BLogic.Interfaces;
using BLogic.Models;
using Common.Models;
using Microsoft.Reactive.Testing;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using NUnit.Framework;

namespace BLogic.Tests
{
    [TestFixture]
    public class UserGroupsCollectorTests
    {
        private IServiceProvider serviceProvider;
        private UserGroupsCollector userGroupsCollector;

        private ITestableObserver<string> onUserAdded;
        private ITestableObserver<IUserGroup> onGroupFulled;
        private ITestableObserver<IUserGroup> onFailedToLoadGame;
        private ITestableObserver<IGameProvider> onGameStarted;
        private TestScheduler testScheduler;

        private class GroupComparator : IComparer
        {
            public int Compare(object x, object y)
            {
                var xGroup = x as IUserGroup;
                var yGroup = y as IUserGroup;
                return xGroup.GetUsers().SequenceEqual(yGroup.GetUsers()) ? 0 : 1;
            }
        }

        [SetUp]
        public void SetUp()
        {
            serviceProvider = Substitute.For<IServiceProvider>();
            testScheduler = new TestScheduler();

            userGroupsCollector = new UserGroupsCollector(serviceProvider, testScheduler);

            
            onUserAdded = testScheduler.CreateObserver<string>();
            userGroupsCollector.UserAddedToGroup.Subscribe(onUserAdded);

            onGroupFulled = testScheduler.CreateObserver<IUserGroup>();
            userGroupsCollector.GroupFulledObservable.Subscribe(onGroupFulled);

            onGameStarted = testScheduler.CreateObserver<IGameProvider>();
            userGroupsCollector.GameStarted.Subscribe(onGameStarted);

            onFailedToLoadGame = testScheduler.CreateObserver<IUserGroup>();
            userGroupsCollector.FailedToLoadGameObservable.Subscribe(onFailedToLoadGame);
        }

        private static string GetUniqueString()
        {
            return Guid.NewGuid().ToString();
        }

        private static IUserGroup SubstituteUserGroup()
        {
            var groupId = GetUniqueString();
            var userGroup = Substitute.For<IUserGroup>();
            var users = new List<UserInfo>();
            userGroup.When(x => x.EstablishConnection(Arg.Is<UserInfo>(y => y != null)))
                     .Do(x => users.Add(x.Arg<UserInfo>()));
            userGroup.When(x => x.ConnectUser(Arg.Is<UserInfo>(y => y != null)))
                     .Do(x => users.Add(x.Arg<UserInfo>()));
            userGroup.EstablishConnection(null).ReturnsForAnyArgs(Task.FromResult(0));
            userGroup.GetUsers().Returns(users);
            userGroup.IsEmpty().Returns(_ => !users.Any());
            userGroup.When(x => x.DissconnectUser(Arg.Any<string>()))
                     .Do(x => users.Remove(users.First(u => u.UserId == x.Arg<string>())));

            userGroup.GetGroupId().Returns(groupId);
            return userGroup;
        }

        [Test]
        public async Task AddUserToQueue_Add2UsersWithSameFilterCriteria_ShouldStartNewGame([Values(true, false)]bool isLoadedGameSuccessfully)
        {
            // arrange
            var gameProvider = Substitute.For<IGameProvider>();
            serviceProvider.GetService(typeof(IGameProvider)).Returns(gameProvider);

            var user1 = new UserInfo(GetUniqueString(), GetUniqueString(), WordLevel.Beginer, false, false);
            var user2 = new UserInfo(GetUniqueString(), GetUniqueString(), WordLevel.Intermediate, false, false);
            var user3 = new UserInfo(GetUniqueString(), GetUniqueString(), WordLevel.Beginer, false, false);
            var user4 = new UserInfo(GetUniqueString(), GetUniqueString(), WordLevel.Intermediate, false, false);

            serviceProvider.GetService(typeof(IUserGroup)).Returns(_ => SubstituteUserGroup());

            if (!isLoadedGameSuccessfully)
            {
                gameProvider.StartGame(null, null, null, WordLevel.Unknown, false, 0).ThrowsForAnyArgs(new Exception());
            }
            else
            {
                gameProvider.StartGame(null, null, null, WordLevel.Unknown, false, 0)
                            .ReturnsForAnyArgs(Task.FromResult(new Game(user1, user3, string.Empty)));
            }

            try
            {
                // act
                await userGroupsCollector.AddUserToQueue(
                    user1,
                    10);
                await userGroupsCollector.AddUserToQueue(
                    user2,
                    10);
                await userGroupsCollector.AddUserToQueue(
                    user3,
                    10);
                await userGroupsCollector.AddUserToQueue(
                    user4,
                    15);

                // assert
                CollectionAssert.AreEqual(new List<string> {user1.UserId, user2.UserId, user3.UserId, user4.UserId},
                    onUserAdded.GetAllValues());
                var expectedGroup = SubstituteUserGroup();
                expectedGroup.GetUsers().Returns(new List<UserInfo> {user1, user3});
                CollectionAssert.AreEqual(new List<IUserGroup> {expectedGroup},
                    onGroupFulled.GetAllValues(),
                    new GroupComparator());
                if (!isLoadedGameSuccessfully)
                {
                    CollectionAssert.AreEqual(new List<IUserGroup> {expectedGroup},
                        onFailedToLoadGame.GetAllValues(),
                        new GroupComparator());
                }
                else
                {
                    CollectionAssert.AreEqual(new List<IGameProvider> {gameProvider}, onGameStarted.GetAllValues());
                }
            }
            finally
            {
                userGroupsCollector.RemoveUser(user1.UserId);
                userGroupsCollector.RemoveUser(user2.UserId);
                userGroupsCollector.RemoveUser(user3.UserId);
                userGroupsCollector.RemoveUser(user4.UserId);
            }
        }
    }
}
