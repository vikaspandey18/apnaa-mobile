import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TransacResponse } from 'src/app/models/transac.model';
import { loadAllBookings } from './state/transac.actions';
import {
  selectAllBookings,
  selectErrorTransac,
  selectLoadingTransac,
} from './state/transac.selectors';

@Component({
  selector: 'app-alltransaction',
  templateUrl: './alltransaction.component.html',
  styleUrls: ['./alltransaction.component.scss'],
})
export class AlltransactionComponent implements OnInit {
  constructor(private store: Store) {}

  latestTransaction$!: Observable<TransacResponse[] | []>;
  transacLoading$!: Observable<boolean>;
  transacError$!: Observable<string | null>;

  ngOnInit(): void {
    this.store.dispatch(loadAllBookings());

    this.latestTransaction$ = this.store.select(selectAllBookings);
    this.transacLoading$ = this.store.select(selectLoadingTransac);
    this.transacError$ = this.store.select(selectErrorTransac);
  }
}
