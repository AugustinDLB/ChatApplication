import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login'

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection par défaut
  { path: 'login', component: Login },
  { path: 'chat', component: Dashboard },
  //{ path: '**', redirectTo: '/login' } // Page non trouvée → retour au login
];
