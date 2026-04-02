import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TicketService } from 'src/app/appinnerlayout/blogdetails/services/ticket.service';
import {
  getAuthCreditAmt,
  getAuthId,
} from 'src/app/authlayout/state/auth.selectors';
import { MrpTicket } from 'src/app/models/ticket.model';
import { TicketsService } from './service/tickets.service';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.scss'],
})
export class AddticketComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private store: Store,
    private ticketsService: TicketsService,
    private router: Router,
  ) {}

  form!: FormGroup;
  ticket: MrpTicket;
  totalAmount: number = 0;

  responseMessage = '';
  isSuccess = false;
  isSubmitting = false;
  hasInsufficientCredit = false;

  userId$ = this.store.select(getAuthId);
  credit_amt$ = this.store.select(getAuthCreditAmt);

  ngOnInit(): void {
    // ✅ Create form
    this.form = this.fb.group({
      noOfTicket: [1, [Validators.required, Validators.min(1)]],
      customerName: ['', Validators.required],
      customerMobileNo: ['', Validators.required],
      customerEmail: [''],
      paymentStatus: ['Pending', Validators.required],
      notes: [''],
    });

    const ticketId = this.route.snapshot.paramMap.get('ticket');

    if (ticketId) {
      this.ticketService.getTicketById(ticketId).subscribe({
        next: (response) => {
          this.ticket = response.data;
          this.calculateTotal();
        },
        error: (e) => {
          console.log(e);
        },
      });
    }

    this.form.get('noOfTicket')?.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  calculateTotal() {
    const qty = this.form.get('noOfTicket')?.value || 0;
    const price = Number(this.ticket?.rate || 0);

    this.totalAmount = qty * price;

    this.credit_amt$.pipe(take(1)).subscribe((credit) => {
      this.hasInsufficientCredit = this.totalAmount > (credit || 0);
    });
  }

  onSubmit() {
    if (this.isSubmitting) return;
    if (this.form.invalid) return;
    if (!this.ticket?.id) {
      this.isSuccess = false;
      this.responseMessage = 'Ticket details not loaded. Please try again.';
      return;
    }

    const confirmSubmit = window.confirm(
      `Confirm booking?\nTotal Amount: ₹${this.totalAmount}`,
    );

    if (!confirmSubmit) return;

    this.userId$.pipe(take(1)).subscribe((userId) => {
      if (!userId) {
        this.isSuccess = false;
        this.responseMessage = 'User session not found. Please sign in again.';
        return;
      }

      this.responseMessage = '';
      this.isSuccess = false;
      this.isSubmitting = true;

      const payload = {
        ...this.form.value,
        ticketId: this.ticket.id,
        totalAmount: this.totalAmount,
        userId,
      };

      this.ticketsService
        .addTicke(payload)
        .pipe(finalize(() => (this.isSubmitting = false)))
        .subscribe({
          next: (res) => {
            this.isSuccess = res.status === 200;
            this.responseMessage = res.message || '';
            if (this.isSuccess) {
              this.form.reset();
              this.totalAmount = 0;
              this.router.navigate(['success']);
            }
          },
          error: (err) => {
            console.error(err);
            this.isSuccess = false;
            this.responseMessage = 'Server error. Please try again.';
          },
        });
    });
  }
}
