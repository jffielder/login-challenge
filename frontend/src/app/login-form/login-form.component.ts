import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LoginService } from '../login.service';

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

  // tokenservice
  //tokenstorage.savetoken
  //saverefresh
  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.userModel);
    
    this._loginService.login(this.userModel)
    .subscribe(
      data => {
        console.log('Success', data)},
      error => console.log('Error', error)
    )
  }
}

