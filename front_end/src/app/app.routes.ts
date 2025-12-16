import {Routes} from "@angular/router";
import {Chat} from "./chat/chat";
import {Login} from "./login/login";
import {Users} from "./users/users";
import {NewConversation} from "./new_conversation/new.conversation";
// Retours:
// - donner des noms explicite sur les chemins (home/... -> chats ou contacts)
// - utilisateur courant: pas dans l'url, un service de l'app doit connaitre qui est login (si tu partage l'url, tu partage ton url qui peut ne pas marcher)
export const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: "full" }, // Default redirection
  { path: "login", component: Login },
    {path: "home/:conversationId", component: Chat},
    {path: "create_new_conversation", component: NewConversation},
    {path: "home", component: Users}
];
