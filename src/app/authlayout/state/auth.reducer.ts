import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import {
  loginFailedAction,
  loginStartAction,
  loginSuccessAction,
  logoutAction,
} from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(loginStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(loginSuccessAction, (state, action) => {
    return {
      ...state,
      auth: action.auth,
      loading: false,
      error: null,
    };
  }),
  on(loginFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(logoutAction, (state, action) => initialState),
);
