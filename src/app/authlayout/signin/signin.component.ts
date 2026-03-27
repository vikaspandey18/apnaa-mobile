import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loginStartAction } from '../state/auth.actions';
import {
  getAuthErrorState,
  getAuthLoadingState,
} from '../state/auth.selectors';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {}

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    // Reactive Form
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    this.loading$ = this.store.select(getAuthLoadingState);
    this.error$ = this.store.select(getAuthErrorState);
  }

  onSubmit() {
    const { mobile, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.store.dispatch(loginStartAction({ mobile, password }));
    }
  }
}
