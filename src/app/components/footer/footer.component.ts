import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <p>
      footer works!
    </p>
  `,
  styles: `
    p {
      text-align: center;
      background-color: #333;
      color: white;
      padding: 10px;
      width: 100%;
    }
  `
})
export class FooterComponent {

}
