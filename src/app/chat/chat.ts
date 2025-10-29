import {Component, input} from '@angular/core';

@Component({
  selector: 'app-chat',
  template: `
    <section>
      <h2> You are chatting with {{userWeChatWith()}} </h2>
      <form>
        <input type="text" placeholder="Write your message here" />
        <button class="primary" type="button">Send</button>
      </form>
    </section>
  `,
  styleUrls: ['./chat.css'],
})
export class Chat {
  userWeChatWith = input<string>();
}
