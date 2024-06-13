import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/" class="logo-link">
        <img
          src="./assets/images/logos/logo-mini.svg"
          class="align-middle m-2"
          alt="logo"
          width="40"
        />
        <span class="brand-name">AULSH</span>
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
