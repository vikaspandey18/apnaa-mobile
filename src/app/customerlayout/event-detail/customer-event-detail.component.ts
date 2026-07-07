import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-event-detail',
  templateUrl: './customer-event-detail.component.html',
  styleUrls: ['./customer-event-detail.component.scss']
})
export class CustomerEventDetailComponent implements OnInit {
  eventId!: string;
  event: any = null;
  tickets: any[] = [];
  loading = false;
  errorMessage: string | null = null;
  selectedTicketId: string | null = null;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    if (this.eventId) {
      this.fetchEventDetails();
    }
  }

  fetchEventDetails() {
    this.loading = true;
    this.customerService.getEventDetails(this.eventId).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.status === 'success' && res.data) {
          this.event = res.data.event;
          this.tickets = res.data.tickets || [];
          if (this.tickets.length > 0) {
            this.selectedTicketId = this.tickets[0].id;
          }
        } else {
          this.errorMessage = res.message || 'Failed to load event details.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error occurred while loading event details.';
      }
    });
  }

  selectTicket(ticketId: string) {
    this.selectedTicketId = ticketId;
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onProceed() {
    if (this.selectedTicketId && this.quantity > 0) {
      this.router.navigate(['/customer/book', this.eventId], {
        queryParams: {
          ticketId: this.selectedTicketId,
          qty: this.quantity
        }
      });
    }
  }
}
