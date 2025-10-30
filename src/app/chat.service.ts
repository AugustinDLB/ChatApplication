import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class chatService{

    userWeChatWith  = signal<string>('');   // The current user we chat with
    currentUser     = signal<string>('');   // The account connected on the app
    usersList       = signal<string[]>([
        'Augustin',
        'Clement',
        'Benedicte',
        'Philippe',
        'Manon',
        'Levan',
    ]);
}