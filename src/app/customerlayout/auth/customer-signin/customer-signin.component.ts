import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-signin',
  templateUrl: './customer-signin.component.html',
  styleUrls: ['./customer-signin.component.scss']
})
export class CustomerSigninComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // If customer is already logged in, redirect directly to home
    if (this.customerService.customerId) {
      this.router.navigate(['/customer/home']);
    }

    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = null;
    if (this.loginForm.valid) {
      this.loading = true;
      const { mobile, password } = this.loginForm.value;
      this.customerService.login(mobile, password).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.status === 'success') {
            this.router.navigate(['/customer/home']);
          } else {
            this.errorMessage = res.message || 'Login failed. Please check credentials.';
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'A network error occurred. Please try again.';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
