import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from './service/password.service';
import { Store } from '@ngrx/store';
import { logoutAction } from 'src/app/authlayout/state/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { getOtpDetailSelector } from '../change-password/state/otp.selectors';
import { OtpResponse } from 'src/app/models/otp-response.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home-reset-password',
  templateUrl: './home-reset-password.component.html',
  styleUrls: ['./home-reset-password.component.scss'],
})
export class HomeResetPasswordComponent implements OnInit, OnDestroy {
  constructor(
    private passwordService: PasswordService,
    private store: Store,
  ) {}

  showConfirmPassword = false;

  resetForm!: FormGroup;

  resetPasswordSubscription!: Subscription;

  otp!: string;

  message = '';

  showToast = false;

  otp$!: Observable<OtpResponse | null>;

  ngOnInit(): void {
    this.otp$ = this.store.select(getOtpDetailSelector);

    this.resetForm = new FormGroup({
      otp: new FormControl('', Validators.required),

      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });

    this.otp$.pipe(take(1)).subscribe((response) => {
      if (response?.otp) {
        this.resetForm.patchValue({
          otp: response.otp,
        });

        this.message = 'OTP sent successfully';

        this.showToast = true;

        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }
    });
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const newPassword = this.resetForm.get('newPassword')?.value;

      const confirmPassword = this.resetForm.get('confirmPassword')?.value;
      const otp = this.resetForm.get('otp')?.value;

      if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const formData = new FormData();

      formData.append('password', newPassword);
      formData.append('confirm_password', confirmPassword);
      formData.append('otp', otp);

      this.resetPasswordSubscription = this.passwordService
        .resetpassword(formData)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.store.dispatch(logoutAction());
          },
          error: (error) => {
            alert(
              error?.error?.message || error?.message || 'Something went wrong',
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.resetPasswordSubscription) {
      this.resetPasswordSubscription.unsubscribe();
    }
  }
}
