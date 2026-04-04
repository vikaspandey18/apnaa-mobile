import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoggedUser, updateCreditAmt } from 'src/app/authlayout/state/auth.actions';
import {
  getAuthCreditAmt,
  getAuthMobileState,
  getAuthNameState,
  getAuthState,
} from 'src/app/authlayout/state/auth.selectors';
import { TransacResponse } from 'src/app/models/transac.model';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import {
  selectAllBookings,
  selectErrorTransac,
  selectLatestBookings,
  selectLoadingTransac,
} from '../alltransaction/state/transac.selectors';
import { loadAllBookings, loadLatestBookings } from '../alltransaction/state/transac.actions';
import { loadPromoterStartAction } from '../subpromoters/state/promoter.actions';
import { AuthResponse } from 'src/app/models/auth-response';
import { map } from 'rxjs/operators';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isChecked: boolean = false;

  constructor(private store: Store) {}

  auth$!: Observable<AuthResponse | null>;
  username$!: Observable<string | null>;
  mobile$!: Observable<string | null>;

  latestTransaction$!: Observable<TransacResponse[] | []>;
  allTransaction$!: Observable<TransacResponse[] | []>;
  transacLoading$!: Observable<boolean>;
  transacError$!: Observable<string | null>;
  creditAmt$!: Observable<number>;

  totalSales$!: Observable<number>;

  ngOnInit(): void {
    this.store.dispatch(loadLatestBookings());
    this.store.dispatch(loadPromoterStartAction());
    this.store.dispatch(loadAllBookings());

    this.auth$ = this.store.select(getAuthState);

    this.username$ = this.store.select(getAuthNameState);
    this.mobile$ = this.store.select(getAuthMobileState);
    this.creditAmt$ = this.store.select(getAuthCreditAmt);

    this.latestTransaction$ = this.store.select(selectLatestBookings);
    this.transacLoading$ = this.store.select(selectLoadingTransac);
    this.transacError$ = this.store.select(selectErrorTransac);

    this.allTransaction$ = this.store.select(selectAllBookings);

    

    this.totalSales$ = this.allTransaction$.pipe(
      map((transaction:TransacResponse[]) => {
        return transaction.reduce((sum,t) => sum + Number(t.rate || 0), 0);
      })
    )
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
