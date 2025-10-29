import {Component}  from '@angular/core';
import {Chat}       from '../chat/chat';
import {Users}      from '../users/users'

@Component({
  selector: 'app-dashboard',
  imports: [Chat, Users],
  template: `
    <main>  

      <header>Chat Application</header>

      <section class="content">
         <!-- Place 2 main blocs : user list and conversation content with the user selected -->
        <app-users [userList]        = "users"
                   [currentUser]     = "currentUser"         
                   (notifyChatChange)= "onChatChange($event)" />   
        <app-chat  [userWeChatWith]  = "userWeChatWith" />    
      </section>

    </main>
  `,
  styleUrls: ['./dashboard.css'],
})

export class Dashboard {

  userWeChatWith  = ""; // The current user we chat with
  currentUser     = "Augustin"; // The account connected on the app
  title           = 'Homes';
  users           = <string[]>([
        'Augustin',
        'Clement',
        'Benedicte',
        'Philippe',
        'Manon',
        'Levan',
  ]);

  onChatChange(name : string)
  {
    this.userWeChatWith = name;
  }
}
