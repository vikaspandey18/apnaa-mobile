import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  getAuthErrorState,
  getAuthLoadingState,
  getAuthState,
} from 'src/app/authlayout/state/auth.selectors';
import { AuthResponse } from 'src/app/models/auth-response';
import { sendOtpStartAction } from './state/otp.actions';
import {
  getOtpDetailSelector,
  getOtpErrorSelector,
  getOtpLoadingSelector,
} from './state/otp.selectors';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private store: Store) {}

  auth$!: Observable<AuthResponse | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  message$!: Observable<string | null>;

  isSubmitted!: boolean;
  profileForm!: FormGroup;

  ngOnInit(): void {
    this.auth$ = this.store.select(getAuthState);
    this.loading$ = this.store.select(getOtpLoadingSelector);
    this.error$ = this.store.select(getOtpErrorSelector);
    

    this.loading$.subscribe((loading) => {
      if (!loading) {
        this.isSubmitted = false;
      }
    });

    this.profileForm = new FormGroup({
      mobile: new FormControl('', Validators.required),
    });

    this.auth$.pipe(take(1)).subscribe((authData) => {
      if (authData) {
        this.profileForm.patchValue({
          mobile: authData.mobile,
        });
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isSubmitted = true;
      const formValue = this.profileForm.value;

      const formData = new FormData();

      formData.append('mobile', formValue.mobile || '');

      // 🔥 dispatch action
      this.store.dispatch(sendOtpStartAction({ formData }));
    }
  }
}
