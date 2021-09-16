import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-members',
  template: `
    <mat-card>
      <mat-card-title>Secure Page</mat-card-title>
      <a mat-flat-button color="primary" (click)="logout()">Logout</a>
    </mat-card>
    <mat-card>  
    
    <h2>Sever Data</h2>
    <div *ngFor="let item of data | keyvalue">
      <h3>{{item.value | json}}</h3>
    </div>
    </mat-card>
  `,
  styles: [ 
    ' mat-card-title {}',
    ' mat-card { padding:40px; margin: 2px; text-align: center }'
  ]
})
export class MembersComponent implements OnInit {
  
  _url = 'http://localhost:3000/api/'
  data = {}

  constructor(private _tokenService: TokenStorageService,
              private _loginService: LoginService,
              private _router: Router,
              private _http: HttpClient) { }

  ngOnInit(): void {
    
    // gets secure info from server
    
    // attach 'authorization token' header 
    const token = this._tokenService.getToken()
    const headers = new HttpHeaders().set('Authorization', token || "") // { headers }

    // try to check/refresh token before sending token in header
    if (!this._loginService.isLoggedIn() ) {
      this._router.navigate(['/']);
    }

    // get secure data from server
    this._http.get(this._url + 'secure', { headers })
    .subscribe( 
      (data) => {this.data = data; console.log(data)}, 
      (error) => {
        console.log(error) 
        // accessToken expired
        
      }
    )
  }

  logout() {
    // send delete call to auth server that removes refresh token from database
    console.log("log out");
    this._loginService.logoff(this._tokenService.getRefreshToken())
    .subscribe(
      (_data: any) => {
        this._tokenService.signOut();
        this._router.navigate(['/']);

      },
      (error: any) => {
        console.log(error); 
      }
    )
    // route to logout
  }
}