import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TicketService } from 'src/app/appinnerlayout/blogdetails/services/ticket.service';
import { getAuthId } from 'src/app/authlayout/state/auth.selectors';
import { MrpTicket } from 'src/app/models/ticket.model';
import { TicketsService } from './service/tickets.service';
import { take } from 'rxjs/operators';

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
  ) {}

  form!: FormGroup;
  ticket: MrpTicket;
  totalAmount: number = 0;

  responseMessage = '';
  isSuccess = false;

  userId$ = this.store.select(getAuthId);

  ngOnInit(): void {
    // ✅ Create form
    this.form = this.fb.group({
      noOfTicket: [1, [Validators.required, Validators.min(1)]],
      customerName: ['', Validators.required],
      customerMobileNo: ['', Validators.required],
      customerEmail: [''],
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
    const price = Number(this.ticket?.mrp || 0);

    this.totalAmount = qty * price;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const confirmSubmit = window.confirm(
      `Confirm booking?\nTotal Amount: ₹${this.totalAmount}`,
    );

    if (!confirmSubmit) return;

    this.userId$.pipe(take(1)).subscribe((userId) => {
      const payload = {
        ...this.form.value,
        ticketId: this.ticket.id,
        totalAmount: this.totalAmount,
        userId: this.userId$,
      };

      this.ticketsService.addTicke(payload).subscribe({
        next: (res) => {
          this.isSuccess = res.status === 200;
          this.responseMessage = "Submited";
          if (this.isSuccess) {
            this.form.reset();
            this.totalAmount = 0;
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
