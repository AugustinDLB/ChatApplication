import {Message} from "./message.model";

export interface Conversation {
    id: number,
    members: number[],
    name: string,
    messages: Message[]
}

export class ConversationImpl implements Conversation {
    id: number;
    members: number[];
    name: string;
    messages: Message[];

    constructor(public inId: number, public inMembers: number[], public inName: string, public inMessages: Message[]) {
        this.id = inId;
        this.members = inMembers;
        this.name = inName;
        this.messages = inMessages;
    }

    addMessage(message: Message) {
        this.messages.push(message);
    }

    static fromDto(dto: Conversation): ConversationImpl {
        return new ConversationImpl(dto.id, dto.members, dto.name, dto.messages ?? []);
    }
}