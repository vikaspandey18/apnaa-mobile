import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BannerService } from '../services/banner.service';
import {
  loadBannerFailed,
  loadBannerStart,
  loadBannerSuccess,
} from './banner.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class BannerEffect {
  constructor(
    private actions$: Actions,
    private bannerServices: BannerService,
  ) {}

  getAllBanner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBannerStart),
      switchMap((action) => {
        return this.bannerServices.showAllBanner().pipe(
          map((response) => {
            return loadBannerSuccess({ banners: response.data });
          }),
          catchError((err) => {
            return of(
              loadBannerFailed({ error: err?.error?.message || err?.message }),
            );
          }),
        );
      }),
    );
  });
}
