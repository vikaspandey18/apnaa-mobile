import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PromoterState } from './promoter.state';

const selectPromoter = createFeatureSelector<PromoterState>('promoter');

export const selectAllPromoter = createSelector(selectPromoter, (state) => {
  return state.promoters;
});

export const selectPromoterLoading = createSelector(selectPromoter, (state) => {
  return state.loading;
});

export const selectPromoterError = createSelector(selectPromoter, (state) => {
  return state.error;
});

export const selectSinglePromoter = (id: string) =>
  createSelector(
    selectAllPromoter,
    (promoters) => promoters.find((promoter) => promoter.id === id) || null,
  );