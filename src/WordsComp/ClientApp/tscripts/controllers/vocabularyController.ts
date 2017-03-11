/// <reference path="../common.ts" />
/// <reference path="../interfaces.ts" />
module controllers {
    export class VocabularyController {
        private $http: ng.IHttpService;
        private $scope: Interfaces.IVocabularyScope;
        private vocabulary: Interfaces.IVocabularyPages;

        static $inject = ["$http", "$scope", "Services.VocabularyPagesFactory"];
        constructor($http: ng.IHttpService,
                    $scope: Interfaces.IVocabularyScope,
                    vocabulary: Interfaces.IVocabularyPages) {
            this.$http = $http;
            this.$scope = $scope;
            this.vocabulary = vocabulary;
            this.initializeViewModel();
        }

        private initializeViewModel():void {
            this.$scope.vocabulary = this.vocabulary;
            this.vocabulary.clearState();
        }
    }

    angular.module(Common.GetConstants().appName).controller("controllers.VocabularyController", VocabularyController);
} 