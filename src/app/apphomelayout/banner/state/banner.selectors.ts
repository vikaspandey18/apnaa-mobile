import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BannerState } from './banner.state';
import { state } from '@angular/animations';

const bannerFeatureSelector = createFeatureSelector<BannerState>('banners');

export const selectBanners = createSelector(bannerFeatureSelector, (state) => {
  return state.banners;
});

export const selectLoadingBanners = createSelector(
  bannerFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const selectErrorBanners = createSelector(
  bannerFeatureSelector,
  (state) => {
    return state.error;
  },
);
