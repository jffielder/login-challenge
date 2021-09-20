import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-card>
      <app-page-header title="Login Application"></app-page-header>
      <nav>
        <a mat-flat-button routerLink="/"         routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Login</a>
        <a mat-flat-button routerLink="/register" routerLinkActive="active">Register</a>
        <a mat-flat-button routerLink="/members"  routerLinkActive="active">Secure Page</a>      
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

