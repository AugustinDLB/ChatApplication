import { Routes } from "@angular/router";
import { Chat } from "./chat/chat";
import { Login } from "./login/login";
import { Users } from "./users/users";

// Retours:
// - donner des noms explicite sur les chemins (home/... -> chats ou contacts)
// - utilisateur courant: pas dans l'url, un service de l'app doit connaitre qui est login (si tu partage l'url, tu partage ton url qui peut ne pas marcher)
export const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: "full" }, // Default redirection
  { path: "login", component: Login },
  { path: "home/:conversationID", component: Chat },
  { path: "home", component: Users },
];
