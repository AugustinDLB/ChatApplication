import {Component, inject} from "@angular/core";
import {ChatService} from "../chat.service";
import {Router} from "@angular/router";
import {LoginService} from "../login.service";
import {SessionService} from "../session.service";

@Component({
    selector: "app-users",
    imports: [],
    template: `
        <header>
            Chat Application
            <button class="logOutButton" (click)="logout()">Log Out</button>
        </header>
        <span class="title"> Conversations list </span>

        @for (conversation of this.sessionService.conversations()!; track conversation.id) {
            <div>
                <button class="setUserToTalkButton" (click)="selectConversation(conversation.id)">
                    {{ conversation.name }}
                </button>
            </div>
        }
    `,
    styleUrls: ["./users.css"],
})
export class Users {
    loginService = inject(LoginService);
    router = inject(Router);
    sessionService = inject(SessionService);

    selectConversation(conversationID: number) {
        // Go to the chat page with the selected user
        this.router.navigate(["home/" + conversationID]);
    }

    logout() {
        this.router.navigate(['login/']);
        this.loginService.logout( this.sessionService.id()!);
    }
}
