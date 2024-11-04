import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <p>Developed by Jack Arana R.</p>
  `,
  styles: `
    p {
      font-size: .6em;
      color: #7a7a7a;
      width: 100%;
    }
  `
})
export class FooterComponent {

}
