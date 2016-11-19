/// <reference path="../interfaces.ts" />
module Services {
    export class CookieService implements Interfaces.ICookieService {
        setCookie(cname: string, cvalue: any, exdays?: number): void {
            if (!exdays) {
                exdays = 10 * 367; // 10 years cookies
            }

            let d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        getCookie(cname: string): string {
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
    }
    angular.module(Common.GetConstants().appName).service("Services.CookieService", CookieService);
}