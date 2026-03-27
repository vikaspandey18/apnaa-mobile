import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const getAuthFeatureSelector = createFeatureSelector<AuthState>('auth');

export const getAuthState = createSelector(getAuthFeatureSelector, (state) => {
  return state.auth;
});

export const getAuthNameState = createSelector(
  getAuthFeatureSelector,
  (state) => {
    return state.auth?.name ?? null;
  },
);
export const getAuthMobileState = createSelector(
  getAuthFeatureSelector,
  (state) => {
    return state.auth?.mobile ?? null;
  },
);

export const getAuthId = createSelector(getAuthFeatureSelector, (state) => {
  return state.auth?.id;
});

export const getAuthLoadingState = createSelector(
  getAuthFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getAuthErrorState = createSelector(
  getAuthFeatureSelector,
  (state) => {
    return state.error;
  },
);
