import { Message } from "./message.model"

export interface User {
    name:           string
    firstName:      string
}

export interface UserList {
    [ key: number ]: User;
}