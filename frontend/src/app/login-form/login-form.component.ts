import { Component, OnInit } from '@angular/core';
import { User } from '../user';

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

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log("Submitted");
  }
}

