import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlltransactionService } from '../service/alltransaction.service';
import { Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import {
  getSubPromoterBooking,
  getSubPromoterBookingFailure,
  loadAllBookings,
  loadAllBookingsFailure,
  loadAllBookingsSuccess,
  loadLatestBookings,
  loadLatestBookingsFailure,
  loadLatestBookingsSuccess,
  loadSubPromoterBooking,
} from './transac.actions';
import { of } from 'rxjs';
import { SubpromoterprofileService } from '../../sub-promoter-profile/service/subpromoterprofile.service';

@Injectable()
export class TransacEffects {
  constructor(
    private actions$: Actions,
    private transacService: AlltransactionService,
    private subPromoterService: SubpromoterprofileService,
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

  allSubPromoterBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSubPromoterBooking),
      concatMap((action) => {
        return this.subPromoterService
          .getSubPromoterDetails(action.promoterId)
          .pipe(
            map((response) => {
              return getSubPromoterBooking({
                subPromoterBookings: response.data,
              });
            }),
            catchError((error) => {
              return of(
                getSubPromoterBookingFailure({
                  error: error.error.message || error.message,
                }),
              );
            }),
          );
      }),
    );
  });
}
