import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-sidebar',
  templateUrl: './customer-sidebar.component.html',
  styleUrls: ['./customer-sidebar.component.scss']
})
export class CustomerSidebarComponent implements OnInit {
  customer$ = this.customerService.customer$;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  menuclose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('menu-open');
  }

  logout() {
    this.customerService.logout();
    this.menuclose();
    this.router.navigate(['/customer/login']);
  }
}
