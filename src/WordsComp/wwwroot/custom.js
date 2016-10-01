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
            this.leftGroup = "leftGroup";
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
/// <reference path="../common.ts" />
/// <reference path="../common.ts" />
/// <reference path="../common.ts" />
var Models;
(function (Models) {
    var User = (function () {
        function User() {
        }
        return User;
    }());
    Models.User = User;
})(Models || (Models = {}));
var Models;
(function (Models) {
    var Group = (function () {
        function Group() {
        }
        return Group;
    }());
    Models.Group = Group;
})(Models || (Models = {}));
/// <reference path="./interfaces/iConnectToGame.ts" /> 
/// <reference path="../interfaces.ts" />
var Services;
(function (Services) {
    var HubConnectionService = (function () {
        function HubConnectionService() {
        }
        HubConnectionService.prototype.getConnection = function () {
            if (!HubConnectionService.connection) {
                HubConnectionService.connection = $.hubConnection;
            }
            return HubConnectionService.connection();
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
            var res = null;
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
            this.connectionHubService.onUserLeft(this.onUserLeft);
            this.$scope.connectToGroup = function () { return _this.connectToGroup.apply(_this); };
        };
        ConnectToGameController.prototype.onUserLeft = function () {
            var _this = this;
            this.$scope.$apply(function () {
                _this.$scope.isConnectedToGroup = false;
            });
        };
        ConnectToGameController.prototype.connectToGroup = function () {
            var _this = this;
            this.$scope.isConnectingToGroup = true;
            this.$scope.isConnectedToGroup = null;
            this.connectionHubService.connectToNewGroup().done(function (g) {
                _this.$scope.$apply(function () {
                    _this.$scope.isConnectedToGroup = true;
                });
            }).fail(function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd3d3Jvb3QvdHNjcmlwdHMvY29tbW9uLnRzIiwid3d3cm9vdC90c2NyaXB0cy9hcHAudHMiLCJ3d3dyb290L3RzY3JpcHRzL2ludGVyZmFjZXMvaUNvbm5lY3RUb0dhbWUudHMiLCJ3d3dyb290L3RzY3JpcHRzL2ludGVyZmFjZXMvaUNvbm5lY3RUb0dhbWVTY29wZS50cyIsInd3d3Jvb3QvdHNjcmlwdHMvaW50ZXJmYWNlcy9pSHViQ29ubmVjdGlvbi50cyIsInd3d3Jvb3QvdHNjcmlwdHMvbW9kZWxzL1VzZXIudHMiLCJ3d3dyb290L3RzY3JpcHRzL21vZGVscy9ncm91cC50cyIsInd3d3Jvb3QvdHNjcmlwdHMvaW50ZXJmYWNlcy50cyIsInd3d3Jvb3QvdHNjcmlwdHMvc2VydmljZXMvaHViQ29ubmVjdGlvblNlcnZpY2UudHMiLCJ3d3dyb290L3RzY3JpcHRzL3NlcnZpY2VzL2Nvbm5lY3RUb0dhbWVTZXJ2aWNlLnRzIiwid3d3cm9vdC90c2NyaXB0cy9jb250cm9sbGVycy9jb25uZWN0aW9uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpRUFBaUU7QUFDakUsZ0VBQWdFO0FBQ2hFLGlFQUFpRTtBQUNqRSxrRUFBa0U7QUFDbEUsSUFBTyxNQUFNLENBc0JaO0FBdEJELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFDWDtRQVFJO1lBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUE7WUFDeEIsSUFBSSxDQUFDLDJCQUEyQixHQUFHLFNBQVMsQ0FBQztZQUM3QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1lBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7UUFDM0MsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FoQkEsQUFnQkMsSUFBQTtJQWhCWSxnQkFBUyxZ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Ly8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy9nbG9iYWxzL2FuZ3VsYXIvaW5kZXguZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2dsb2JhbHMvanF1ZXJ5L2luZGV4LmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy9nbG9iYWxzL3NpZ25hbHIvaW5kZXguZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2dsb2JhbHMvZXM2LXNoaW0vaW5kZXguZC50c1wiIC8+XHJcbm1vZHVsZSBDb21tb24ge1xyXG4gICAgZXhwb3J0IGNsYXNzIENvbnN0YW50cyB7XHJcbiAgICAgICAgcHVibGljIGFwcE5hbWU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgaHViQ29ubmVjdFRvR3JvdXBNZXRob2ROYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGNvbm5lY3RlZFRvR3JvdXA6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgbGVmdEdyb3VwOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGdyb3VwRnVsbGVkOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGNvbXBldGl0aW9uSHViOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcE5hbWUgPSBcImdhbWVBcHBcIlxyXG4gICAgICAgICAgICB0aGlzLmh1YkNvbm5lY3RUb0dyb3VwTWV0aG9kTmFtZSA9IFwiY29ubmVjdFwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZFRvR3JvdXAgPSBcInVzZXJBZGRlZFwiO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRHcm91cCA9IFwibGVmdEdyb3VwXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBGdWxsZWQgPSBcImdyb3VwRnVsbGVkXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGV0aXRpb25IdWIgPSBcImNvbXBldGl0aW9uSHViXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gIEdldENvbnN0YW50cygpOkNvbnN0YW50cyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zdGFudHMoKTtcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb21tb24udHNcIiAvPlxyXG4oKCk6IHZvaWQ9PiB7XHJcbiAgICB2YXIgY29uc3RhbnRzID0gQ29tbW9uLkdldENvbnN0YW50cygpO1xyXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKGNvbnN0YW50cy5hcHBOYW1lLCBbXSk7XHJcbn0pKCk7IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvbW1vbi50c1wiIC8+XHJcbm1vZHVsZSBJbnRlcmZhY2VzIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNvbm5lY3RUb0dhbWUge1xyXG4gICAgICAgIGNvbm5lY3RUb0h1YjogKCkgPT4gSlF1ZXJ5UHJvbWlzZTxhbnk+O1xyXG5cclxuICAgICAgICBjb25uZWN0VG9OZXdHcm91cDogKCkgPT4gSlF1ZXJ5UHJvbWlzZTxhbnk+XHJcblxyXG4gICAgICAgIG9uQ29ubmVjdGVkVG9Hcm91cDogKGNhbGxCYWNrOihncm91cDogTW9kZWxzLkdyb3VwKSA9PiB2b2lkKSA9PiB2b2lkO1xyXG5cclxuICAgICAgICBvbkdyb3VwRnVsbGVkOiAoY2FsbEJhY2s6KGdyb3VwOiBNb2RlbHMuR3JvdXApID0+IHZvaWQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIG9uVXNlckxlZnQ6IChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCkgPT4gdm9pZDtcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG5tb2R1bGUgSW50ZXJmYWNlcyB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElDb25uZWN0VG9HYW1lU2NvcGUgZXh0ZW5kcyBuZy5JU2NvcGUge1xyXG4gICAgICAgIGlzQ29ubmVjdGluZ1RvSHViOiBib29sZWFuO1xyXG4gICAgICAgIGlzQ29ubmVjdGVkVG9IdWJTdWNjZXNzZnVsbHk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGlzQ29ubmVjdGluZ1RvR3JvdXA6IGJvb2xlYW47XHJcbiAgICAgICAgaXNDb25uZWN0ZWRUb0dyb3VwOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25uZWN0VG9Hcm91cDogKCkgPT4gdm9pZDtcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG5tb2R1bGUgSW50ZXJmYWNlcyB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElIdWJDb25uZWN0aW9uIHtcclxuICAgICAgICBnZXRDb25uZWN0aW9uOiAoKSA9PiBTaWduYWxSLkh1Yi5Db25uZWN0aW9uXHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgTW9kZWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBVc2VyIHtcclxuICAgICAgICBwdWJsaWMgdXNlcklkOiBzdHJpbmc7XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgTW9kZWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHcm91cCB7XHJcbiAgICAgICAgcHVibGljIGdyb3VwSWQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIHVzZXJzTGlzdDogQXJyYXk8VXNlcj5cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2ludGVyZmFjZXMvaUNvbm5lY3RUb0dhbWUudHNcIiAvPiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbnRlcmZhY2VzLnRzXCIgLz5cclxubW9kdWxlIFNlcnZpY2VzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBIdWJDb25uZWN0aW9uU2VydmljZSBpbXBsZW1lbnRzIEludGVyZmFjZXMuSUh1YkNvbm5lY3Rpb24ge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNvbm5lY3Rpb246IFNpZ25hbFIuSHViLkh1YkNyZWF0b3I7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRDb25uZWN0aW9uKCk6IFNpZ25hbFIuSHViLkNvbm5lY3Rpb24ge1xyXG4gICAgICAgICAgICBpZiAoIUh1YkNvbm5lY3Rpb25TZXJ2aWNlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIEh1YkNvbm5lY3Rpb25TZXJ2aWNlLmNvbm5lY3Rpb24gPSAkLmh1YkNvbm5lY3Rpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEh1YkNvbm5lY3Rpb25TZXJ2aWNlLmNvbm5lY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhbmd1bGFyLm1vZHVsZShDb21tb24uR2V0Q29uc3RhbnRzKCkuYXBwTmFtZSkuc2VydmljZShcIlNlcnZpY2VzLkh1YkNvbm5lY3Rpb25TZXJ2aWNlXCIsIEh1YkNvbm5lY3Rpb25TZXJ2aWNlKTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pbnRlcmZhY2VzLnRzXCIgLz5cclxubW9kdWxlIFNlcnZpY2VzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBDb25uZWN0VG9HYW1lU2VydmljZSBpbXBsZW1lbnRzIEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWUge1xyXG4gICAgICAgIHByaXZhdGUgaHViOiBTaWduYWxSLkh1Yi5Qcm94eTtcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3Rpb246IFNpZ25hbFIuSHViLkNvbm5lY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdGFudHM6IENvbW1vbi5Db25zdGFudHM7XHJcblxyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiU2VydmljZXMuSHViQ29ubmVjdGlvblNlcnZpY2VcIl07XHJcbiAgICAgICAgY29uc3RydWN0b3IoaHViQ29ubmVjdGlvblNlcnZpY2U6IEludGVyZmFjZXMuSUh1YkNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jb25zdGFudHMgPSBDb21tb24uR2V0Q29uc3RhbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGh1YkNvbm5lY3Rpb25TZXJ2aWNlLmdldENvbm5lY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5odWIgPSB0aGlzLmNvbm5lY3Rpb24uY3JlYXRlSHViUHJveHkodGhpcy5jb25zdGFudHMuY29tcGV0aXRpb25IdWIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbm5lY3RUb0h1YigpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odWIuY29ubmVjdGlvbi5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNvbm5lY3RUb05ld0dyb3VwKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh1Yi5pbnZva2UodGhpcy5jb25zdGFudHMuaHViQ29ubmVjdFRvR3JvdXBNZXRob2ROYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbm5lY3RlZFRvR3JvdXAoY2FsbEJhY2s6KGdyb3VwOiBNb2RlbHMuR3JvdXApID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5odWIub24odGhpcy5jb25zdGFudHMuY29ubmVjdGVkVG9Hcm91cCwgKG1zZykgPT4gY2FsbEJhY2sobXNnWzBdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb25Hcm91cEZ1bGxlZChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmh1Yi5vbih0aGlzLmNvbnN0YW50cy5ncm91cEZ1bGxlZCwgKG1zZykgPT4gY2FsbEJhY2sobXNnWzBdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb25Vc2VyTGVmdChjYWxsQmFjazooZ3JvdXA6IE1vZGVscy5Hcm91cCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmh1Yi5vbih0aGlzLmNvbnN0YW50cy5sZWZ0R3JvdXAsIChtc2cpID0+IGNhbGxCYWNrKG1zZ1swXSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZShDb21tb24uR2V0Q29uc3RhbnRzKCkuYXBwTmFtZSkuc2VydmljZShcIlNlcnZpY2VzLkNvbm5lY3RUb0dhbWVTZXJ2aWNlXCIsIENvbm5lY3RUb0dhbWVTZXJ2aWNlKTtcclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9jb21tb24udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vaW50ZXJmYWNlcy50c1wiIC8+XHJcbm1vZHVsZSBjb250cm9sbGVycyB7XHJcbiAgICBleHBvcnQgY2xhc3MgQ29ubmVjdFRvR2FtZUNvbnRyb2xsZXIge1xyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdGlvbkh1YlNlcnZpY2U6IEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWU7XHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWVTY29wZTtcclxuICAgICAgICBwcml2YXRlIHVzZXJJZDogc3RyaW5nO1xyXG5cclxuICAgICAgICBzdGF0aWMgJGluamVjdCA9IFtcIlNlcnZpY2VzLkNvbm5lY3RUb0dhbWVTZXJ2aWNlXCIsIFwiJHNjb3BlXCJdO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb25IdWJTZXJ2aWNlOiBJbnRlcmZhY2VzLklDb25uZWN0VG9HYW1lLCAkc2NvcGU6IEludGVyZmFjZXMuSUNvbm5lY3RUb0dhbWVTY29wZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlID0gY29ubmVjdGlvbkh1YlNlcnZpY2U7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVWaWV3TW9kZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbGl6ZVZpZXdNb2RlbCgpOnZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5pc0Nvbm5lY3RpbmdUb0h1YiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ29ubmVjdGVkVG9IdWJTdWNjZXNzZnVsbHkgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlcyA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbkh1YlNlcnZpY2UuY29ubmVjdFRvSHViKCkuZG9uZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDb25uZWN0ZWRUb0h1YlN1Y2Nlc3NmdWxseSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDb25uZWN0aW5nVG9IdWIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSkuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5pc0Nvbm5lY3RlZFRvSHViU3VjY2Vzc2Z1bGx5ID0gZmFsc2U7IFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLm9uVXNlckxlZnQodGhpcy5vblVzZXJMZWZ0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmNvbm5lY3RUb0dyb3VwID0gKCkgPT4gdGhpcy5jb25uZWN0VG9Hcm91cC5hcHBseSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25Vc2VyTGVmdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGFwcGx5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ29ubmVjdGVkVG9Hcm91cCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0VG9Hcm91cCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuaXNDb25uZWN0aW5nVG9Hcm91cCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmlzQ29ubmVjdGVkVG9Hcm91cCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25IdWJTZXJ2aWNlLmNvbm5lY3RUb05ld0dyb3VwKCkuZG9uZShnID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5pc0Nvbm5lY3RlZFRvR3JvdXAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5pc0Nvbm5lY3RlZFRvR3JvdXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5pc0Nvbm5lY3RpbmdUb0dyb3VwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZShDb21tb24uR2V0Q29uc3RhbnRzKCkuYXBwTmFtZSkuY29udHJvbGxlcihcImNvbnRyb2xsZXJzLkNvbm5lY3RUb0dhbWVDb250cm9sbGVyXCIsIENvbm5lY3RUb0dhbWVDb250cm9sbGVyKTtcclxufSAiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
