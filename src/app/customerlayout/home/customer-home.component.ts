import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit {
  customer$ = this.customerService.customer$;
  banners: any[] = [];
  categories: any[] = [];
  events: any[] = [];
  filteredEvents: any[] = [];
  selectedCategoryId: string | null = null;
  loadingBanners = false;
  loadingEvents = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.fetchBanners();
    this.fetchEvents();
  }

  fetchBanners() {
    this.loadingBanners = true;
    this.customerService.getBanners().subscribe({
      next: (res) => {
        this.loadingBanners = false;
        if (res && res.status === 'success' && Array.isArray(res.data)) {
          this.banners = res.data;
        }
      },
      error: () => {
        this.loadingBanners = false;
      }
    });
  }

  fetchEvents() {
    this.loadingEvents = true;
    this.customerService.getEvents().subscribe({
      next: (res) => {
        this.loadingEvents = false;
        if (res && res.status === 'success' && res.data) {
          this.categories = res.data.categories || [];
          this.events = res.data.events || [];
          this.filteredEvents = this.events;
        }
      },
      error: () => {
        this.loadingEvents = false;
      }
    });
  }

  filterByCategory(categoryId: string) {
    this.selectedCategoryId = categoryId;
    this.filteredEvents = this.events.filter(e => e.category === categoryId);
  }

  showAll() {
    this.selectedCategoryId = null;
    this.filteredEvents = this.events;
  }
}
