import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getLoggedUser,
  loginFailedAction,
  loginStartAction,
  loginSuccessAction,
  logoutAction,
} from './auth.actions';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStartAction),
      exhaustMap((action) => {
        return this.authService.login(action.mobile, action.password).pipe(
          map((response) => {
            this.authService.storeUserInLocalStorate(response.data);
            return loginSuccessAction({ auth: response.data, redirect: true });
          }),
          catchError((error) => {
            return of(
              loginFailedAction({
                error: error?.error?.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });

  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccessAction),
        tap((action) => {
          if (action.redirect) {
            return this.router.navigate(['/', 'home']);
          }
          return;
        }),
      );
    },
    { dispatch: false },
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction),
        exhaustMap((action) => {
          this.authService.logout();
          return this.router.navigate(['/', 'signin']);
        }),
      );
    },
    { dispatch: false },
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLoggedUser),
      switchMap((action) => {
        const user = this.authService.getUserFromLocalStorage();

        if (!user) {
          // return of(loginFailedAction({ error: 'Failed to Auto Login' }));
          return EMPTY;
        }

        return of(loginSuccessAction({ auth: user, redirect: false }));
      }),
    );
  });
}
