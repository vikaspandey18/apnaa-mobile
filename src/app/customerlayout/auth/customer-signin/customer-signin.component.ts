import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/home';
    // If customer is already logged in, redirect directly
    if (this.customerService.customerId) {
      this.router.navigateByUrl(returnUrl);
    }

    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', Validators.required]
    });
  }

  getReturnUrl(): string | null {
    return this.route.snapshot.queryParams['returnUrl'] || null;
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
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/customer/home';
            this.router.navigateByUrl(returnUrl);
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
