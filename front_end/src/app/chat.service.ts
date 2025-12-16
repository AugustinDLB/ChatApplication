import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {LoginService} from "./login.service";
import {SessionService} from "./session.service";
import {ConversationImpl} from "./models/conversation.model"
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

    async sendMessage(content: string, conversationId: number) {
        try {
            const sender = this.sessionService.id();
            const data = await firstValueFrom(
                this.httpClient.post<Message>('/conversations/send/', {
                    conversationId: conversationId,
                    sender: sender,
                    content: content
                })
            )
            const convIndex = this.sessionService.conversations().findIndex(x => x.id === conversationId);
            this.sessionService.conversations()[convIndex].addMessage({
                id: data.id,
                sender: data.sender,
                content: data.content,
                time: data.time
            });
            return true;
        } catch (err) {
            return false;
        }
    }

    async createConversation(name: string, members: number[]): Promise<number> {
        try {
            const data = await firstValueFrom(
                this.httpClient.post<CreateConversationResponse>('/conversations/register/', {name, members})
            );
            this.sessionService.conversations()!.push(<ConversationImpl>({
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
