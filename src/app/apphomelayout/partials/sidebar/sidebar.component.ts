import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logoutAction } from 'src/app/authlayout/state/auth.actions';
import {
  getAuthCreditAmt,
  getAuthMobileState,
  getAuthNameState,
  getAuthState,
} from 'src/app/authlayout/state/auth.selectors';
import { AuthResponse } from 'src/app/models/auth-response';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private store: Store) {}

  auth$!: Observable<AuthResponse | null>;

  username$!: Observable<string | null>;
  mobile$!: Observable<string | null>;
  creditAmt$!: Observable<number>;

  ngOnInit(): void {
    this.auth$ = this.store.select(getAuthState);

    this.username$ = this.store.select(getAuthNameState);
    this.mobile$ = this.store.select(getAuthMobileState);
    this.creditAmt$ = this.store.select(getAuthCreditAmt);
  }

  logout() {
    this.store.dispatch(logoutAction());
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('menu-open');
  }

  menuclose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('menu-open');
  }
}
