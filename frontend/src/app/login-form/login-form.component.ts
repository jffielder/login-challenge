import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  template: `
    <div fxLayoutAlign="center center" fxFlexFill>
      <mat-card fxFlex="25">
        <form fxLayout="column">
          <mat-form-field>
            <input matInput class="form-name" placeholder="Username">
          </mat-form-field>
        
          <mat-form-field>
            <input matInput placeholder="Password" type="password">
          </mat-form-field>
          <button mat-stroked-button type="submit">Login</button>
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
