import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-my-orders',
  templateUrl: './customer-my-orders.component.html',
  styleUrls: ['./customer-my-orders.component.scss']
})
export class CustomerMyOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading = true;
    this.customerService.getOrders().subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.status === 'success' && Array.isArray(res.data)) {
          this.orders = res.data;
        } else {
          this.errorMessage = res.message || 'Failed to load booking history.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error occurred while loading orders.';
      }
    });
  }
}
