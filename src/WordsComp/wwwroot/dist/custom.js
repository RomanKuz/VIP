function getWordContainerPostion(){var $element=$("#word-element");return{x:$element.offset().left,y:$element.offset().top}}var Common;!function(Common){function GetConstants(){return new Constants}var Constants=function(){function Constants(){this.appName="gameApp",this.hubConnectToGroupMethodName="connect",this.connectedToGroup="userAdded",this.leftGroup="userLeft",this.groupFulled="groupFulled",this.competitionHub="competitionHub",this.gameStarted="gameStarted",this.didMove="didMove",this.gameFinished="gameFinished",this.doMove="doMove",this.passMove="passMove",this.onFailedToLoadGame="failedToLoadGame"}return Constants}();Common.Constants=Constants,Common.GetConstants=GetConstants}(Common||(Common={}));var Mixins;!function(Mixins){function actionWrapper($scope,action){return function(scheduler,state){if(!$scope.$$phase){var value_1;return $scope.$apply(function(){value_1=action(scheduler,state)}),value_1}return action(scheduler,state)}}var NgScheduler=function(){function NgScheduler($scope){this.immediateScheduler=Rx.Scheduler.immediate,this.$scope=$scope}return NgScheduler.prototype.now=function(){return this.immediateScheduler.now()},NgScheduler.prototype.schedule=function(state,action){return this.immediateScheduler.schedule(state,actionWrapper(this.$scope,action))},NgScheduler.prototype.scheduleFuture=function(state,dueTime,action){throw new Error("Not supported")},NgScheduler.prototype.scheduleRecursive=function(state,action){throw new Error("Not supported")},NgScheduler.prototype.scheduleRecursiveFuture=function(state,dueTime,action){throw new Error("Not supported")},NgScheduler.prototype.schedulePeriodic=function(state,period,action){throw new Error("Not supported")},NgScheduler.prototype.catch=function(handler){return this.immediateScheduler.catch(handler)},NgScheduler}();Mixins.NgScheduler=NgScheduler}(Mixins||(Mixins={}));var App;!function(App){function GetApp(){return app}var constants=Common.GetConstants(),app=angular.module(constants.appName,["ui.bootstrap.modal","ngAnimate","angularSpinner","rx"]);app.config(["usSpinnerConfigProvider",function(usSpinnerConfigProvider){usSpinnerConfigProvider.setDefaults({color:"#5B91DE"})}]),App.GetApp=GetApp}(App||(App={}));var Models;!function(Models){var User=function(){function User(){}return User}();Models.User=User}(Models||(Models={}));var Models;!function(Models){var Group=function(){function Group(){}return Group}();Models.Group=Group}(Models||(Models={}));var Models;!function(Models){var Score=function(){function Score(){}return Score}();Models.Score=Score}(Models||(Models={}));var Models;!function(Models){var TranslateVariant=function(){function TranslateVariant(){this.variant=null,this.isTrue=!1,this.isSelected=!1}return TranslateVariant}();Models.TranslateVariant=TranslateVariant}(Models||(Models={}));var Models;!function(Models){var Word=function(){function Word(){}return Word}();Models.Word=Word}(Models||(Models={}));var Models;!function(Models){var Game=function(){function Game(){}return Game}();Models.Game=Game}(Models||(Models={}));var Models;!function(Models){var GameResult=function(){function GameResult(){}return GameResult}();Models.GameResult=GameResult}(Models||(Models={}));var Models;!function(Models){var MoveResult=function(){function MoveResult(){}return MoveResult}();Models.MoveResult=MoveResult}(Models||(Models={}));var Models;!function(Models){var PassedWordInfo=function(){function PassedWordInfo(){}return PassedWordInfo}();Models.PassedWordInfo=PassedWordInfo}(Models||(Models={}));var Models;!function(Models){!function(Level){Level[Level.Beginer=1]="Beginer",Level[Level.Intermediate=2]="Intermediate",Level[Level.Advanced=3]="Advanced"}(Models.Level||(Models.Level={}));Models.Level}(Models||(Models={}));var Interfaces;!function(Interfaces){!function(StartGameModalState){StartGameModalState[StartGameModalState.startNewGame=1]="startNewGame",StartGameModalState[StartGameModalState.createNewRoom=2]="createNewRoom"}(Interfaces.StartGameModalState||(Interfaces.StartGameModalState={}));Interfaces.StartGameModalState;!function(GameMode){GameMode[GameMode.onlineWithEverybody=1]="onlineWithEverybody",GameMode[GameMode.withFriend=2]="withFriend"}(Interfaces.GameMode||(Interfaces.GameMode={}));Interfaces.GameMode}(Interfaces||(Interfaces={}));var Models;!function(Models){var Bot=function(){function Bot(){this.mistakesToMake=2}return Bot.prototype.setNewTickAnswer=function(){this.tickAnswer=this.timeToProvideAnswer-Math.floor(5*Math.random()),this.tickAnswer>=this.timeToProvideAnswer-1&&(this.tickAnswer=this.timeToProvideAnswer-2)},Bot.prototype.handleTimerStarted=function(timeToProvideAnswer){this.timeToProvideAnswer=timeToProvideAnswer,this.setNewTickAnswer()},Bot.prototype.handleTimerTick=function(currentTick,variants){if(0===currentTick)throw new Error("smth bad with bot game logic");var variantsNum=variants.length,correctVarNum=variants.findIndex(function(value){return value.isTrue===!0});if(currentTick===this.tickAnswer){if(this.setNewTickAnswer(),0!==this.mistakesToMake&&Math.random()>.65){this.mistakesToMake--;for(var incorrectVariants=[],i=0;i<variantsNum;i++)i!==correctVarNum&&incorrectVariants.push(i);var index=incorrectVariants[Math.floor(3*Math.random())];return variants[index].variant}return variants[correctVarNum].variant}return null},Bot}();Models.Bot=Bot}(Models||(Models={}));var Services;!function(Services){var ConnectToGameService=function(){function ConnectToGameService(hubConnectionService){this.constants=Common.GetConstants(),this.connection=hubConnectionService.getConnection(),this.hub=this.connection.createHubProxy(this.constants.competitionHub)}return ConnectToGameService.prototype.connectToHub=function(){return this.hub.connection.start()},ConnectToGameService.prototype.onConnectToHub=function(callBack){this.onConnectedToHubCallback=callBack},ConnectToGameService.prototype.doMove=function(moveOrder,word,variant){return this.hub.invoke(this.constants.doMove,moveOrder,word,variant)},ConnectToGameService.prototype.passMove=function(moveOrder){return this.hub.invoke(this.constants.passMove,moveOrder)},ConnectToGameService.prototype.connectToNewGroupImpl=function(displayName,level){return this.hub.invoke(this.constants.hubConnectToGroupMethodName,displayName,level)},ConnectToGameService.prototype.connectToNewGroup=function(displayName,level,isGameWithFriend,groupId){var _this=this;return 4===this.connection.state?this.connectToHub().then(function(values){return _this.onConnectedToHubCallback(values.id),_this.hub.invoke(_this.constants.hubConnectToGroupMethodName,displayName,level,isGameWithFriend,groupId||values.id)}):this.hub.invoke(this.constants.hubConnectToGroupMethodName,displayName,level,isGameWithFriend,groupId||"")},ConnectToGameService.prototype.onConnectedToGroup=function(callBack){this.hub.on(this.constants.connectedToGroup,function(msg){return callBack(msg)})},ConnectToGameService.prototype.onGroupFulled=function(callBack){this.hub.on(this.constants.groupFulled,function(msg){return callBack(msg)})},ConnectToGameService.prototype.onUserLeft=function(callBack){this.hub.on(this.constants.leftGroup,function(msg){return callBack(msg[0])})},ConnectToGameService.prototype.gameStarted=function(callBack){this.hub.on(this.constants.gameStarted,function(msg){callBack(msg)})},ConnectToGameService.prototype.didMove=function(callBack){this.hub.on(this.constants.didMove,function(msg){return callBack(msg)})},ConnectToGameService.prototype.gameFinished=function(callBack){this.hub.on(this.constants.gameFinished,function(msg){return callBack(msg[0])})},ConnectToGameService.prototype.onDisconnectedFromHub=function(callBack){this.connection.disconnected(callBack)},ConnectToGameService.prototype.stopHubConnection=function(){4!==this.connection.state&&this.connection.stop()},ConnectToGameService.prototype.onFailedToLoadGame=function(callBack){this.hub.on(this.constants.onFailedToLoadGame,function(){return callBack()})},ConnectToGameService.$inject=["Services.HubConnectionService"],ConnectToGameService}();Services.ConnectToGameService=ConnectToGameService,angular.module(Common.GetConstants().appName).service("Services.ConnectToGameService",ConnectToGameService)}(Services||(Services={}));var Services;!function(Services){var CookieService=function(){function CookieService(){}return CookieService.prototype.setCookie=function(cname,cvalue,exdays){exdays||(exdays=3670);var d=new Date;d.setTime(d.getTime()+24*exdays*60*60*1e3);var expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+";"+expires+";path=/"},CookieService.prototype.getCookie=function(cname){for(var name=cname+"=",ca=document.cookie.split(";"),i=0;i<ca.length;i++){for(var c=ca[i];" "==c.charAt(0);)c=c.substring(1);if(0==c.indexOf(name))return c.substring(name.length,c.length)}return""},CookieService}();Services.CookieService=CookieService,angular.module(Common.GetConstants().appName).service("Services.CookieService",CookieService)}(Services||(Services={}));var Services;!function(Services){var HubConnectionService=function(){function HubConnectionService(){}return HubConnectionService.prototype.getConnection=function(){return HubConnectionService.connection||(HubConnectionService.connection=$.hubConnection("/signalr",{useDefaultPath:!1}),HubConnectionService.connection.logging=!0),HubConnectionService.connection},HubConnectionService}();Services.HubConnectionService=HubConnectionService,angular.module(Common.GetConstants().appName).service("Services.HubConnectionService",HubConnectionService)}(Services||(Services={}));var Services;!function(Services){var StateHandlerService=function(){function StateHandlerService($rootScope,$modal,usSpinnerService,$log,connectToGameService){this.constants=Common.GetConstants(),this.$modal=$modal,this.usSpinnerService=usSpinnerService,this.$rootScope=$rootScope,this.$rootScope.isStartGamePage=!1,this.$rootScope.userId=null,this.$log=$log,this.connectToGameService=connectToGameService,this.groupFulledObservable=new Rx.Subject,this.addedToGroupObservable=new Rx.Subject,this.userLeftGroupObservable=new Rx.Subject,this.gameStartedObservable=new Rx.Subject}return StateHandlerService.prototype.setUpGameScope=function($gameScope){this.$gameScope=$gameScope},StateHandlerService.prototype.callInDigestLoop=function(action){this.$rootScope.$$phase?action():this.$rootScope.$apply(function(){action()})},StateHandlerService.prototype.showConnectToRoomWindow=function(){var opt={};opt.scope=this.connectToGameScope,opt.templateUrl="connectToRoom.html",opt.windowTemplateUrl="windowTemplate.html",opt.backdrop="static",opt.keyboard=!1,opt.animation=!0,opt.size="lg",this.startGameModalInstance=this.$modal.open(opt)},StateHandlerService.prototype.showStartGameModal=function(){var opt={};opt.scope=this.connectToGameScope,opt.templateUrl="connectToGroup.html",opt.windowTemplateUrl="windowTemplate.html",opt.backdrop="static",opt.keyboard=!1,opt.animation=!0,opt.size="lg",this.startGameModalInstance=this.$modal.open(opt)},StateHandlerService.prototype.showGameFinishedModalWindow=function(isWin,isDraw){if(void 0===isWin&&void 0===isDraw)throw"One of boolean flags should be specified";var connectToGameScope=this.connectToGameScope,gameScope=this.$gameScope,rootScope=this.$rootScope,opt={};opt.controller=function($scope){$scope.playAgain=rootScope.gameMode===Interfaces.GameMode.withFriend?connectToGameScope.connectToExistingRoom:connectToGameScope.connectToGroup,$scope.playAgainDisplayMsg=rootScope.gameMode===Interfaces.GameMode.withFriend?"Подключится к комнате":"Сыграть ещё",$scope.shouldShowCancelButton=rootScope.gameMode===Interfaces.GameMode.withFriend,isDraw?$scope.message="Ничья. Отличная игра :D!\nХотите сыграть ещё раз?":isWin?$scope.message="Поздравления! Вы выиграли!\nХотите сыграть ещё раз?":$scope.message="Даже если проиграл, преобретенный опыт останется навсегда с тобой и станет твоей наградой :)\nХотите сыграть ещё раз?",$scope.passedWords=gameScope.passedWords.filter(function(v){return v.wasPassed}),$scope.wrongAttemps=gameScope.passedWords.filter(function(v){return!v.wasPassed})},opt.templateUrl="gameFinished.html",opt.windowTemplateUrl="windowTemplate.html",opt.backdrop="static",opt.keyboard=!1,opt.animation=!0,opt.size="lg",this.startGameModalInstance=this.$modal.open(opt)},StateHandlerService.prototype.startSpin=function(spinKey,observable){var _this=this;this.usSpinnerService.spin(spinKey),observable.subscribe(function(){_this.usSpinnerService.stop(spinKey)})},StateHandlerService.prototype.setConnectToGameScope=function(connectToGameScope){this.connectToGameScope=connectToGameScope},StateHandlerService.prototype.handleConnectionToGroup=function(promise){var _this=this;this.callInDigestLoop(function(){_this.connectToGameScope.connectToGroupErrorMessage="";var addedToGroup=_this.addedToGroupObservable.take(1);addedToGroup.subscribe(function(){_this.closeAllWindows(),_this.$rootScope.isStartGamePage=!0});var groupFulled=_this.groupFulledObservable.take(1);_this.startSpin("group-fulled",groupFulled),groupFulled.subscribe(function(){_this.startSpin("loading-game",Rx.Observable.merge(_this.userLeftGroupObservable.take(1),_this.gameStartedObservable.take(1)).take(1))});var onFailedToLoadGame=new Rx.Subject;_this.connectToGameService.onFailedToLoadGame(function(){return onFailedToLoadGame.onNext({})}),onFailedToLoadGame.take(1).subscribe(function(){_this.handleConnectToGroupError("Ошибка при загрузке игры. Попробуйте снова.")}),_this.startSpin("connect-to-group",Rx.Observable.fromPromise(promise))}),promise.fail(function(error){_this.$log.error(error),_this.handleConnectToGroupError("Упс :( Что-то пошло не так. Попробуйте снова.")})},StateHandlerService.prototype.handleConnectToGroupError=function(erroMessage){var _this=this;this.closeAllWindows(),this.$rootScope.gameMode===Interfaces.GameMode.onlineWithEverybody?this.showStartGameWindow():this.showConnectToRoomWindow(),this.$rootScope.isStartGamePage=!1,this.callInDigestLoop(function(){return _this.connectToGameScope.connectToGroupErrorMessage=erroMessage})},StateHandlerService.prototype.closeAllWindows=function(){this.startGameModalInstance&&(this.startGameModalInstance.close(),this.startGameModalInstance=null)},StateHandlerService.prototype.handleUserAddedToGroup=function(){this.addedToGroupObservable.onNext({})},StateHandlerService.prototype.showStartGameWindow=function(){var _this=this;this.callInDigestLoop(function(){_this.showStartGameModal()})},StateHandlerService.prototype.handleGameFinished=function(isWin,isDraw){var _this=this;this.callInDigestLoop(function(){_this.$rootScope.isStartGamePage=!1,_this.showGameFinishedModalWindow(isWin,isDraw)})},StateHandlerService.prototype.handleGroupFulled=function(){var _this=this;this.callInDigestLoop(function(){_this.groupFulledObservable.onNext({})})},StateHandlerService.prototype.handleGameStarted=function(){var _this=this;this.callInDigestLoop(function(){_this.$rootScope.isStartGamePage=!0,_this.startGameModalInstance&&(_this.startGameModalInstance.close(),_this.startGameModalInstance=null)}),this.gameStartedObservable.onNext({})},StateHandlerService.prototype.getUserId=function(){return this.$rootScope.userId},StateHandlerService.prototype.setUserId=function(userId){this.$rootScope.userId=userId},StateHandlerService.prototype.handleUser2LeftGroup=function(){var _this=this;this.callInDigestLoop(function(){_this.userLeftGroupObservable.onNext({}),_this.$rootScope.isStartGamePage=!1,_this.showStartGameModal()})},StateHandlerService.prototype.getUserDisplayName=function(){return this.$rootScope.displayName},StateHandlerService.prototype.handleDisconnectedFromHub=function(){var _this=this;this.$rootScope.isStartGamePage&&this.callInDigestLoop(function(){_this.$rootScope.isStartGamePage=!1,_this.showStartGameModal()})},StateHandlerService.$inject=["$rootScope","$uibModal","usSpinnerService","$log","Services.ConnectToGameService"],StateHandlerService}();Services.StateHandlerService=StateHandlerService,angular.module(Common.GetConstants().appName).service("Services.StateHandlerService",StateHandlerService)}(Services||(Services={}));var controllers;!function(controllers){var ConnectToGameController=function(){function ConnectToGameController(connectionHubService,$scope,stateHandler,$rootScope,coockieService,$log){this.connectionHubService=connectionHubService,this.$scope=$scope,this.stateHandler=stateHandler,this.$rootScope=$rootScope,this.coockieService=coockieService,this.displayNameCookieKey="displayName",this.levelCookieKey="levelName",this.guidRegex=new RegExp("^roomId=[{(]?[0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12}[)}]?&level=[1-3]$","i"),this.$log=$log,this.initializeViewModel()}return ConnectToGameController.prototype.initializeViewModel=function(){var _this=this;this.stateHandler.setConnectToGameScope(this.$scope),this.connectionHubService.onUserLeft(function(data){return _this.onUserLeft.call(_this,data)}),this.connectionHubService.onGroupFulled(function(data){return _this.onGroupFulled.call(_this,data)}),this.connectionHubService.onConnectedToGroup(function(data){return _this.onConnectedToGroup.call(_this,data)}),this.$scope.connectToGroup=function(){return _this.connectToGroup.call(_this,!1,null)},this.$scope.createAndConnectToCustomRoom=function(){return _this.connectToGroup.call(_this,!0,null)},this.$scope.connectToExistingRoom=function(roomId){var id=roomId||_this.roomIdFromUrl||_this.createdRoomId;if(!id||""===id)throw new Error("No room id is specified");_this.connectToGroup.call(_this,!0,roomId||_this.roomIdFromUrl||_this.createdRoomId,_this.roomLevelFromUrl)},this.connectionHubService.onConnectToHub(function(value){_this.stateHandler.setUserId(value)}),this.connectionHubService.onDisconnectedFromHub(function(){return _this.stateHandler.handleDisconnectedFromHub()}),this.$scope.levels=[{level:Models.Level.Beginer,name:"Новачок"},{level:Models.Level.Intermediate,name:"Средний"},{level:Models.Level.Advanced,name:"Высокий"}],this.$scope.changeLevel=function(level){return _this.$rootScope.level=level};var displayNameFromCookies="Случайный игрок",levelFromCookies=2;try{var cookieValue=this.coockieService.getCookie(this.displayNameCookieKey);""!==cookieValue&&(displayNameFromCookies=cookieValue),cookieValue=this.coockieService.getCookie(this.levelCookieKey),""!==cookieValue&&(levelFromCookies=parseInt(cookieValue)||levelFromCookies)}catch(error){this.$log.error(error)}this.$rootScope.displayName=displayNameFromCookies,this.$rootScope.level=this.$scope.levels[levelFromCookies-1],this.$scope.urlWithRoomId=window.location.pathname,this.roomIdFromUrl=this.getParameterFromUrl("roomId"),this.roomLevelFromUrl=parseInt(this.getParameterFromUrl("level")),this.roomLevelFromUrl&&(this.$rootScope.roomLevelFromUrl=this.$scope.levels.filter(function(v){return v.level===_this.roomLevelFromUrl})[0]),this.$scope.startModalState=Interfaces.StartGameModalState.startNewGame,""!==this.roomIdFromUrl?(this.$rootScope.gameMode=Interfaces.GameMode.withFriend,this.stateHandler.showConnectToRoomWindow()):(this.$rootScope.gameMode=Interfaces.GameMode.onlineWithEverybody,this.stateHandler.showStartGameWindow()),this.$rootScope.$toObservable("userId").select(function(change){return change.newValue}).where(function(id){return null!=id||""!==id}).subscribe(function(id){return _this.$rootScope.urlForRoom=_this.generateUrlForRoom(""!==_this.roomIdFromUrl?_this.roomIdFromUrl:_this.createdRoomId||id)}),this.$rootScope.$toObservable("gameMode").select(function(change){return change.newValue}).where(function(gameMode){return gameMode===Interfaces.GameMode.onlineWithEverybody}).subscribe(function(_){return _this.$rootScope.urlForRoom=""})},ConnectToGameController.prototype.getParameterFromUrl=function(name){var url=location.href;name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regexS="[\\?&/]"+name+"=([^&#]*)",regex=new RegExp(regexS),results=regex.exec(url);return null==results?"":results[1]},ConnectToGameController.prototype.onGroupFulled=function(groupInfo){this.groupInfo=groupInfo,this.stateHandler.handleGroupFulled()},ConnectToGameController.prototype.onUserLeft=function(groupInfo){this.groupInfo=null,this.stateHandler.handleUser2LeftGroup()},ConnectToGameController.prototype.connectToGroup=function(isGameWithFriend,groupId,level){var _this=this,displayName=this.stateHandler.getUserDisplayName();level=level||this.$rootScope.level.level;try{this.coockieService.setCookie(this.displayNameCookieKey,displayName),this.coockieService.setCookie(this.levelCookieKey,level)}catch(error){this.$log.error(error)}this.$rootScope.gameMode=isGameWithFriend?Interfaces.GameMode.withFriend:Interfaces.GameMode.onlineWithEverybody;var rootScope=this.$rootScope,promise=this.connectionHubService.connectToNewGroup(displayName,level,isGameWithFriend||!1,groupId).done(function(){isGameWithFriend&&!groupId&&(_this.createdRoomId=_this.createdRoomId||rootScope.userId)});this.stateHandler.handleConnectionToGroup(promise)},ConnectToGameController.prototype.onConnectedToGroup=function(userId){this.stateHandler.setUserId(userId),this.stateHandler.handleUserAddedToGroup()},ConnectToGameController.prototype.generateUrlForRoom=function(roomId){return"http://"+window.location.host+"/roomId="+roomId+"&level="+this.$rootScope.level.level},ConnectToGameController.$inject=["Services.ConnectToGameService","$scope","Services.StateHandlerService","$rootScope","Services.CookieService","$log"],ConnectToGameController}();controllers.ConnectToGameController=ConnectToGameController,angular.module(Common.GetConstants().appName).controller("controllers.ConnectToGameController",ConnectToGameController)}(controllers||(controllers={}));var controllers;!function(controllers){var GameController=function(){function GameController(connectionHubService,$scope,stateHandler,$interval,$timeout){this.connectionHubService=connectionHubService,this.$scope=$scope,this.stateHandler=stateHandler,this.$interval=$interval,this.secondsForMove=10,this.$timeout=$timeout,this.quates=["How many languages you know — that many times you are a person","If you talk to a man in a language he understands, that goes to his head. If you talk to him in his language, that goes to his heart","By words the mind is winged","Language is the means of getting an idea from my brain into yours without surgery","A different language is a different vision of life","To have another language is to possess a second soul","If we spoke a different language, we would perceive a somewhat different world","Language exerts hidden power, like the moon on the tides","Language is the road map of a culture. It tells you where its people come from and where they are going","He who does not know foreign languages does not know anything about his own"],this.initializeViewModel()}return GameController.prototype.initializeViewModel=function(){var _this=this;this.connectionHubService.gameStarted(function(data){return _this.startGame.call(_this,data)}),this.connectionHubService.didMove(function(data){return _this.user2didMove.call(_this,data)}),this.connectionHubService.onGroupFulled(function(data){return _this.handleGroupFulled.call(_this,data)}),this.$scope.doMove=function(variant){return _this.doMove.call(_this,variant)},this.connectionHubService.onUserLeft(function(){return _this.onUserLeft.call(_this)}),this.unsetGameInfo(),this.stateHandler.setUpGameScope(this.$scope);var randomQuateIndex=Math.floor(Math.random()*this.quates.length);this.$scope.randomQuate=this.quates[randomQuateIndex]},GameController.prototype.handleGroupFulled=function(group){var _this=this;this.callInDigestLoop(function(){var isUser1=group.usersList[0].userId===_this.stateHandler.getUserId();_this.$scope.user2DisplayName=isUser1?group.usersList[1].displayName:group.usersList[0].displayName;var user2=isUser1?group.usersList[1]:group.usersList[0];user2.isBot?(_this.botForGame=new Models.Bot,_this.isGameWithBot=!0):_this.isGameWithBot=!1})},GameController.prototype.onUserLeft=function(){this.stopTimer(),this.unsetGameInfo()},GameController.prototype.unsetGameInfo=function(){var _this=this;this.gameInfo=null,this.botForGame=null,this.isGameWithBot=null,this.callInDigestLoop(function(){_this.$scope.currentWord=null,_this.$scope.secondsForMoveLeft=null,_this.$scope.percentagesLeft=null,_this.$scope.isCurrentUserMove=null,_this.$scope.currentUserScore=null,_this.$scope.user2Score=null,_this.$scope.passedWords=[],_this.$scope.leftWords=[],_this.$scope.user2DisplayName=null})},GameController.prototype.startGame=function(game){var _this=this;this.gameInfo=game,this.words=game.words;var isUser1=game.user1.userId===this.stateHandler.getUserId();this.userNum=isUser1?1:2,this.$scope.$apply(function(){function shuffle(arr){for(var t,i,array=arr.slice(0),m=array.length;m;)i=Math.floor(Math.random()*m--),t=array[m],array[m]=array[i],array[i]=t;return array}_this.$scope.currentUserScore=isUser1?game.user1Score:game.user2Score,_this.$scope.user2Score=isUser1?game.user2Score:game.user1Score,_this.$scope.currentWordIndex=0,_this.$scope.currentWord=_this.words[0],_this.setVarinatsOrder(),_this.$scope.isCurrentUserMove=isUser1&&1===_this.gameInfo.currentMove||!isUser1&&2===_this.gameInfo.currentMove,_this.$scope.leftWords=shuffle(_this.words.slice(1))}),this.stateHandler.handleGameStarted(),this.startTimer()},GameController.prototype.callInDigestLoop=function(action){this.$scope.$$phase?action():this.$scope.$apply(function(){action()})},GameController.prototype.startTimer=function(){var _this=this;if(this.timerPromise)throw"Previous timer should be stopped";this.callInDigestLoop(function(){_this.$scope.secondsForMoveLeft=_this.secondsForMove,_this.$scope.percentagesLeft=100}),this.isGameWithBot&&this.botForGame.handleTimerStarted(10),this.timerPromise=this.$interval(function(){if(_this.$scope.secondsForMoveLeft--,_this.$scope.percentagesLeft=_this.$scope.secondsForMoveLeft/10*100,!_this.$scope.isCurrentUserMove&&_this.isGameWithBot){var variant=_this.botForGame.handleTimerTick(_this.$scope.secondsForMoveLeft,_this.$scope.currentWord.translateVariants);_this.handleBotMove(variant)}else 0===_this.$scope.secondsForMoveLeft&&_this.$scope.isCurrentUserMove&&_this.passMove()},1e3,10)},GameController.prototype.stopTimer=function(){this.timerPromise&&(this.$interval.cancel(this.timerPromise),this.timerPromise=null)},GameController.prototype.handleBotMove=function(variant){null!==variant&&this.connectionHubService.doMove(1===this.userNum?2:1,this.$scope.currentWord.word,variant).fail(function(error){return console.log("failed bot move. "+error)})},GameController.prototype.user2didMove=function(moveRes){var _this=this;this.$scope.$apply(function(){_this.handleMove(moveRes,!1)})},GameController.prototype.passMove=function(){var _this=this;this.connectionHubService.passMove(this.userNum).done(function(moveResult){_this.$scope.$apply(function(){_this.handleMove(moveResult,!0)})})},GameController.prototype.doMove=function(variant){var _this=this;if(0===this.$scope.currentWord.translateVariants.filter(function(v){return v.isSelected}).length&&(this.stopTimer(),0!==this.$scope.secondsForMoveLeft)){var selectedVar=this.$scope.currentWord.translateVariants.filter(function(v){return v.variant===variant})[0];selectedVar?selectedVar.isSelected=!0:console.log("Incorrect var selected"),this.connectionHubService.doMove(this.userNum,this.$scope.currentWord.word,variant).done(function(moveResult){_this.$scope.$apply(function(){_this.handleMove(moveResult,!0)})})}},GameController.prototype.handleMove=function(moveRes,isCurrentUserMove){var _this=this;this.stopTimer(),moveRes.isSkipped&&(this.$scope.secondsForMoveLeft=0,this.$scope.percentagesLeft=0);var currentUserScore=1===this.userNum?this.gameInfo.user1Score:this.gameInfo.user2Score,user2Score=1===this.userNum?this.gameInfo.user2Score:this.gameInfo.user1Score,score=isCurrentUserMove?currentUserScore:user2Score;moveRes.isCorrect?moveRes.isSuccessful?score.successfulMoves++:score.wrongMoves++:console.error(moveRes.errorMessage),moveRes.selectedVariantIndex!==-1&&(this.$scope.currentWord.translateVariants[moveRes.selectedVariantIndex].isSelected=!0),1===this.userNum?(this.$scope.currentUserScore=this.gameInfo.user1Score,this.$scope.user2Score=this.gameInfo.user2Score):(this.$scope.currentUserScore=this.gameInfo.user2Score,this.$scope.user2Score=this.gameInfo.user1Score),this.$timeout(function(){function removeFromArrayIf(arr,callback){for(var i=0;i<arr.length;){if(callback(arr[i],i))return void arr.splice(i,1);++i}}if(_this.$scope.isCurrentUserMove=!isCurrentUserMove,_this.$scope.currentWordIndex++,isCurrentUserMove){var passedWord=new Models.PassedWordInfo;passedWord.word=_this.$scope.currentWord.word,passedWord.answer=_this.$scope.currentWord.translateVariants.filter(function(i){return i.isTrue}).shift().variant,passedWord.wasPassed=moveRes.isSuccessful,_this.$scope.passedWords.push(passedWord)}_this.$scope.currentWord=_this.gameInfo.words[_this.$scope.currentWordIndex],_this.setVarinatsOrder(),removeFromArrayIf(_this.$scope.leftWords,function(w){return w.word===_this.$scope.currentWord.word}),moveRes.isLastMove?(_this.stateHandler.handleGameFinished(_this.$scope.currentUserScore.successfulMoves>_this.$scope.user2Score.successfulMoves,_this.$scope.currentUserScore.successfulMoves==_this.$scope.user2Score.successfulMoves),_this.unsetGameInfo(),_this.connectionHubService.stopHubConnection()):_this.startTimer()},1e3,!0)},GameController.prototype.setVarinatsOrder=function(){this.$scope.currentWord&&this.$scope.currentWord.translateVariants.forEach(function(value,index){return value.order=index+1})},GameController.$inject=["Services.ConnectToGameService","$scope","Services.StateHandlerService","$interval","$timeout"],GameController}();controllers.GameController=GameController,angular.module(Common.GetConstants().appName).controller("controllers.GameController",GameController)}(controllers||(controllers={})),$(function(){$("#word, .word-left-item-caption").attr("unselectable","on").css({"-moz-user-select":"-moz-none","-o-user-select":"none","-khtml-user-select":"none","-webkit-user-select":"none","-ms-user-select":"none","user-select":"none"}).bind("selectstart",function(){return!1})}),$(function(){function setTooltip(btn,message){$(btn).tooltip("hide").attr("data-original-title",message).tooltip("show")}function hideTooltip(btn){setTimeout(function(){$(btn).tooltip("hide")},1e3)}$(document).keypress(function(e){if(13===e.which)$(".btn-submit:visible").first().click();else if(e.which>=48&&e.which<=57){var numPressed_1=e.which-48;$(".translateVariant:visible").filter(function(index,elem){return $(elem).data("order")===numPressed_1}).first().click()}}),$("button").tooltip({trigger:"click",placement:"bottom"});var clipboard=new Clipboard("#copyToClipboardBtn");clipboard.on("success",function(e){setTooltip(e.trigger,"Copied!"),hideTooltip(e.trigger)}),clipboard.on("error",function(e){console.log(e)})}),$(function(){$("#user2variants").bind("DOMNodeInserted",function(){return $(".translateVariant.nohover").tooltip()})});