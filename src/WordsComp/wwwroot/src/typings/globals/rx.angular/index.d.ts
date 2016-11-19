// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/7de6c3dd94feaeb21f20054b9f30d5dabc5efabd/rx-angular/rx.angular.d.ts
declare namespace Rx {

    interface IObservable<T> {
        safeApply($scope: ng.IScope, callback: (data: T) => void): Rx.Observable<T>;
    }

    export interface ScopeScheduler extends IScheduler {
        constructor(scope: ng.IScope) : ScopeScheduler;
    }

    export interface ScopeSchedulerStatic extends SchedulerStatic {
        new ($scope: angular.IScope): ScopeScheduler;
    }

    export var ScopeScheduler: ScopeSchedulerStatic;
}

declare namespace rx.angular {

    export interface IRxScope extends ng.IScope {
        $toObservable(property: string): Rx.Observable<any>;
    }
}