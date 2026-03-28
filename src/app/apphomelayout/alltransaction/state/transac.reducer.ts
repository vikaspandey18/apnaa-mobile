import { createReducer, on } from '@ngrx/store';

import { initialState } from './transac.state';
import {
  loadAllBookings,
  loadAllBookingsFailure,
  loadAllBookingsSuccess,
  loadLatestBookings,
  loadLatestBookingsFailure,
  loadLatestBookingsSuccess,
} from './transac.actions';

export const transacReducer = createReducer(
  initialState,

  // Latest
  on(loadLatestBookings, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(loadLatestBookingsSuccess, (state, { bookings }) => ({
    ...state,
    loading: false,
    latestBookings: bookings,
  })),
  on(loadLatestBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // All
  on(loadAllBookings, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadAllBookingsSuccess, (state, { bookings }) => ({
    ...state,
    loading: false,
    bookings: bookings,
  })),
  on(loadAllBookingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
