import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TransacResponse } from 'src/app/models/transac.model';
import {
  loadAllBookings,
  loadSubPromoterBooking,
} from '../alltransaction/state/transac.actions';
import {
  selectAllBookings,
  selectErrorTransac,
  selectLoadingTransac,
  selectSubPromoterBookings,
} from '../alltransaction/state/transac.selectors';

@Component({
  selector: 'app-sub-promoter-profile',
  templateUrl: './sub-promoter-profile.component.html',
  styleUrls: ['./sub-promoter-profile.component.scss'],
})
export class SubPromoterProfileComponent implements OnInit {
  promoterId: string = '';
  promoterName: string = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  latestTransaction$!: Observable<TransacResponse[] | []>;
  transacLoading$!: Observable<boolean>;
  transacError$!: Observable<string | null>;

  ngOnInit(): void {
    this.promoterId = this.route.snapshot.paramMap.get('id') || '';
    this.promoterName = this.route.snapshot.paramMap.get('name') || '';

    if (this.promoterId) {
      this.store.dispatch(
        loadSubPromoterBooking({ promoterId: this.promoterId }),
      );

      this.latestTransaction$ = this.store.select(selectSubPromoterBookings);
      this.transacLoading$ = this.store.select(selectLoadingTransac);
      this.transacError$ = this.store.select(selectErrorTransac);
    }
  }
}
