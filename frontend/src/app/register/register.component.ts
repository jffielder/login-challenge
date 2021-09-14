import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  user = {
    'username': '',
    'password': '',
    'passwordConfirm': ''

  }

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.user);
    
    // check confirm password

    this._loginService.register(this.user)
    .subscribe(
      (data: any) => {
        console.log('Success', data)

        
        // save tokens and login
      
      },
      (error: any) => console.log('Error', error)
    )
  }

}