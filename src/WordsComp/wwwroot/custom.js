/// <reference path="../../typings/globals/angular/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
/// <reference path="../../typings/globals/signalr/index.d.ts" />
/// <reference path="../../typings/globals/es6-shim/index.d.ts" />
var Common;
(function (Common) {
    var Constants = (function () {
        function Constants() {
            this.appName = "gameApp";
            this.hubConnectToGroupMethodName = "connect";
            this.connectedToGroup = "userAdded";
            this.leftGroup = "userLeft";
            this.groupFulled = "groupFulled";
            this.competitionHub = "competitionHub";
        }
        return Constants;
    }());
    Common.Constants = Constants;
    function GetConstants() {
        return new Constants();
    }
    Common.GetConstants = GetConstants;
})(Common || (Common = {}));
/// <reference path="common.ts" />
(function () {
    var constants = Common.GetConstants();
    var app = angular.module(constants.appName, []);
})();
var Models;
(function (Models) {
    var User = (function () {
        function User() {
        }
        return User;
    }());
    Models.User = User;
})(Models || (Models = {}));
/// <reference path="./User.ts" />
var Models;
(function (Models) {
    var Group = (function () {
        function Group() {
        }
        return Group;
    }());
    Models.Group = Group;
})(Models || (Models = {}));
// Used to reference model files
/// <reference path="./User.ts" />
/// <reference path="./Group.ts" /> 
/// <reference path="../common.ts" />
/// <reference path="../models/models.ts" />
/// <reference path="../common.ts" />
/// <reference path="../common.ts" />
/// <reference path="./interfaces/iConnectToGame.ts" />
/// <reference path="./interfaces/iConnectToGameScope.ts" />
/// <reference path="./interfaces/iHubConnection.ts" />
/// <reference path="./models/models.ts" /> 
/// <reference path="../interfaces.ts" />
var Services;
(function (Services) {
    var HubConnectionService = (function () {
        function HubConnectionService() {
        }
        HubConnectionService.prototype.getConnection = function () {
            if (!HubConnectionService.connection) {
                HubConnectionService.connection = $.hubConnection("/signalr", { useDefaultPath: false });
                HubConnectionService.connection.logging = true;
            }
            return HubConnectionService.connection;
        };
        return HubConnectionService;
    }());
    Services.HubConnectionService = HubConnectionService;
    angular.module(Common.GetConstants().appName).service("Services.HubConnectionService", HubConnectionService);
})(Services || (Services = {}));
/// <reference path="../interfaces.ts" />
var Services;
(function (Services) {
    var ConnectToGameService = (function () {
        function ConnectToGameService(hubConnectionService) {
            this.constants = Common.GetConstants();
            this.connection = hubConnectionService.getConnection();
            this.hub = this.connection.createHubProxy(this.constants.competitionHub);
        }
        ConnectToGameService.prototype.connectToHub = function () {
            return this.hub.connection.start();
        };
        ConnectToGameService.prototype.connectToNewGroup = function () {
            return this.hub.invoke(this.constants.hubConnectToGroupMethodName);
        };
        ConnectToGameService.prototype.onConnectedToGroup = function (callBack) {
            this.hub.on(this.constants.connectedToGroup, function (msg) { return callBack(msg[0]); });
        };
        ConnectToGameService.prototype.onGroupFulled = function (callBack) {
            this.hub.on(this.constants.groupFulled, function (msg) { return callBack(msg[0]); });
        };
        ConnectToGameService.prototype.onUserLeft = function (callBack) {
            this.hub.on(this.constants.leftGroup, function (msg) { return callBack(msg[0]); });
        };
        ConnectToGameService.$inject = ["Services.HubConnectionService"];
        return ConnectToGameService;
    }());
    Services.ConnectToGameService = ConnectToGameService;
    angular.module(Common.GetConstants().appName).service("Services.ConnectToGameService", ConnectToGameService);
})(Services || (Services = {}));
/// <reference path="../common.ts" />
/// <reference path="../interfaces.ts" />
var controllers;
(function (controllers) {
    var ConnectToGameController = (function () {
        function ConnectToGameController(connectionHubService, $scope) {
            this.connectionHubService = connectionHubService;
            this.$scope = $scope;
            this.initializeViewModel();
        }
        ConnectToGameController.prototype.initializeViewModel = function () {
            var _this = this;
            this.$scope.isConnectingToHub = true;
            this.$scope.isConnectedToHubSuccessfully = null;
            this.connectionHubService.onUserLeft(function (data) { return _this.onUserLeft.call(_this, data); });
            this.connectionHubService.onGroupFulled(function (data) { return _this.onGroupFulled.call(_this, data); });
            this.$scope.connectToGroup = function () { return _this.connectToGroup.apply(_this); };
            this.connectionHubService.connectToHub().done(function (value) {
                _this.$scope.$apply(function () {
                    _this.userId = value;
                    _this.$scope.isConnectedToHubSuccessfully = true;
                });
            }).always(function () {
                _this.$scope.$apply(function () {
                    _this.$scope.isConnectingToHub = false;
                });
            }).fail(function () {
                _this.$scope.$apply(function () {
                    _this.$scope.isConnectedToHubSuccessfully = false;
                });
            });
        };
        ConnectToGameController.prototype.onGroupFulled = function (groupInfo) {
            var _this = this;
            this.$scope.$apply(function () {
                _this.$scope.isConnectedToGroup = false;
                _this.userId = null;
                _this.groupInfo = null;
                _this.$scope.isWaitingForNewUserToConnect = false;
            });
        };
        ConnectToGameController.prototype.onUserLeft = function (groupInfo) {
            var _this = this;
            this.$scope.$apply(function () {
                _this.$scope.isConnectedToGroup = false;
                _this.userId = null;
                _this.groupInfo = null;
                _this.$scope.isWaitingForNewUserToConnect = true;
            });
        };
        ConnectToGameController.prototype.connectToGroup = function () {
            var _this = this;
            this.$scope.isConnectingToGroup = true;
            this.$scope.isConnectedToGroup = null;
            this.connectionHubService.connectToNewGroup().done(function (userId) {
                _this.$scope.$apply(function () {
                    _this.$scope.isConnectedToGroup = true;
                    _this.userId = userId;
                });
            }).fail(function (error) {
                _this.$scope.$apply(function () {
                    _this.$scope.isConnectedToGroup = false;
                });
            }).always(function () {
                _this.$scope.$apply(function () {
                    _this.$scope.isConnectingToGroup = false;
                });
            });
        };
        ConnectToGameController.$inject = ["Services.ConnectToGameService", "$scope"];
        return ConnectToGameController;
    }());
    controllers.ConnectToGameController = ConnectToGameController;
    angular.module(Common.GetConstants().appName).controller("controllers.ConnectToGameController", ConnectToGameController);
})(controllers || (controllers = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd3d3Jvb3QvdHNjcmlwdHMvY29tbW9uLnRzIiwid3d3cm9vdC90c2NyaXB0cy9hcHAudHMiLCJ3d3dyb290L3RzY3JpcHRzL21vZGVscy9Vc2VyLnRzIiwid3d3cm9vdC90c2NyaXB0cy9tb2RlbHMvZ3JvdXAudHMiLCJ3d3dyb290L3RzY3JpcHRzL21vZGVscy9tb2RlbHMudHMiLCJ3d3dyb290L3RzY3JpcHRzL2ludGVyZmFjZXMvaUNvbm5lY3RUb0dhbWUudHMiLCJ3d3dyb290L3RzY3JpcHRzL2ludGVyZmFjZXMvaUNvbm5lY3RUb0dhbWVTY29wZS50cyIsInd3d3Jvb3QvdHNjcmlwdHMvaW50ZXJmYWNlcy9pSHViQ29ubmVjdGlvbi50cyIsInd3d3Jvb3QvdHNjcmlwdHMvaW50ZXJmYWNlcy50cyIsInd3d3Jvb3QvdHNjcmlwdHMvc2VydmljZXMvaHViQ29ubmVjdGlvblNlcnZpY2UudHMiLCJ3d3dyb290L3RzY3JpcHRzL3NlcnZpY2VzL2Nvbm5lY3RUb0dhbWVTZXJ2aWNlLnRzIiwid3d3cm9vdC90c2NyaXB0cy9jb250cm9sbGVycy9jb25uZWN0aW9uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpRUFBaUU7QUFDakUsZ0VBQWdFO0FBQ2hFLGlFQUFpRTtBQUNqRSxrRUFBa0U7QUFDbEUsSUFBTyxNQUFNLENBc0JaO0FBdEJELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWDtRQVFJO1lBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUE7WUFDeEIsSUFBSSxDQUFDLDJCQUEyQixHQUFHLFNBQVMsQ0FBQztZQUM3QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1lBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7UUFDM0MsQ0FBQztRQUNMLGdCQUFD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LElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1lBRXRDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQ3JELEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUNiLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO29CQUN0QyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLO2dCQUNULEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUNiLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO2dCQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDTixLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDYixLQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFuRU0sK0JBQU8sR0FBRyxDQUFDLCtCQUErQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBb0VqRSw4QkFBQztJQUFELENBMUVBLEFBMEVDLElBQUE7SUExRVksbUNBQXVCLDBCQTBFbkMsQ0FBQTtJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxxQ0FBcUMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0FBQzdILENBQUMsRUE5RU0sV0FBVyxLQUFYLFdBQVcsUUE4RWpCIiwiZmlsZSI6ImN1c3RvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2dsb2JhbHMvYW5ndWxhci9pbmRleC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3MvZ2xvYmFscy9qcXVlcnkvaW5kZXguZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2dsb2JhbHMvc2lnbmFsci9pbmRleC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3MvZ2xvYmFscy9lczYtc2hpbS9pbmRleC5kLnRzXCIgLz5cclxubW9kdWxlIENvbW1vbiB7XHJcbiAgICBleHBvcnQgY2xhc3MgQ29uc3RhbnRzIHtcclxuICAgICAgICBwdWJsaWMgYXBwTmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBodWJDb25uZWN0VG9Hcm91cE1ldGhvZE5hbWU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgY29ubmVjdGVkVG9Hcm91cDogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBsZWZ0R3JvdXA6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgZ3JvdXBGdWxsZWQ6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgY29tcGV0aXRpb25IdWI6IHN0cmluZztcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwTmFtZSA9IFwiZ2FtZUFwcFwiXHJcbiAgICAgICAgICAgIHRoaXMuaHViQ29ubmVjdFRvR3JvdXBNZXRob2ROYW1lID0gXCJjb25uZWN0XCI7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkVG9Hcm91cCA9IFwidXNlckFkZGVkXCI7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdEdyb3VwID0gXCJ1c2VyTGVmdFwiO1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwRnVsbGVkID0gXCJncm91cEZ1bGxlZFwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBldGl0aW9uSHViID0gXCJjb21wZXRpdGlvbkh1YlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uICBHZXRDb25zdGFudHMoKTpDb25zdGFudHMge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29uc3RhbnRzKCk7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiY29tbW9uLnRzXCIgLz5cclxuKCgpOiB2b2lkPT4ge1xyXG4gICAgdmFyIGNvbnN0YW50cyA9IENvbW1vbi5HZXRDb25zdGFudHMoKTtcclxuICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZShjb25zdGFudHMuYXBwTmFtZSwgW10pO1xyXG59KSgpOyIsIm1vZHVsZSBNb2RlbHMge1xyXG4gICAgZXhwb3J0IGNsYXNzIFVzZXIge1xyXG4gICAgICAgIHB1YmxpYyB1c2VySWQ6IHN0cmluZztcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1VzZXIudHNcIiAvPlxyXG5tb2R1bGUgTW9kZWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHcm91cCB7XHJcbiAgICAgICAgcHVibGljIGdyb3VwSWQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIHVzZXJzTGlzdDogQXJyYXk8TW9kZWxzLlVzZXI+XHJcbiAgICB9XHJcbn0iLCIvLyBVc2VkIHRvIHJlZmVyZW5jZSBtb2RlbCBmaWxlc1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9Vc2VyLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vR3JvdXAudHNcIiAvPiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbW9kZWxzL21vZGVscy50c1wiIC8+XHJcbm1vZHVsZSBJbnRlcmZhY2VzIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNvbm5lY3RUb0dhbWUge1xyXG4gICAgICAgIGNvbm5lY3RUb0h1YjogKCkgPT4gSlF1ZXJ5UHJvbWlzZTxhbnk+O1xyXG5cclxuICAgICAgICBjb25uZWN0VG9OZXdHcm91cDogKCkgPT4gSlF1ZXJ5UHJvbWlzZTxhbnk+XHJcblxyXG4gICAgICAgIG9uQ29ubmVjdGVkVG9Hcm91cDogKGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdyb3VwKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG5cclxuICAgICAgICBvbkdyb3VwRnVsbGVkOiAoY2FsbEJhY2s6KGdyb3VwOiBNb2RlbHMuR3JvdXApID0+IHZvaWQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIG9uVXNlckxlZnQ6IChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCkgPT4gdm9pZDtcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG5tb2R1bGUgSW50ZXJmYWNlcyB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElDb25uZWN0VG9HYW1lU2NvcGUgZXh0ZW5kcyBuZy5JU2NvcGUge1xyXG4gICAgICAgIGlzQ29ubmVjdGluZ1RvSHViOiBib29sZWFuO1xyXG4gICAgICAgIGlzQ29ubmVjdGVkVG9IdWJTdWNjZXNzZnVsbHk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGlzQ29ubmVjdGluZ1RvR3JvdXA6IGJvb2xlYW47XHJcbiAgICAgICAgaXNDb25uZWN0ZWRUb0dyb3VwOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvLyB0cnVlID09PSB3YWl0aW5nLCBmYWxzZSA9PT0gbmV3IHVzZXIgY29ubmVjdGVkLCBudWxsID09PSB1bmtub3duXHJcbiAgICAgICAgaXNXYWl0aW5nRm9yTmV3VXNlclRvQ29ubmVjdDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY29ubmVjdFRvR3JvdXA6ICgpID0+IHZvaWQ7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uLnRzXCIgLz5cclxubW9kdWxlIEludGVyZmFjZXMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJSHViQ29ubmVjdGlvbiB7XHJcbiAgICAgICAgZ2V0Q29ubmVjdGlvbjogKCkgPT4gU2lnbmFsUi5IdWIuQ29ubmVjdGlvblxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW50ZXJmYWNlcy9pQ29ubmVjdFRvR2FtZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2ludGVyZmFjZXMvaUNvbm5lY3RUb0dhbWVTY29wZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2ludGVyZmFjZXMvaUh1YkNvbm5lY3Rpb24udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9tb2RlbHMvbW9kZWxzLnRzXCIgLz4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vaW50ZXJmYWNlcy50c1wiIC8+XHJcbm1vZHVsZSBTZXJ2aWNlcyB7XHJcbiAgICBleHBvcnQgY2xhc3MgSHViQ29ubmVjdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJbnRlcmZhY2VzLklIdWJDb25uZWN0aW9uIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBjb25uZWN0aW9uOiBTaWduYWxSLkh1Yi5Db25uZWN0aW9uO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Q29ubmVjdGlvbigpOiBTaWduYWxSLkh1Yi5Db25uZWN0aW9uIHtcclxuICAgICAgICAgICAgaWYgKCFIdWJDb25uZWN0aW9uU2VydmljZS5jb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBIdWJDb25uZWN0aW9uU2VydmljZS5jb25uZWN0aW9uID0gJC5odWJDb25uZWN0aW9uKFwiL3NpZ25hbHJcIiwgeyB1c2VEZWZhdWx0UGF0aDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICBIdWJDb25uZWN0aW9uU2VydmljZS5jb25uZWN0aW9uLmxvZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBIdWJDb25uZWN0aW9uU2VydmljZS5jb25uZWN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFuZ3VsYXIubW9kdWxlKENvbW1vbi5HZXRDb25zdGFudHMoKS5hcHBOYW1lKS5zZXJ2aWNlKFwiU2VydmljZXMuSHViQ29ubmVjdGlvblNlcnZpY2VcIiwgSHViQ29ubmVjdGlvblNlcnZpY2UpO1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2ludGVyZmFjZXMudHNcIiAvPlxyXG5tb2R1bGUgU2VydmljZXMge1xyXG4gICAgZXhwb3J0IGNsYXNzIENvbm5lY3RUb0dhbWVTZXJ2aWNlIGltcGxlbWVudHMgSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBodWI6IFNpZ25hbFIuSHViLlByb3h5O1xyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdGlvbjogU2lnbmFsUi5IdWIuQ29ubmVjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGNvbnN0YW50czogQ29tbW9uLkNvbnN0YW50cztcclxuXHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbXCJTZXJ2aWNlcy5IdWJDb25uZWN0aW9uU2VydmljZVwiXTtcclxuICAgICAgICBjb25zdHJ1Y3RvcihodWJDb25uZWN0aW9uU2VydmljZTogSW50ZXJmYWNlcy5JSHViQ29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnN0YW50cyA9IENvbW1vbi5HZXRDb25zdGFudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gaHViQ29ubmVjdGlvblNlcnZpY2UuZ2V0Q29ubmVjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmh1YiA9IHRoaXMuY29ubmVjdGlvbi5jcmVhdGVIdWJQcm94eSh0aGlzLmNvbnN0YW50cy5jb21wZXRpdGlvbkh1Yik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29ubmVjdFRvSHViKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh1Yi5jb25uZWN0aW9uLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY29ubmVjdFRvTmV3R3JvdXAoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHViLmludm9rZSh0aGlzLmNvbnN0YW50cy5odWJDb25uZWN0VG9Hcm91cE1ldGhvZE5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uQ29ubmVjdGVkVG9Hcm91cChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmh1Yi5vbih0aGlzLmNvbnN0YW50cy5jb25uZWN0ZWRUb0dyb3VwLCAobXNnKSA9PiBjYWxsQmFjayhtc2dbMF0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkdyb3VwRnVsbGVkKGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdyb3VwKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaHViLm9uKHRoaXMuY29uc3RhbnRzLmdyb3VwRnVsbGVkLCAobXNnKSA9PiBjYWxsQmFjayhtc2dbMF0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvblVzZXJMZWZ0KGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdyb3VwKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaHViLm9uKHRoaXMuY29uc3RhbnRzLmxlZnRHcm91cCwgKG1zZykgPT4gY2FsbEJhY2sobXNnWzBdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKENvbW1vbi5HZXRDb25zdGFudHMoKS5hcHBOYW1lKS5zZXJ2aWNlKFwiU2VydmljZXMuQ29ubmVjdFRvR2FtZVNlcnZpY2VcIiwgQ29ubmVjdFRvR2FtZVNlcnZpY2UpO1xyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbnRlcmZhY2VzLnRzXCIgLz5cclxubW9kdWxlIGNvbnRyb2xsZXJzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBDb25uZWN0VG9HYW1lQ29udHJvbGxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0aW9uSHViU2VydmljZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZTtcclxuICAgICAgICBwcml2YXRlICRzY29wZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZVNjb3BlO1xyXG4gICAgICAgIHByaXZhdGUgdXNlcklkOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBncm91cEluZm86IE1vZGVscy5Hcm91cDtcclxuXHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbXCJTZXJ2aWNlcy5Db25uZWN0VG9HYW1lU2VydmljZVwiLCBcIiRzY29wZVwiXTtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uSHViU2VydmljZTogSW50ZXJmYWNlcy5JQ29ubmVjdFRvR2FtZSwgJHNjb3BlOiBJbnRlcmZhY2VzLklDb25uZWN0VG9HYW1lU2NvcGUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZSA9IGNvbm5lY3Rpb25IdWJTZXJ2aWNlO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplVmlld01vZGVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGluaXRpYWxpemVWaWV3TW9kZWwoKTp2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDb25uZWN0aW5nVG9IdWIgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5pc0Nvbm5lY3RlZFRvSHViU3VjY2Vzc2Z1bGx5ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2Uub25Vc2VyTGVmdChkYXRhID0+IHRoaXMub25Vc2VyTGVmdC5jYWxsKHRoaXMsIGRhdGEpKTtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSHViU2VydmljZS5vbkdyb3VwRnVsbGVkKGRhdGEgPT4gdGhpcy5vbkdyb3VwRnVsbGVkLmNhbGwodGhpcywgZGF0YSkpO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5jb25uZWN0VG9Hcm91cCA9ICgpID0+IHRoaXMuY29ubmVjdFRvR3JvdXAuYXBwbHkodGhpcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLmNvbm5lY3RUb0h1YigpLmRvbmUodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlcklkID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ29ubmVjdGVkVG9IdWJTdWNjZXNzZnVsbHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ29ubmVjdGluZ1RvSHViID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDb25uZWN0ZWRUb0h1YlN1Y2Nlc3NmdWxseSA9IGZhbHNlOyBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uR3JvdXBGdWxsZWQoZ3JvdXBJbmZvOiBNb2RlbHMuR3JvdXApOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ29ubmVjdGVkVG9Hcm91cCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cEluZm8gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNXYWl0aW5nRm9yTmV3VXNlclRvQ29ubmVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvblVzZXJMZWZ0KGdyb3VwSW5mbzogTW9kZWxzLkdyb3VwKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5pc0Nvbm5lY3RlZFRvR3JvdXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlcklkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBJbmZvID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzV2FpdGluZ0Zvck5ld1VzZXJUb0Nvbm5lY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0VG9Hcm91cCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDb25uZWN0aW5nVG9Hcm91cCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ29ubmVjdGVkVG9Hcm91cCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLmNvbm5lY3RUb05ld0dyb3VwKCkuZG9uZSh1c2VySWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ29ubmVjdGVkVG9Hcm91cCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuZmFpbChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS4kYXBwbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDb25uZWN0ZWRUb0dyb3VwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS4kYXBwbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDb25uZWN0aW5nVG9Hcm91cCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoQ29tbW9uLkdldENvbnN0YW50cygpLmFwcE5hbWUpLmNvbnRyb2xsZXIoXCJjb250cm9sbGVycy5Db25uZWN0VG9HYW1lQ29udHJvbGxlclwiLCBDb25uZWN0VG9HYW1lQ29udHJvbGxlcik7XHJcbn0gIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
