import { Component, input, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChatService } from "../chat.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [FormsModule],
  template: `
    <header>Chat Application</header>
    <h1>Login</h1>
    <form (ngSubmit)="CheckUsernameEntry()">
      <label>
        Username
        <input
          type="text"
          name="username"
          placeholder="Write your username here"
          [(ngModel)]="usernameEntry"
        />
      </label>
      <button>Submit</button>
    </form>

    @if(isEntryError){
    <div class="error">User non existing</div>
    }
  `,
  styleUrls: ["login.css"],
})
export class Login {
  chatService     = inject(ChatService);
  router          = inject(Router);
  usernameEntry   = "";
  // unused code
  userList        = input<string[]>();

  isEntryError = false;

  CheckUsernameEntry() {
      // 1. chat service: pas pour login
      // 2. intention de `usersList().includes(this.usernameEntry)`, c'est login(username) -> true/false
      //    -> cette login doit être faire dans un service, la page ne doit jamais savoir plus que "est ce que ce login me login"
      // avant: if (this.chatService.usersList().includes(this.usernameEntry)) {
      // apres
      if (this.chatService.login(this.usernameEntry)) {
      this.router.navigate(["home/" + this.usernameEntry]);
    } else {
      this.isEntryError = true;
    }
    this.usernameEntry = "";
  }
}
