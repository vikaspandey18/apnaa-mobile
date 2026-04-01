import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { PromoterService } from '../services/promoter.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  loadPromoterFailedAction,
  loadPromoterStartAction,
  loadPromoterSuccessAction,
} from './promoter.actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllPromoter } from './promoter.selectors';

@Injectable()
export class PromoterEffect {
  constructor(
    private actions$: Actions,
    private promoterServices: PromoterService,
    private store: Store,
  ) {}

  getAllPromoter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPromoterStartAction),
      concatLatestFrom(() => this.store.select(selectAllPromoter)),
      switchMap(([action, promoters]) => {
        if (promoters.length > 0) {
          return of(loadPromoterSuccessAction({ promoters }));
        }
        return this.promoterServices.getPromoters().pipe(
          map((response) => {
            return loadPromoterSuccessAction({ promoters: response.data });
          }),
          catchError((error) => {
            return of(
              loadPromoterFailedAction({
                error: error.error.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });
}
