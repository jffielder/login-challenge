import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LoginService } from '../services/login.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.components.html',
  styles: [ `
 
  .form-name {
    width: 100%;
  }
  ` ]
})
export class LoginFormComponent implements OnInit {
  userModel = new User('', '');
  loggedIn = false;
  displayEmsg = false;
  // tokenservice
  //tokenstorage.savetoken
  //saverefresh
  constructor(
    private _loginService: LoginService, 
    private _tokenStorageService: TokenStorageService
    ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.userModel);
    
    this._loginService.login(this.userModel)
    .subscribe(
      (data: any) => {
        console.log('Success', data)
        this.loggedIn = true
        this.displayEmsg = false;
        this._tokenStorageService.saveToken( data["accessToken"] )
        this._tokenStorageService.saveRefreshToken( data["refreshToken"] )
      
      },
      (error: any) => {
        this.displayEmsg = true;
        console.log('Error', error)
      }
    )
  }
}

