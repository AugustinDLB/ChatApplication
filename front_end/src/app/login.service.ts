import { Injectable, inject, signal} from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { User } from "./user.model"
import { firstValueFrom } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class LoginService {
    httpClient  = inject(HttpClient);

    private readonly _currentUser = signal<User>({id:-1, name: "", firstName: ""}); // The account connected on the app
    public readonly currentUser = this._currentUser.asReadonly();

    async login(name: string, password: string): Promise<boolean> {
        try {
            const data = await firstValueFrom(
                this.httpClient.post('/users/login', { name, password })
            );
            return true;
        } catch (err) {
            return false;
        }
    }
        
    async register(name: string, password: string): Promise<boolean> {
        try {
            const data = await firstValueFrom(
                this.httpClient.post('users/register', { name, password })
            );
            return true;
        } catch (err) {
            return false;
        }
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