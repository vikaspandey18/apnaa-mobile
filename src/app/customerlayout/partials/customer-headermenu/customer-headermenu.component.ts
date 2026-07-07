import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-headermenu',
  templateUrl: './customer-headermenu.component.html',
  styleUrls: ['./customer-headermenu.component.scss']
})
export class CustomerHeadermenuComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  menuopen() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('menu-open');
  }
}
