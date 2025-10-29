import { Component, input } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <header> Chat Application </header>
    <h1> Login </h1>
    <label> Username
      <input type="text" placeholder="Write your username here" [(ngModel)]="usernameEntry" />
    </label>
      <button type="button" (click)="CheckUsernameEntry()"> Submit </button>  

  `,
  styles: ``
})
export class Login {
  usernameEntry = '';
  userList =  input<string[]>();
  CheckUsernameEntry()
  {
    
  }
}
