import { Routes } from "@angular/router";
import { Chat } from "./chat/chat";
import { Login } from "./login/login";
import { Users } from "./users/users";

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" }, // Default redirection
  { path: "login", component: Login },
  { path: "home/:id/:contactName", component: Chat },
  { path: "home/:id", component: Users },
];
