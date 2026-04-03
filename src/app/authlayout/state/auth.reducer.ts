import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import {
  loginFailedAction,
  loginStartAction,
  loginSuccessAction,
  logoutAction,
  updateCreditAmtSuccessAction,
  updateUserFailedAction,
  updateUserStartAction,
  updateUserSuccessAction,
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
  on(updateUserStartAction, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(updateUserSuccessAction, (state, action) => ({
    ...state,
    auth: action.auth,
    loading: false,
    error: null,
  })),

  on(updateUserFailedAction, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(logoutAction, (state, action) => initialState),

  on(updateCreditAmtSuccessAction, (state, action) => ({
    ...state,
    auth: action.auth,
    loading: false,
    error: null,
  })),
);
