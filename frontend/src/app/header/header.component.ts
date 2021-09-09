import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-card>
      <app-page-header title="Log In"></app-page-header>
      <nav>
        <a routerLink="/" routerLinkActive="active">Login</a>
      </nav>
    
    </mat-card>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
