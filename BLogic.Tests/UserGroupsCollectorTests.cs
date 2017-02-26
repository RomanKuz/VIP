using System;
using System.Linq;
using System.Collections.Generic;
using System.Reactive.Linq;
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

        [SetUp]
        public void SetUp()
        {
            serviceProvider = Substitute.For<IServiceProvider>();
            userGroupsCollector = new UserGroupsCollector(serviceProvider);

            var testScheduler = new TestScheduler();
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

        [Test]
        public async Task AddUserToQueue_Add2UsersWithSameFilterCriteria_ShouldStartNewGame([Values(true, false)]bool isLoadedGameSuccessfully)
        {
            // arrange
            var gameProvider = Substitute.For<IGameProvider>();
            serviceProvider.GetService(typeof(IGameProvider)).Returns(gameProvider);

            var user1 = new UserInfo(GetUniqueString(), GetUniqueString(), WordLevel.Beginer, false, false);
            var user2 = new UserInfo(GetUniqueString(), GetUniqueString(), WordLevel.Beginer, false, false);

            var userGroup = Substitute.For<IUserGroup>();
            userGroup.EstablishConnection(null).ReturnsForAnyArgs(Task.FromResult(0));
            userGroup.GetUsers().Returns(new List<UserInfo> { user1, user2 });
            var groupId = GetUniqueString();
            userGroup.GetGroupId().Returns(groupId);
            serviceProvider.GetService(typeof(IUserGroup)).Returns(userGroup);

            if (!isLoadedGameSuccessfully)
            {
                gameProvider.StartGame(null, null, null, WordLevel.Unknown, false, 0).ThrowsForAnyArgs(new Exception());
            }
            else
            {
                gameProvider.StartGame(null, null, null, WordLevel.Unknown, false, 0)
                            .ReturnsForAnyArgs(Task.FromResult(new Game(user1, user2, groupId)));
            }

            // act
            await userGroupsCollector.AddUserToQueue(
                    user1,
                    10);
            await userGroupsCollector.AddUserToQueue(
                    user2,
                    10);

            // assert
            CollectionAssert.AreEqual(new List<string> {user1.UserId, user2.UserId}, onUserAdded.GetAllValues());
            CollectionAssert.AreEqual(new List<IUserGroup> { userGroup }, onGroupFulled.GetAllValues());
            if (!isLoadedGameSuccessfully)
            {
                CollectionAssert.AreEqual(new List<IUserGroup> {userGroup}, onFailedToLoadGame.GetAllValues());
            }
            else
            {
                CollectionAssert.AreEqual(new List<IGameProvider> { gameProvider }, onGameStarted.GetAllValues());
            }
        }
    }
}
