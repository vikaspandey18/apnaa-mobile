import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-payment-success',
  templateUrl: './customer-payment-success.component.html',
  styleUrls: ['./customer-payment-success.component.scss']
})
export class CustomerPaymentSuccessComponent implements OnInit {
  bookingId!: string;
  qrData!: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('bookingId') || '';
    this.qrData = this.bookingId;
  }

  goHome() {
    this.router.navigate(['/customer/home']);
  }
}
