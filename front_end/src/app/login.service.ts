import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {User} from "./models/user.model"
import {firstValueFrom} from 'rxjs';
import {SessionService} from "./session.service";
import {Conversation} from "./models/conversation.model";

interface LoginResponse {
    user: User;
    conversations: Conversation[];
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
            this.sessionService.conversations.set(data.conversations);

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
            this.sessionService.id.set(null);
            this.sessionService.name.set(null);
            this.sessionService.firstName.set(null);
            this.sessionService.conversations.set(null);

            return true;
        } catch (err) {
            return false;
        }

    }
}