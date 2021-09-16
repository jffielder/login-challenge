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
      <a mat-flat-button (click)="logout()">Logout</a>
      {{ data | json }}
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


    this._http.get(this._url + 'secure', { headers })
    .subscribe( 
      (data) => {this.data = data; console.log(data)}, 
      (error) => {
        console.log("changed ", error) 
        // accessToken expired
        if (this._loginService.isLoggedIn() ) {
          console.log("got new token")
        } else {
          console.log("did not get new token")
          this._router.navigate(['/']);
        }
      }
    )
  }



  logout() {
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