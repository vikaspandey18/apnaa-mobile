import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-booking-form',
  templateUrl: './customer-booking-form.component.html',
  styleUrls: ['./customer-booking-form.component.scss']
})
export class CustomerBookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  eventId!: string;
  ticketId!: string;
  qty = 1;
  event: any = null;
  selectedTicket: any = null;
  loading = false;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId') || '';
    this.ticketId = this.route.snapshot.queryParamMap.get('ticketId') || '';
    this.qty = Number(this.route.snapshot.queryParamMap.get('qty')) || 1;

    if (!this.eventId || !this.ticketId) {
      this.router.navigate(['/customer/home']);
      return;
    }

    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]],
      notes: ['']
    });

    // Prefill data from logged in customer
    this.customerService.customer$.subscribe(customer => {
      if (customer) {
        this.bookingForm.patchValue({
          name: customer.name,
          mobile: customer.mobile,
          email: customer.email || ''
        });
      }
    });

    this.fetchDetails();
    this.loadRazorpayScript();
  }

  fetchDetails() {
    this.loading = true;
    this.customerService.getEventDetails(this.eventId).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.status === 'success' && res.data) {
          this.event = res.data.event;
          const tickets = res.data.tickets || [];
          this.selectedTicket = tickets.find((t: any) => String(t.id) === String(this.ticketId));
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  get totalCost(): number {
    if (this.selectedTicket) {
      return Number(this.selectedTicket.rate) * this.qty;
    }
    return 0;
  }

  onSubmit() {
    this.errorMessage = null;
    if (this.bookingForm.valid && this.selectedTicket) {
      this.isSubmitting = true;
      const { name, mobile, email, notes } = this.bookingForm.value;

      const payload = {
        event_id: this.eventId,
        ticket_id: this.ticketId,
        no_of_ticket: this.qty,
        customer_name: name,
        customer_mobile: mobile,
        customer_email: email,
        notes: notes
      };

      this.customerService.createBooking(payload).subscribe({
        next: (res) => {
          if (res.status === 'success' && res.data) {
            // TEMPORARY BYPASS: Directly call verifyPayment with a dummy payment ID to simulate success
            this.verifyPayment(res.data.booking_id, 'pay_dummy_' + Date.now());
            // this.launchRazorpay(res.data);
          } else {
            this.isSubmitting = false;
            this.errorMessage = res.message || 'Failed to initialize booking transaction.';
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err.error?.message || 'Error occurred while creating booking.';
        }
      });
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }

  launchRazorpay(data: { booking_id: string; amount: number; razorpay_order_id: string; key_id: string }) {
    const { name, mobile, email } = this.bookingForm.value;
    const options = {
      key: data.key_id,
      amount: data.amount, // API should return amount in Paisa, or if in Rupees, multiply by 100
      currency: 'INR',
      name: 'Apna Entry',
      description: 'Event Tickets Purchase',
      order_id: data.razorpay_order_id,
      handler: (response: any) => {
        this.verifyPayment(data.booking_id, response.razorpay_payment_id, response.razorpay_signature);
      },
      prefill: {
        name: name,
        email: email,
        contact: mobile
      },
      theme: {
        color: '#0a298d'
      },
      modal: {
        ondismiss: () => {
          this.isSubmitting = false;
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }

  verifyPayment(bookingId: string, paymentId: string, signature?: string) {
    const payload = {
      booking_id: bookingId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      status: 'Paid'
    };

    this.customerService.updatePaymentStatus(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.status === 'success') {
          this.router.navigate(['/customer/payment-success', bookingId]);
        } else {
          this.errorMessage = 'Payment recorded, but verification failed: ' + res.message;
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Failed to record online payment. Please contact support.';
      }
    });
  }
}
