import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  template: `
    <div>
      <mat-card>
        <form>
          <mat-form-field>
            <input matInput class="form-name" placeholder="Username">
          </mat-form-field>
        
          <mat-form-field>
            <input matInput placeholder="Password" type="password">
          </mat-form-field>
        </form>
      </mat-card>
    </div>
  `,
  styles: [ `
 
  .form-name {
    width: 100%;
  }
  ` ]
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
