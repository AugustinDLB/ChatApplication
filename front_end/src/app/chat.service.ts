import {Injectable, signal, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {LoginService} from "./login.service";

import {User, UserList} from "./user.model"
import {Conversation, ConversationList} from "./conversation.model"
import {Message, MessageList} from "./message.model"

@Injectable({
    providedIn: "root",
})
export class ChatService {
    httpClient = inject(HttpClient);
    loginService = inject(LoginService);

    userWeChatWith = signal<User>({name: "", firstName: ""}); // The current user we chat with

    conversationsList = signal<ConversationList>(new ConversationList());

    constructor() {
        this.conversationsList().set(0, new Conversation([0, 1], "Conversation 1", {}));
        this.conversationsList().set(1, new Conversation([0, 1], "Conversation 2", {}));
    }

    usersList = signal<UserList>({
        0: {
            name: "User1",
            firstName: "John"
        },
        1: {
            name: "User2",
            firstName: "Jane"
        }
    });

    sendMessage(newMessage: string, conversationID: number) {
        // TODO : send message to server
        this.conversationsList().addMessage(conversationID, {
            id: 0,
            sender: this.loginService.getCurrentUserID(),
            content: newMessage,
            time: new Date()
        });
    }

    getMessagesOfConv(conversationID: number): Message[] {
        return this.conversationsList()[conversationID].messagesArray;
    }

    get convArray(): Conversation[] {
        return Object.values(this.conversationsList());
    }
    addConversation(id: number, name: string, members: number[]) {
        this.conversationsList().set(id, new Conversation(members, name, {}));
    }

}
