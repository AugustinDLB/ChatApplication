import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {User, UserListImpl} from "./models/user.model"
import {firstValueFrom} from 'rxjs';
import {SessionService} from "./session.service";
import {Conversation} from "./models/conversation.model";

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
            this.sessionService.conversations.set(data.conversations);
            this.sessionService.usersList.set(new UserListImpl(data.usersList))

            return true;
        } catch (err) {
            return undefined;
            // this.sessionService.id.set(1);
            // this.sessionService.name.set("admin");
            // this.sessionService.firstName.set("admin");
            // this.sessionService.conversations.set([
            //     {
            //         id: 0,
            //         members: [0, 1],
            //         name: "Conversation 1",
            //         messages: [
            //             { id: 0, sender: 0, content: "Salut !", time: Date.now() - 60_000 },
            //             { id: 1, sender: 1, content: "Hello, ça va ?", time: Date.now() - 45_000 },
            //             { id: 2, sender: 0, content: "Oui nickel et toi ?", time: Date.now() - 30_000 },
            //         ],
            //     },
            //     {
            //         id: 1,
            //         members: [0, 2],
            //         name: "Conversation 2",
            //         messages: [
            //             { id: 10, sender: 2, content: "Tu es dispo demain ?", time: Date.now() - 120_000 },
            //             { id: 11, sender: 0, content: "Oui, vers 14h.", time: Date.now() - 90_000 },
            //         ],
            //     },
            // ]);
            // this.sessionService.usersList.set(
            //     new UserListImpl([
            //         { id: 0, name: "admin", firstName: "Admin" },
            //         { id: 1, name: "alice", firstName: "Alice" },
            //         { id: 2, name: "bob", firstName: "Bob" },
            //     ])
            // );
            // return true;
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