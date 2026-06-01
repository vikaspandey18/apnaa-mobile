import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OtpState } from './otp.state';

const otpFeatureSelector = createFeatureSelector<OtpState>('otp');

export const getOtpLoadingSelector = createSelector(
  otpFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getOtpErrorSelector = createSelector(
  otpFeatureSelector,
  (state) => {
    return state.error;
  },
);

export const getOtpDetailSelector = createSelector(
  otpFeatureSelector,
  (state) => {
    return state.otp;
  },
);
