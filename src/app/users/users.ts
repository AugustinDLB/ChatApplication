import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [],
  template: `
    <section class='users'>
      <span class='title'>
        Users list
      </span>
      @for (user of userList(); track user)
      {
        @if (user != currentUser())
        {
          <div>
          <button type='button' (click)="changeUserWeChatWith(user)"> {{user}}</button>
          </div>
        }
      }
    </section>
  `,
  styleUrls: ['./users.css']
})
export class Users{
  userWeChatWith            = "";
  // Option 1 : mettre en input ET en output de ce composant la variable userWeChatWith
  // Option 2 : mettre uniquement en output et garder l ecriture precedente
  // Que faire ?

  currentUser               = input <string>();
  userList                  = input <string[]>();
  readonly notifyChatChange = output<string>();

  changeUserWeChatWith(user: string)
  {
    // Cette optimisation vaut-elle le coup ? --> Signal envoye uniquement si ca change de conversation
    if(user != this.userWeChatWith)
    {
      this.userWeChatWith = user;
      this.notifyChatChange.emit(this.userWeChatWith);
    }
  }
}
