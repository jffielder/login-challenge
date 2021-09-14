import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  template: `
    <mat-card>
      <mat-card-title>Secure Page</mat-card-title>
    </mat-card>
  `,
  styles: [ 
    ' mat-card-title {}',
    ' mat-card { padding:40px; margin: 2px; text-align: center }'
  ]
})
export class MembersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

/*
todo:
protect secure page routing with an authgaurd 
request protected resources from secure page to display (users)
move logout button to secure page
route to secure page after loging on
route to login page after failing to auth for secure page
make refreshtokens useful
make logout button make api/delete call

*/