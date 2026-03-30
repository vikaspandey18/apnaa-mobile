import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getAuthCreditAmt,
  getAuthMobileState,
  getAuthNameState,
} from 'src/app/authlayout/state/auth.selectors';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  constructor(private store: Store) {}

  username$!: Observable<string | null>;
  mobile$!: Observable<string | null>;
  creditAmt$!: Observable<number>;

  ngOnInit(): void {
    this.username$ = this.store.select(getAuthNameState);
    this.mobile$ = this.store.select(getAuthMobileState);
    this.creditAmt$ = this.store.select(getAuthCreditAmt);
  }
}
