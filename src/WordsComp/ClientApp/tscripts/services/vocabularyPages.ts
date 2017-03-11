/// <reference path="../interfaces.ts" />
module Services {
    export class VocabularyPagesFactory implements Interfaces.IVocabularyPages {
        private $http: ng.IHttpService;
        private left: number;
        private cachedItems: Array<Models.VocabularyWord>;
        private itemsPerPage: number;
        private cachedItemsTake: number;  
        private $log: ng.ILogService;
        private stateHandler: Interfaces.IStateHandler;

        static $inject = ["$http", "$log", "Services.StateHandlerService"];
        constructor($http: ng.IHttpService, 
                    $log: ng.ILogService,
                    stateHandler: Interfaces.IStateHandler) 
                    {
                        this.$http = $http;
                        this.clearState();
                        this.itemsPerPage = 15;
                        this.cachedItemsTake = 100;
                        this.$log = $log;
                        this.stateHandler = stateHandler;
                    }
        
        public items: Array<Models.VocabularyWord>;  

        public isBusy: boolean;

        public getNext():void {
            if (this.populateItemsFromCache()) {
                return;
            }

            if (this.left === 0) {
                return;
            }

            this.isBusy = true;
            this.stateHandler.handleVocabularyWordsLoading(
                this.$http.get('userVocabulary/vocabulary', {
                    params: {
                        take: this.cachedItemsTake, 
                        skip: this.cachedItems.length
                    }
                })
                .then(value => {
                    let data = value.data as Models.Vocabulary;
                    this.left = data.left;
                    let newItems = data.words;
                    newItems.forEach(element => {
                        this.cachedItems.push(element);
                    });

                    this.populateItemsFromCache();
                    this.isBusy = false;
                }, error => {
                    this.$log.error(error);
                    this.isBusy = false;
                }));
        }      

        public clearState(): void {
            this.items = [];
            this.cachedItems = [];
            this.left = null;
            this.isBusy = false;
        }

        private populateItemsFromCache(): boolean {
            if (this.cachedItems.length > this.items.length) {
                var newItems = this.cachedItems.slice(this.items.length, this.items.length + this.itemsPerPage);
                newItems.forEach(element => {
                    this.items.push(element);
                });

                if (newItems.length === this.itemsPerPage) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    angular.module(Common.GetConstants().appName).service("Services.VocabularyPagesFactory", VocabularyPagesFactory);
}