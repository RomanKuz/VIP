// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/c17b1b78b886e84afe27e1b65fe5bf901da5bbe7/jwt-decode/index.d.ts
declare module 'jwt-decode' {
// Type definitions for jwt-decode v1.4.0
// Project: https://github.com/auth0/jwt-decode
// Definitions by: Giedrius Grabauskas <https://github.com/QuatroDevOfficial/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


namespace JwtDecode {
    interface JwtDecodeStatic {
        (token: string): any;
    }
}

var jwtDecode: JwtDecode.JwtDecodeStatic;
export = jwtDecode;
export as namespace jwt_decode;
}