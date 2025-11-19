import { Component, inject } from "@angular/core";
import { ChatService } from "../chat.service";
import { Router } from "@angular/router";
import { LoginService } from "../login.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
@Component({
    selector: "app-users",
    imports: [
        FormsModule,
        ReactiveFormsModule,
    ],
    template: `
    <header>
      Chat Application
      <button class="logOutButton" (click)="goBackToMenu()">Log Out</button>
    </header>
    <span class="title"> Add a new conversation </span>

    <h1>Chose name and members</h1>
    <form (ngSubmit)="CheckUsernameEntry()">
        <label>
            Conversation name
            <input
                    type="text"
                    name="Conversation Name"
                    placeholder="Conversation name"
                    [(ngModel)]="ConversationNameEntry"
            />
        </label>
        <label>
            Add member
            <input
                    type="text"
                    name="ConvMember"
                    placeholder="Write people you want to chat with"
                    [(ngModel)]="MembersEntry"
            />
        </label>
        <button>Submit</button>
    </form>
    
  `,
    styleUrls: ["./users.css"],
})
export class Users {
    chatService = inject(ChatService);
    loginService = inject(LoginService);
    router      = inject(Router);

    ConversationNameEntry = "";
    MemberEntry = ""
    MembersList = []

    goBackToMenu(){
        this.router.navigate(["home"]);
    }
}
