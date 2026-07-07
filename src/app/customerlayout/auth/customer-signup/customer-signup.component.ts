import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.scss']
})
export class CustomerSignupComponent implements OnInit {
  signupForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.customerService.customerId) {
      this.router.navigate(['/customer/home']);
    }

    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.errorMessage = null;
    if (this.signupForm.valid) {
      this.loading = true;
      this.customerService.register(this.signupForm.value).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.status === 'success') {
            this.router.navigate(['/customer/home']);
          } else {
            this.errorMessage = res.message || 'Registration failed. Mobile number might already be registered.';
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'A network error occurred. Please try again.';
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
