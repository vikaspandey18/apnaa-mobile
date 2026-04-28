import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransacState } from './transac.state';

export const selectTransacState =
  createFeatureSelector<TransacState>('transac');

export const selectLatestBookings = createSelector(
  selectTransacState,
  (state) => state.latestBookings,
);

export const selectAllBookings = createSelector(
  selectTransacState,
  (state) => state.bookings,
);

export const selectLoadingTransac = createSelector(
  selectTransacState,
  (state) => state.loading,
);

export const selectErrorTransac = createSelector(
  selectTransacState,
  (state) => state.error,
);

export const selectSubPromoterBookings = createSelector(
  selectTransacState,
  (state) => {
    return state.subPromoterBookings;
  },
);
