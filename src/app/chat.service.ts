import { Injectable, signal, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { LoginService } from "./login.service";

import { User } from "./user.model"
import { Conversation } from "./conversation.model"

@Injectable({
  providedIn: "root",
})
export class ChatService {
  httpClient     = inject(HttpClient);
  loginService   = inject(LoginService);

  userWeChatWith = signal<User>({id:-1, name: "", firstName: ""}); // The current user we chat with

  private readonly conversationsList = signal<Conversation[]>([
      // 0 / 1 pour le speaker, pas trop compréhensible, un truc genre isFromMe (true/false) ou sender (user id)
    {id:0 , participants: [0, 1], name: "Test conversation", messages: [ {id:1 , sender:1, content: "Angular, sans aucun doute.", time: new Date(2002, 8, 2)}]},
  ])

  getConversationsList(): Conversation[] {
    return this.conversationsList();
  }

  getConversationByID(convID: number): Conversation | undefined {
    return this.conversationsList().find(conv => conv.id === convID);
  }

  getConversationName(convID: number): string | undefined {
    return this.getConversationByID(convID)?.name;
  }

  sendMessage(newMessage: string, conversationID: number) {
    this.conversationsList.update(convs =>
    convs.map(conv =>
      conv.id === conversationID
        ? { ...conv, messages: [...conv.messages, {id: 3, sender: this.loginService.getCurrentUserID(), content: newMessage, time: new Date(2002, 8, 2)}] }
        : conv
    )
  );
  }
}
