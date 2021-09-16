import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LoginService } from '../services/login.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  displayEmsg = '';
  // tokenservice
  //tokenstorage.savetoken
  //saverefresh
  constructor(
    private _loginService: LoginService, 
    private _tokenStorageService: TokenStorageService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this._route.queryParams
    .subscribe( params => {
      if (params.returnUrl)
        this.displayEmsg = "Please Login"
      else 
        this.displayEmsg = ""
    })
  }

  onSubmit() {
    console.log(this.userModel);
    
    this._loginService.login(this.userModel)
    .subscribe(
      (data: any) => {
        console.log('Success', data)
        this._loginService.setLoggedIn(true);
        this.loggedIn = true
        this.displayEmsg = '';
        this._tokenStorageService.saveToken( data["accessToken"] )
        this._tokenStorageService.saveRefreshToken( data["refreshToken"] )
        this._router.navigate(['/members']);
      
      },
      (error: any) => {
        this._loginService.setLoggedIn(false);
        this.displayEmsg = "failed to login";
        console.log('Error', error)
      }
    )
  }
}

