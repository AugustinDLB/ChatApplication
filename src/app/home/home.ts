import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section>
      <form>
        <input type="text" placeholder="Write your message here" />
        <button class="primary" type="button">Send</button>
      </form>
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {}
