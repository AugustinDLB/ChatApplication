import { Component, OnInit, inject } from '@angular/core';
import { chatService } from '../chat.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [],
  template: `
      <header>
        Chat Application
        <button class = logOutButton (click)="logOut()"> Log Out </button>
      </header>
      <span class='title'>
        Users list
      </span>

      @for (user of chatService.usersList(); track user)
      {
        @if (user != currentUser)
        {
          <div>
          <button class = setUserToTalkButton (click)="selectUserToChatWith(user)"> {{user}}</button>
          </div>
        }
      }
  `,
  styleUrls: ['./users.css']
})
export class Users implements OnInit {
  chatService = inject(chatService);
  router      = inject(Router);
  currentUser = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Is it necessary to subscribe here ? The value is not susceptible to change while this route is active
    this.route.params.subscribe( params => {
      this.currentUser = params['id'];
    });
  }

  logOut(){
    this.router.navigate(['/login']);
  }
  selectUserToChatWith(selectedUser: string)
  {
    // Go to the chat page with the selected user
    this.router.navigate(['home/' + this.currentUser + '/' + selectedUser]); 
  }
}
