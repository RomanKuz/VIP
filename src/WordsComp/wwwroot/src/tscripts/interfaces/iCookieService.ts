module Interfaces {
    export interface ICookieService {
        setCookie(cname: string, cvalue: any, exdays?: number): void;

        getCookie(cname: string): string;
    }
}