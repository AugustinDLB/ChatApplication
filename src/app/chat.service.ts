import { Injectable, signal, inject } from "@angular/core";
import { Message } from "./message.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class ChatService {
  httpClient     = inject(HttpClient);
  userWeChatWith = signal<string>(""); // The current user we chat with
  currentUser    = signal<string>(""); // The account connected on the app
  usersList      = signal<string[]>([
    "Augustin",
    "Clement",
    "Benedicte",
    "Philippe",
    "Manon",
    "Levan",
  ]);

  prevMessages   = signal<Message[]>([
      // 0 / 1 pour le speaker, pas trop compréhensible, un truc genre isFromMe (true/false) ou sender (user id)
    {id:0 , speaker:0, content: "Quel est on framework prefere ?"},
    {id:1 , speaker:1, content: "Angular, sans aucun doute."},
    {id:2 , speaker:0, content: "Ravi. \n \n \n"},
    {id:3 , speaker:1, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:4 , speaker:0, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:5 , speaker:1, content: ""},
    {id:6 , speaker:0, content: ""},
    {id:7 , speaker:1, content: "s"},
    {id:8 , speaker:0, content: "s"},
        {id:0 , speaker:0, content: "Quel est on framework prefere ?"},
    {id:1 , speaker:1, content: "Angular, sans aucun doute."},
    {id:2 , speaker:0, content: "Ravi. \n \n \n"},
    {id:3 , speaker:1, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:4 , speaker:0, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:5 , speaker:1, content: ""},
    {id:6 , speaker:0, content: ""},
    {id:7 , speaker:1, content: "s"},
    {id:8 , speaker:0, content: "s"},
        {id:0 , speaker:0, content: "Quel est on framework prefere ?"},
    {id:1 , speaker:1, content: "Angular, sans aucun doute."},
    {id:2 , speaker:0, content: "Ravi. \n \n \n"},
    {id:3 , speaker:1, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:4 , speaker:0, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:5 , speaker:1, content: ""},
    {id:6 , speaker:0, content: ""},
    {id:7 , speaker:1, content: "s"},
    {id:8 , speaker:0, content: "s"},
        {id:0 , speaker:0, content: "Quel est on framework prefere ?"},
    {id:1 , speaker:1, content: "Angular, sans aucun doute."},
    {id:2 , speaker:0, content: "Ravi. \n \n \n"},
    {id:3 , speaker:1, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:4 , speaker:0, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:5 , speaker:1, content: ""},
    {id:6 , speaker:0, content: ""},
    {id:7 , speaker:1, content: "s"},
    {id:8 , speaker:0, content: "s"},
        {id:0 , speaker:0, content: "Quel est on framework prefere ?"},
    {id:1 , speaker:1, content: "Angular, sans aucun doute."},
    {id:2 , speaker:0, content: "Ravi. \n \n \n"},
    {id:3 , speaker:1, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:4 , speaker:0, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:5 , speaker:1, content: ""},
    {id:6 , speaker:0, content: ""},
    {id:7 , speaker:1, content: "s"},
    {id:8 , speaker:0, content: "s"},
        {id:0 , speaker:0, content: "Quel est on framework prefere ?"},
    {id:1 , speaker:1, content: "Angular, sans aucun doute."},
    {id:2 , speaker:0, content: "Ravi. \n \n \n"},
    {id:3 , speaker:1, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:4 , speaker:0, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:5 , speaker:1, content: ""},
    {id:6 , speaker:0, content: ""},
    {id:7 , speaker:1, content: "s"},
    {id:8 , speaker:0, content: "s"},
        {id:0 , speaker:0, content: "Quel est on framework prefere ?"},
    {id:1 , speaker:1, content: "Angular, sans aucun doute."},
    {id:2 , speaker:0, content: "Ravi. \n \n \n"},
    {id:3 , speaker:1, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:4 , speaker:0, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:5 , speaker:1, content: ""},
    {id:6 , speaker:0, content: ""},
    {id:7 , speaker:1, content: "s"},
    {id:8 , speaker:0, content: "s"},
        {id:0 , speaker:0, content: "Quel est on framework prefere ?"},
    {id:1 , speaker:1, content: "Angular, sans aucun doute."},
    {id:2 , speaker:0, content: "Ravi. \n \n \n"},
    {id:3 , speaker:1, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:4 , speaker:0, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:5 , speaker:1, content: ""},
    {id:6 , speaker:0, content: ""},
    {id:7 , speaker:1, content: "s"},
    {id:8 , speaker:0, content: "s"},
        {id:0 , speaker:0, content: "Quel est on framework prefere ?"},
    {id:1 , speaker:1, content: "Angular, sans aucun doute."},
    {id:2 , speaker:0, content: "Ravi. \n \n \n"},
    {id:3 , speaker:1, content: "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:4 , speaker:0, content: " \n sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"},
    {id:5 , speaker:1, content: ""},
    {id:6 , speaker:0, content: ""},
    {id:7 , speaker:1, content: "s"},
    {id:8 , speaker:0, content: "s"},

  ])

    login(username: string): boolean {
      // TODO logique de login (idéalement dans un service dédié mais pas urgent pour une app comme ca)
        // 1. verifie si c'est bon
        // 2. au lieu d'avoir l'id de l'user dans l'url, tu garde l'id du user dans ce service, et tu faire une autre fonction getUser par exemple
      return true
    }

    isLoggedIn() {
        this.currentUser() != ""
    }

    getCurrentUser(): string {
      // ou une variable non modifiable
      return ""
    }

}

// TODO utiliser ca pour le currentUser plutot que juste le nom, et passer par l'id partout (id -> facile de retrouver
//  les données avec un getUserInfo(userId) dans un service)
interface User {
    // banger: ca, tous tes objects peuvent en avoir (message, chat, contact...)
    id: number

    // le reste, tout peut changer, etre dupliqué, c'est toi qui ecrit les regles après (autoriser les prenoms similaires...)
    name: String
    firstName: String
}