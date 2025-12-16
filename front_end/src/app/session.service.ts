import {Injectable, signal} from "@angular/core";
import {UserList, UserListImpl} from "./models/user.model";
import {Message} from "./models/message.model";
import {ConversationImpl} from "./models/conversation.model";

@Injectable({
    providedIn: 'root',
})
export class SessionService {

    id = signal<number>(-1);
    name = signal<string>('');
    firstName = signal<string>('');
    usersList = signal<UserList>(new UserListImpl([]))
    conversations = signal<ConversationImpl[]>([]);

    //conversationsByID = new Map(this.conversations.map(x => [x.id, x]));

    getConversationMessages(convId: number): Message[] {
        return this.conversations().find(x => x.id === convId)!.messages;
    }

    getConversationName(convId: number): string {
        return this.conversations().find(x => x.id === convId)!.name;
    }

    getCurrentUserFullName() {
        return this.name() + " " + this.firstName();
    }
}