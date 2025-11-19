import {Injectable, signal, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {LoginService} from "./login.service";

import {UserList} from "./models/user.model"
import {Conversation} from "./models/conversation.model"
import {Message} from "./models/message.model"

@Injectable({
    providedIn: "root",
})
export class ChatService {
    httpClient = inject(HttpClient);
    loginService = inject(LoginService);

    sendMessage(newMessage: string, conversationID: number) {
        // TODO : send message to server
        // this.conversationsList().addMessage(conversationID, {
        //     id: 0,
        //     sender: this.loginService.currentUserId(),
        //     content: newMessage,
        //     time: new Date()
        // });
    }

}
