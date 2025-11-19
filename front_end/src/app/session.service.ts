import {Injectable, signal} from "@angular/core";
import {UserList} from "./models/user.model";
import {Message} from "./models/message.model";
import {Conversation} from "./models/conversation.model";

@Injectable({
    providedIn: 'root',
})
export class SessionService {

    id = signal<number | null>(null);
    name = signal<string | null>(null);
    firstName = signal<string | null>(null);
    conversations = signal<Conversation[] | null>([{id: 0, members: [0, 1], name: "Conversation 1", messages: []},
        {id: 1, members: [0, 1], name: "Conversation 2", messages: []}])

    //conversationsByID = new Map(this.conversations.map(x => [x.id, x]));

    usersList = signal<UserList>({
        0: {
            id: 1,
            name: "User1",
            firstName: "John"
        },
        1: {
            id: 2,
            name: "User2",
            firstName: "Jane"
        }
    });

    getConversationMessages(convId: number): Message[] {
        return this.conversations()!.find(x => x.id === convId)!.messages;
    }

    getConversationName(convId: number): string {
        return this.conversations()!.find(x => x.id === convId)!.name;
    }
}