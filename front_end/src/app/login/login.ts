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
          [(ngModel)]="loginUsernameEntry"
        />
      </label>
      <label>
        Password
        <input
          type="text"
          name="password"
          placeholder="Write your password here"
          [(ngModel)]="loginPasswordEntry"
        />
      </label>
      <button>Submit</button>
    </form>

    <h1>Register</h1>
    <form (ngSubmit)="Register()">
      <label>
        Username
        <input
          type="text"
          name="username"
          placeholder="Write your username here"
          [(ngModel)]="registerUsernameEntry"
        />
      </label>
      <label>
        Password
        <input
          type="text"
          name="password"
          placeholder="Write your password here"
          [(ngModel)]="registerPasswordEntry"
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
  loginUsernameEntry   = "";
  loginPasswordEntry   = "";
  registerPasswordEntry   = "";
  registerUsernameEntry   = "";


  isEntryError = false;

  async CheckUsernameEntry() {
    const isConnected = await this.loginService.login(this.loginUsernameEntry, this.loginPasswordEntry);
    if (isConnected) {
      this.router.navigate(["home/"]);
    } else {
      this.isEntryError = true;
    }
    this.loginUsernameEntry = "";
    this.loginPasswordEntry = "";
  }

  Register() {
    this.loginService.register(this.registerUsernameEntry,this.registerPasswordEntry);
  }
}
