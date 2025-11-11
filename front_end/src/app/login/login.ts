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
          name="loginUsername"
          placeholder="Write your username here"
          [(ngModel)]="loginUsernameEntry"
        />
      </label>
      <label>
        Password
        <input
          type="text"
          name="loginPassword"
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
          name="RegisterUsername"
          placeholder="Write your username here"
          [(ngModel)]="registerUsernameEntry"
        />
      </label>
      <label>
        Password
        <input
          type="text"
          name="RegisterPassword"
          placeholder="Write your password here"
          [(ngModel)]="registerPasswordEntry"
        />
      </label>
      <button>Submit</button>
    </form>

    @if(isEntryError){
        <div class="error">Invalid user name or password</div>
    }
    
    @if(isUserAlreadyExists){
        <div class="error">User already exists</div>
    }
  `,
  styleUrls: ["login.css"],
})
export class Login {
  loginService    = inject(LoginService);
  router          = inject(Router);
  loginUsernameEntry   = "";
  loginPasswordEntry   = "";
  registerPasswordEntry   = "";
  registerUsernameEntry   = "";


  isEntryError = false;
  isUserAlreadyExists   = false;
  async CheckUsernameEntry() {
    const isConnected = await this.loginService.login(this.loginUsernameEntry, this.loginPasswordEntry);
    if (isConnected) {
      await this.router.navigate(["home/"]);
    } else {
      this.isEntryError = true;
    }
    this.loginUsernameEntry = "";
    this.loginPasswordEntry = "";
  }

  async Register() {
      const isRegistered= await this.loginService.register(this.registerUsernameEntry,this.registerPasswordEntry);
      if(!isRegistered) {
          this.isUserAlreadyExists = true;
      }
      this.registerUsernameEntry = "";
      this.registerPasswordEntry = "";
  }
}
