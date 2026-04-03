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

export const updateUserStartAction = createAction(
  '[user] update start',
  props<{ formData: FormData }>(),
);

export const updateUserSuccessAction = createAction(
  '[user] update success',
  props<{ auth: AuthResponse; message: string }>(),
);

export const updateUserFailedAction = createAction(
  '[user] update failed',
  props<{ error: string }>(),
);

export const updateCreditAmt = createAction('[user] update credit amt');

export const updateCreditAmtSuccessAction = createAction(
  '[user] update credit success',
  props<{ auth: AuthResponse }>(),
);
