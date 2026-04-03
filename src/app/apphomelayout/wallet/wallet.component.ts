import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  getAuthCreditAmt,
  getAuthMobileState,
  getAuthNameState,
  getAuthState,
} from 'src/app/authlayout/state/auth.selectors';
import { WalletService } from './service/wallet.service';
import { WalletHistoryModel } from 'src/app/models/wallert-history.model';
import { catchError, finalize } from 'rxjs/operators';
import { updateCreditAmt } from 'src/app/authlayout/state/auth.actions';
import { AuthResponse } from 'src/app/models/auth-response';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  constructor(
    private store: Store,
    private walletService: WalletService,
  ) {}

  username$!: Observable<string | null>;
  auth$!: Observable<AuthResponse | null>;
  mobile$!: Observable<string | null>;
  creditAmt$!: Observable<number>;

  isLoading = false;
  isError: string | null = null;
  walletHistory: WalletHistoryModel[] | [];

  ngOnInit(): void {
    this.store.dispatch(updateCreditAmt());

    this.auth$ = this.store.select(getAuthState);

    this.username$ = this.store.select(getAuthNameState);
    this.mobile$ = this.store.select(getAuthMobileState);
    this.creditAmt$ = this.store.select(getAuthCreditAmt);

    this.isLoading = true;

    this.walletService
      .getAllTransactionsHistory()
      .pipe(
        catchError((err) => {
          this.isError = err?.error?.message || 'Something went wrong';
          return of({ data: [] });
        }),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((res) => {
        this.walletHistory = res?.data ?? [];
      });
  }
}
