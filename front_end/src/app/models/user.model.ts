import { Message } from "./message.model"
import {Conversation} from "./conversation.model";

export interface User {
    id:             number
    name:           string
    firstName:      string
}

export interface UserList {
    [ key: number ]: User;
}