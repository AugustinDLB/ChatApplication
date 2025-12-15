export interface User {
    name:           string
    firstName:      string
    id: number
}

export interface UserList {
    [key: number]: User

    getUsersAsArray(): number[]

    getUserFullName(userId: number): string
}

export class UserListImpl implements UserList {
    [key: number]: User

    getUsersAsArray(): number[] {
        return Object.keys(this).map(Number);
    }

    constructor(inUserList: User[]) {
        for (const user of inUserList) {
            this[user.id] = user;
        }
    }

    getUserFullName(userId: number): string {
        return this[userId].firstName + " " + this[userId].name;
    }
}