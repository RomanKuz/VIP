/// <reference path="./User.ts" />
module Models {
    export class Group {
        public groupId: string;

        public usersList: Array<Models.User>;

        public isFriendsRoom: boolean;
    }
}