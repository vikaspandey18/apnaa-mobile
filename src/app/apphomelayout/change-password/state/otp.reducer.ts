import { createReducer, on } from '@ngrx/store';
import {
  otpFailedToSendAction,
  otpSendSuccessAction,
  sendOtpStartAction,
} from './otp.actions';
import { initialState } from './otp.state';

export const otpReducer = createReducer(
  initialState,
  on(sendOtpStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      otp: null,
    };
  }),
  on(otpSendSuccessAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      otp: action.otp,
    };
  }),
  on(otpFailedToSendAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.message,
    };
  }),
);
