import { Component, OnInit, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ChatService } from "../chat.service";
import { LoginService } from "../login.service"
import {KeyValuePipe} from "@angular/common";

@Component({
  selector: "app-chat",
  template: `
    <header>
      Chat Application
      <button class="returnButton" (click)="gobackToMenu()">
        Go back to menu
      </button>
    </header>
    <h2>You are chatting with {{ this.chatService.getConversationName(conversationID) }}</h2>

    <section class = "chatDashboard">

      <article class="chatContent">

      @for (message of chatService.getMessagesOfConv(conversationID); track message.id) {
          @if (message.sender == loginService.getCurrentUserID()) {
              <div class="IAmSpeaking">{{ message.content }}</div>
          } @else {
              <div class="OthersAreSpeaking">{{ message.content }}</div>
          }
      }
      </article>
      
      <form (ngSubmit)="sendMessage()">
        <input
          type        ="text"
          name        ="messageToSend"
          [(ngModel)] ="messageToSend"
          placeholder ="Write your message here"
          required
        />
        <button>Send</button>
      </form>
    </section>
  `,
  styleUrls: ["./chat.css"],
    imports: [FormsModule, KeyValuePipe],
})
export class Chat implements OnInit {
  chatService     = inject(ChatService);
  loginService    = inject(LoginService);
  router          = inject(Router);
  conversationID  = 0;
  messageToSend   = "";

  sendMessage() {
    this.chatService.sendMessage(this.messageToSend, this.conversationID);
    this.messageToSend = "";
  }

  gobackToMenu() {
    this.router.navigate(["home"]);
  }

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.conversationID = Number(params["conversationID"]);
    });
  }
}
