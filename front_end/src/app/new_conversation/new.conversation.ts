import {Component, inject} from "@angular/core";
import {ChatService} from "../chat.service";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SessionService} from "../session.service";

@Component({
    selector: "app-users",
    imports: [
        FormsModule,
        ReactiveFormsModule,
    ],
    template: `
        <header>
            Chat Application
            <button class="header-button" (click)="goBackToMenu()">Go back to menu</button>
        </header>
        <span class="page-title"> Create a new conversation by choosing name and members </span>

        <form (ngSubmit)="CreateConversation()">
            <label>
                Conversation name
                <input
                        type="text"
                        name="Conversation Name"
                        [(ngModel)]="conversationNameEntry"
                />
            </label>
            <label>
                Search for a member
                <input
                        type="text"
                        name="ConvMember"
                        [(ngModel)]="memberEntry"
                />
            </label>

            <ol>
                @for (userId of sessionService.usersList()!.getUsersAsArray()!; track userId) {
                    @if (userId != sessionService.id() && !memberList.includes(userId)) {
                        @if (sessionService.usersList()[userId].name.toLocaleLowerCase().includes(memberEntry.toLocaleLowerCase())) {
                            <li>
                                {{ sessionService.usersList().getUserFullName(userId) }}
                                <button type="button" (click)="addMemberToList(userId)"> Add</button>
                            </li>
                        }
                    }
                }
            </ol>

            <p> Members of the conversation : {{ getMemberNames(memberList) }} </p>
            <button> Create conversation</button>
        </form>

    `,
    styleUrls: ["./new.conversation.css"],
})
export class NewConversation {
    router = inject(Router)
    sessionService = inject(SessionService)
    chatService = inject(ChatService)
    conversationNameEntry = "";
    memberEntry = ""
    memberList: number[] = []

    goBackToMenu() {
        this.router.navigate(["home"]);
    }

    async CreateConversation() {
        this.addMemberToList(this.sessionService.id()) // Add the current user to the list of members
        const conversationId = await this.chatService.createConversation(this.conversationNameEntry, this.memberList);
        if (conversationId >= 0) {
            await this.router.navigate(["home/" + conversationId]);
        }
        this.memberList = []
    }

    addMemberToList(userId: number) {
        this.memberList.push(userId)
        this.memberEntry = ""
    }

    getMemberNames(memberIds: number[]): string[] {
        return memberIds
            .map(id => this.sessionService.usersList()[id].name)
    }
}
