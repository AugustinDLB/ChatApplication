import { Component, input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { chatService } from '../chat.service';
import { Router }  from '@angular/router'


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <header> Chat Application </header>
    <h1> Login </h1>
    <form (ngSubmit)="CheckUsernameEntry()">
      <label> 
        Username
        <input type="text" name="username" placeholder="Write your username here" [(ngModel)]="usernameEntry" />
      </label>
      <button > Submit </button>  
    </form>
      
    @if(isEntryError){
      <div class='error'> User non existing </div>
    }
  `,
  styleUrls: ['login.css']
})
export class Login {
  chatService   = inject(chatService);
  router        = inject(Router);
  usernameEntry = '';
  userList      = input<string[]>();

  isEntryError = false;

  CheckUsernameEntry()
  {
    if(this.chatService.usersList().includes(this.usernameEntry))
    {
      this.router.navigate(['home/' + this.usernameEntry])
    }
    else
    {
      this.isEntryError = true;
    }
    this.usernameEntry = "";
  }
}
