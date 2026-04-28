import { createReducer, on } from '@ngrx/store';

import { initialState } from './transac.state';
import {
  getSubPromoterBooking,
  getSubPromoterBookingFailure,
  loadAllBookings,
  loadAllBookingsFailure,
  loadAllBookingsSuccess,
  loadLatestBookings,
  loadLatestBookingsFailure,
  loadLatestBookingsSuccess,
  loadSubPromoterBooking,
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

  //SubPromoter detail
  on(loadSubPromoterBooking, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(getSubPromoterBooking, (state, action) => {
    return {
      ...state,
      loading: false,
      subPromoterBookings: action.subPromoterBookings,
    };
  }),
  on(getSubPromoterBookingFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
