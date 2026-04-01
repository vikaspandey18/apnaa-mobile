import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromoterService } from '../services/promoter.service';

@Component({
  selector: 'app-addpromoter',
  templateUrl: './addpromoter.component.html',
  styleUrls: ['./addpromoter.component.scss'],
})
export class AddpromoterComponent implements OnInit {
  promoterForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private promoterService: PromoterService,
  ) {}

  ngOnInit(): void {
    this.promoterForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.email]],
      credit_amt: ['', [Validators.required, Validators.min(0)]],
      commission_percent: ['', [Validators.min(0)]], // ✅ ADD THIS
    });
  }

  onSubmit(): void {
    if (this.promoterForm.valid) {
      this.successMessage = '';
      this.errorMessage = '';

      const data = this.promoterForm.value;

      this.isSubmitting = true;

      this.promoterService.addPromoter(data).subscribe({
        next: (response) => {
          this.successMessage = 'Promoter added successfully!';
          this.promoterForm.reset();
        },
        error: (error) => {
          this.errorMessage = 'Failed to add promoter. Please try again.';
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    }
  }

  getError(controlName: string): string {
    const control = this.promoterForm.get(controlName);

    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return `${controlName} is required`;
    }

    if (control.errors['pattern']) {
      if (controlName === 'mobile') {
        return 'Mobile number must be 10 digits';
      }
    }

    if (control.errors['email']) {
      return 'Invalid email format';
    }

    if (control.errors['min']) {
      return `${controlName} must be greater than 0`;
    }

    return '';
  }
}
