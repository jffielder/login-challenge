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
    
    // Oninit, component requests secure data from server to be displayed

    // skip checking current token exp, always send refresh for new token
    const refreshToken = this._tokenService.getRefreshToken()

    this._loginService.fetchToken(refreshToken)
    .subscribe(
    (data: any) => { // successful refresh
      
      
      this._tokenService.saveToken(data.accessToken)

      // add accesstoken for request
      const headers = new HttpHeaders().set('Authorization', "Bearer " + data.accessToken || "")
      
      // retrieve secure data
      this._http.get(this._url + 'secure', { headers })
      .subscribe( 
        (data) => {this.data = data}, 
        (error) => {console.log(error);this._router.navigate(['/']);
        });
      },

      // failed refresh
    (error: any) => {console.log(error)}
    )
}

  logout() {
    // send delete call to auth server that removes refresh token from database

    this._loginService.logoff(this._tokenService.getRefreshToken())
    .subscribe(
      () => {
        this._tokenService.signOut();
        this._router.navigate(['/']);

      },
      (error: any) => {
        console.log(error); 
      }
    )
  }
}