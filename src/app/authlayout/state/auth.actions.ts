import { createAction, props } from '@ngrx/store';
import { AuthResponse } from 'src/app/models/auth-response';

export const loginStartAction = createAction(
  '[auht] login start',
  props<{ mobile: string; password: string }>(),
);

export const loginSuccessAction = createAction(
  '[auth] login success',
  props<{ auth: AuthResponse; redirect: boolean }>(),
);

export const loginFailedAction = createAction(
  '[auth] login failed',
  props<{ error: string }>(),
);

export const logoutAction = createAction('[auth] logout');

export const getLoggedUser = createAction('[auth] get logged user');
