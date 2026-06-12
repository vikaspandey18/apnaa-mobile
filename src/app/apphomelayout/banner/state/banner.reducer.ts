import { createReducer, on } from '@ngrx/store';
import { initialState } from './banner.state';
import {
  loadBannerFailed,
  loadBannerStart,
  loadBannerSuccess,
} from './banner.actions';

export const bannerReducer = createReducer(
  initialState,
  on(loadBannerStart, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(loadBannerSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      banners: action.banners,
    };
  }),
  on(loadBannerFailed, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
