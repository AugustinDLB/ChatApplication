import { Injectable, inject, signal} from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { User } from "./user.model"
import { firstValueFrom } from 'rxjs';
import { ChatService } from "./chat.service";
import { Conversation } from "./conversation.model";

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    chatService = inject(ChatService);
    httpClient  = inject(HttpClient);

    currentUser = signal<User>({id:-1, name: "", firstName: ""}); // The account connected on the app

    async login(name: string, password: string): Promise<boolean> {
        try {
            const data = await firstValueFrom(
                this.httpClient.post<Conversation[]>('/users/login', { name, password })
            );
            this.chatService.conversationsList.set(data);
            return true;
        } catch (err) {
            return false;
        }
    }
        
    async register(name: string, password: string): Promise<boolean> {
        try {
            const data = await firstValueFrom(
                this.httpClient.post('users/register', { name, password })
            );
            return true;
        } catch (err) {
            return false;
        }
    }

    logout() {
        this.currentUser.set({id:-1, name: "", firstName: ""});
        return false;
    }

    getCurrentUserID(): number {
        return this.currentUser().id;
    }
}