import { Message } from "./message.model"

export interface Conversation {
    id:             number;

    participants:   number[]; // list of user IDs
    name:           string;
    messages:       Message[]; // list of messages
} 