import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {LoginService} from "./login.service";
import {SessionService} from "./session.service";
import {Conversation} from "./models/conversation.model"
import {Message} from "./models/message.model"
import {firstValueFrom} from "rxjs";

interface CreateConversationResponse {
    id: number,
    members: number[],
    name: string,
    messages: Message[]
}

@Injectable({
    providedIn: "root",
})
export class ChatService {
    httpClient = inject(HttpClient);
    loginService = inject(LoginService);
    sessionService = inject(SessionService);

    sendMessage(newMessage: string, conversationID: number) {
        // TODO : send message to server
        // this.conversationsList().addMessage(conversationID, {
        //     id: 0,
        //     sender: this.loginService.currentUserId(),
        //     content: newMessage,
        //     time: new Date()
        // });
    }

    async createConversation(name: string, members: number[]): Promise<number> {
        try {
            const data = await firstValueFrom(
                this.httpClient.post<CreateConversationResponse>('/conversations/register/', {name, members})
            );
            this.sessionService.conversations()!.push(<Conversation>({
                id: data.id,
                members: data.members,
                name: data.name,
                messages: data.messages
            }));
            return data.id;
        } catch (err) {
            return -1;
        }
    }
}
