import { Injectable, inject, signal} from "@angular/core";
import { HttpClient } from "@angular/common/http"

import { User } from "./user.model"

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    httpClient  = inject(HttpClient);

    private readonly _currentUser = signal<User>({id:-1, name: "", firstName: ""}); // The account connected on the app
    public readonly currentUser = this._currentUser.asReadonly();

    login(name: string, password: string): boolean {
        this._currentUser.set({id:1, name: "Augustin", firstName: "DLB"});
        return true;
    }

    logout() {
        this._currentUser.set({id:-1, name: "", firstName: ""});
        return false;
    }

    getCurrentUser(): User {
        return this.currentUser();
    }

    getCurrentUserID(): number {
        return this.currentUser().id;
    }
}