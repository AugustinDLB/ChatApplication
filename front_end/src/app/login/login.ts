import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChatService } from "../chat.service";
import { Router } from "@angular/router";
import { LoginService } from "../login.service";

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
  loginService    = inject(LoginService);
  router          = inject(Router);
  usernameEntry   = "";
  passwordEntry   = "";

  isEntryError = false;

  CheckUsernameEntry() {
    if (this.loginService.login(this.usernameEntry, this.passwordEntry)) {
      this.router.navigate(["home/"]);
    } else {
      this.isEntryError = true;
    }
    this.usernameEntry = "";
  }
}
