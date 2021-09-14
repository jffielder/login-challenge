import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-card>
      <app-page-header title="Application"></app-page-header>
      <nav>
        <a mat-flat-button routerLink="/" routerLinkActive="active">Login</a>
        <a mat-flat-button routerLink="/register" routerLinkActive="active">Register</a>
        <a mat-flat-button routerLink="/members" routerLinkActive="active">Secure Page</a>
        <a mat-flat-button (click)="logout()">Logout</a>
      
      </nav>
    
    </mat-card>
  `,
  styles: [
    'nav {  }'
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private _loginService: LoginService, private _tokenService: TokenStorageService) { }

  ngOnInit(): void {
  }

  logout() {
    console.log("log out");

    this._loginService.logoff(this._tokenService.getRefreshToken);
    this._tokenService.signOut();
  }

}

