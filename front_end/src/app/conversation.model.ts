import {Message, MessageList} from "./message.model"

export class Conversation {
    constructor(
        private _members: number[], // list of user IDs
        private _name: string,
        private _messages: MessageList // list of messages
    ) {
    }

    get members() {
        return this._members;
    }

    set members(value: number[]) {
        this._members = value;
    }

    get name() {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get messages() {
        return this._messages;
    }

    set messages(value: MessageList) {
        this._messages = value;
    }

    set addMessage(id: number, message: Message) {
        this._messages[id] = message
    }

    get messagesArray(): Message[] {
        return Object.values(this._messages);
    }
}

export class ConversationList {
    [key: number]: Conversation;

    constructor() {
    }

    get(id: number) {
        return this[id];
    }

    getMessages(id: number) {
        return this[id].messages;
    }

    set(id: number, conversation: Conversation) {
        this[id] = conversation;
    }

    addMessage(id: number, message: Message) {
        this[id].messages =;
    }

}