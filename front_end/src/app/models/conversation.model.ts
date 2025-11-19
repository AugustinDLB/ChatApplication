import {Message} from "./message.model"

export interface Conversation {
    id: number,
    members: number[],
    name: string,
    messages: Message[]
}