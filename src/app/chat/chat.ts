import {Component, input, OnInit, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  template: `
      <header>
        Chat Application
        <button class = returnButton (click)="gobackToMenu()"> Go back to menu </button>
      </header>

      <h2> You are chatting with {{userWeChatWith}} </h2>
      <form (ngSubmit)="sendMessage()">
        <input type="text" name="messageToSend" [(ngModel)]="messageToSend" placeholder="Write your message here" required />
        <button>Send</button>
      </form>
  `,
  styleUrls: ['./chat.css'],
  imports: [FormsModule],
})
export class Chat implements OnInit {
  router          = inject(Router);
  userWeChatWith  = "";
  messageToSend   = "";
  currentUser     = "";

  sendMessage(){
    this.messageToSend = '';
  }

  gobackToMenu(){
    this.router.navigate(["home/" + this.currentUser]);
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Is it necessary to subscribe here ? The value is not susceptible to change while this route is active
    this.route.params.subscribe( params => {
      this.currentUser    = params['id'];
      this.userWeChatWith = params['contactName'];
    });
  }
}
