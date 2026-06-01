import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/authlayout/services/auth.service';
import {
  otpFailedToSendAction,
  otpSendSuccessAction,
  sendOtpStartAction,
} from './otp.actions';
import { catchError, concatMap, map, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OtpEffect {
  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private actions$: Actions,
  ) {}

  sendOtp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendOtpStartAction),
      concatMap((action) => {
        return this.authService.sendOtp(action.formData).pipe(
          map((response) => {
            return otpSendSuccessAction({ otp: response.data });
            //  this.router.navigate(['/', 'reresetpassword']);
          }),
          catchError((error) => {
            return of(
              otpFailedToSendAction({
                message: error?.message || error?.error?.message,
              }),
            );
          }),
        );
      }),
    );
  });

  redirecToChangePassword$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(otpSendSuccessAction),
        tap((action) => {
          return this.router.navigate(['/homeresetpassword']);
        }),
      );
    },
    { dispatch: false },
  );
}
