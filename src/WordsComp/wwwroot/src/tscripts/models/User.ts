module Models {
    export class User {
        public userId: string;
        public displayName: string;
        public isBot: boolean;
        public authInfo: Interfaces.IUserInfo;
    }
}