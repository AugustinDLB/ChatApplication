import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {User, UserListImpl} from "./models/user.model"
import {firstValueFrom} from 'rxjs';
import {SessionService} from "./session.service";
import {Conversation, ConversationImpl} from "./models/conversation.model";

interface LoginResponse {
    user: User;
    conversations: Conversation[];
    usersList: User[]
}

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    httpClient = inject(HttpClient);
    sessionService = inject(SessionService);

    async login(name: string, password: string): Promise<boolean | undefined> {
        try {
            const data = await firstValueFrom(
                this.httpClient.post<LoginResponse>('/users/login', {name, password})
            );

            // Set all variables in the session service
            this.sessionService.id.set(data.user.id);
            this.sessionService.name.set(data.user.name);
            this.sessionService.firstName.set(data.user.firstName);
            this.sessionService.conversations.set(data.conversations.map(ConversationImpl.fromDto)); // Converts from DTO (Data Object Transfer) to ConversationImpl object
            this.sessionService.usersList.set(new UserListImpl(data.usersList))

            return true;
        } catch (err) {
            return undefined;
        }
    }

    async register(name: string, password: string): Promise<boolean> {
        try {
            const data = await firstValueFrom(
                this.httpClient.post('users/register', {name, password})
            );
            return true;
        } catch (err) {
            return false;
        }
    }

    async logout(userId: number) {
        try {
            const data = await firstValueFrom(
                this.httpClient.post('users/logout', {userId})
            )

            // Reset all variables in the session service
            this.sessionService.id.set(-1);
            this.sessionService.name.set('');
            this.sessionService.firstName.set('');
            this.sessionService.conversations.set([]);
            this.sessionService.usersList.set(new UserListImpl([]))

            return true;
        } catch (err) {
            return false;
        }

    }
}