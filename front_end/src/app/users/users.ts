import {Component, inject} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../login.service";
import {SessionService} from "../session.service";

@Component({
    selector: "app-users",
    imports: [],
    template: `
        <header>
            Chat Application
            <span class="header-actions">
               <button class="header-button" (click)="createNewConversation()">New Conversation</button>
               <button class="header-button" (click)="requestLogout()">Log Out</button>
            </span>
        </header>
        <span class="page-title"> Conversations list </span>

        @for (conversation of this.sessionService.conversations(); track conversation.id) {
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

    createNewConversation() {
        this.router.navigate(['create_new_conversation/'])
    }

    requestLogout() {
        this.router.navigate(['login/']);
        this.loginService.logout( this.sessionService.id()!);
    }
}
