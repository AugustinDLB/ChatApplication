import {Component, inject, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ChatService} from "../chat.service";
import {SessionService} from "../session.service";

@Component({
    selector: "app-chat",
    template: `
        <header>
            Chat Application
            <button class="returnButton" (click)="gobackToMenu()">
                Go back to menu
            </button>
        </header>
            
        <span class="page-title">{{ this.sessionService.getConversationName(conversationId) }}</span>
        
        <section class="chatDashboard">

            <article class="chatContent">

                @for (message of sessionService.getConversationMessages(conversationId); track message.id) {
                    @if (message.sender == sessionService.id()!) {
                        <div class="IAmSpeaking">{{ message.content }}</div>
                    } @else {
                        <div class="OthersAreSpeaking">{{ message.content }}</div>
                    }
                }
            </article>

            <form (ngSubmit)="sendMessage()">
                <input
                        type="text"
                        name="messageToSendEntry"
                        placeholder="Write your message here"
                        [(ngModel)]="messageToSend"
                />
                <button>Send</button>
               
            </form>
        </section>
    `,
    styleUrls: ["./chat.css"],
    imports: [FormsModule],
})
export class Chat implements OnInit {
    chatService = inject(ChatService);
    sessionService = inject(SessionService);
    router = inject(Router);
    conversationId = -1;
    messageToSend = "";

    async sendMessage() {
        await this.chatService.sendMessage(this.messageToSend, this.conversationId);
        this.messageToSend = "";
    }

    gobackToMenu() {
        this.router.navigate(["home"]);
    }

    constructor(private readonly route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.conversationId = Number(params["conversationId"]);
        });
    }
}
