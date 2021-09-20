import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    'h1 {font-color: red}'
  ]
})
export class RegisterComponent implements OnInit {

  user = {
    'username': '',
    'password': '',
    'passwordConfirm': ''

  }

  displayEmsg = '';

  constructor(private _loginService: LoginService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.user);
    
    // check confirm password

    this._loginService.register(this.user)
    .subscribe(
      (data: any) => {
        console.log('Success', data)
        this._router.navigate(['/'],  { queryParams: {return: "true"}});

      },
      (error: any) => {
        // username taken
        this.displayEmsg = "Username Already Taken"
        console.log('Error', error)}
    )
  }

}