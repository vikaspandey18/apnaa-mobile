import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoggedUser } from 'src/app/authlayout/state/auth.actions';
import {
  getAuthMobileState,
  getAuthNameState,
} from 'src/app/authlayout/state/auth.selectors';
import { TransacResponse } from 'src/app/models/transac.model';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import {
  selectErrorTransac,
  selectLatestBookings,
  selectLoadingTransac,
} from '../alltransaction/state/transac.selectors';
import { loadLatestBookings } from '../alltransaction/state/transac.actions';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isChecked: boolean = false;

  constructor(private store: Store) {}

  username$!: Observable<string | null>;
  mobile$!: Observable<string | null>;
  latestTransaction$!: Observable<TransacResponse[] | []>;
  transacLoading$!: Observable<boolean>;
  transacError$!: Observable<string | null>;

  ngOnInit(): void {
    this.store.dispatch(loadLatestBookings());

    this.username$ = this.store.select(getAuthNameState);
    this.mobile$ = this.store.select(getAuthMobileState);

    this.latestTransaction$ = this.store.select(selectLatestBookings);
    this.transacLoading$ = this.store.select(selectLoadingTransac);
    this.transacError$ = this.store.select(selectErrorTransac);
  }

  doCheck() {
    let html = document.getElementsByTagName('html')[0];
    this.isChecked = !this.isChecked;
    if (this.isChecked == true) {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }
  }
}
