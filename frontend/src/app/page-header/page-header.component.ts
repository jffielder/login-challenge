import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <div>
      {{title}}
    </div>
  `,
  styles: [ 'div { font-size: large; }'
  ]
})
export class PageHeaderComponent implements OnInit {

  constructor() { }

  @Input() title:string="";
  
  ngOnInit(): void {
  }

}
