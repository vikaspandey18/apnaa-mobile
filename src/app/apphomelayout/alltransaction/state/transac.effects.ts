import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlltransactionService } from '../service/alltransaction.service';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import {
  loadAllBookings,
  loadAllBookingsFailure,
  loadAllBookingsSuccess,
  loadLatestBookings,
  loadLatestBookingsFailure,
  loadLatestBookingsSuccess,
} from './transac.actions';
import { of } from 'rxjs';

@Injectable()
export class TransacEffects {
  constructor(
    private actions$: Actions,
    private transacService: AlltransactionService,
  ) {}

  loadLatest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLatestBookings),
      switchMap(() => {
        return this.transacService.getLatestBookings().pipe(
          map((response) => {
            return loadLatestBookingsSuccess({ bookings: response.data });
          }),
          catchError((err) => {
            return of(
              loadLatestBookingsFailure({
                error: err.error.message || err.message,
              }),
            );
          }),
        );
      }),
    ),
  );

  allBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllBookings),
      switchMap(() => {
        return this.transacService.getAllBookings().pipe(
          map((response) => {
            return loadAllBookingsSuccess({ bookings: response.data });
          }),
          catchError((err) => {
            return of(
              loadAllBookingsFailure({
                error: err.error.message || err.message,
              }),
            );
          }),
        );
      }),
    ),
  );
}
