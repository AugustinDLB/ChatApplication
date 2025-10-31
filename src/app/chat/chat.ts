import { Component, input, OnInit, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { chatService } from "../chat.service";
import { Message } from "../message.model";

@Component({
  selector: "app-chat",
  template: `
    <header>
      Chat Application
      <button class="returnButton" (click)="gobackToMenu()">
        Go back to menu
      </button>
    </header>
    <h2>You are chatting with {{ userWeChatWith }}</h2>

    <section class = "chatDashboard">

      <article class="chatContent">
      @for(message of chatService.prevMessages(); track message.id)
      {
        @if(message.speaker==0)
        {
          <div class = "user0Speaking"> {{message.content}} </div>
        } 
        @else 
        {
          <div class = "user1Speaking"> {{message.content}} </div>
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
  imports: [FormsModule],
})
export class Chat implements OnInit {
  chatService     = inject(chatService);
  router          = inject(Router);
  userWeChatWith  = "";
  messageToSend   = "";
  currentUser     = "";


  sendMessage() {
    this.messageToSend = "";
  }

  gobackToMenu() {
    this.router.navigate(["home/" + this.currentUser]);
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Is it necessary to subscribe here ? The value is not susceptible to change while this route is active
    this.route.params.subscribe((params) => {
      this.currentUser    = params["id"];
      this.userWeChatWith = params["contactName"];
    });
  }
}
