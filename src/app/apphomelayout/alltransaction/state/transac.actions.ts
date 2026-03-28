import { createAction, props } from '@ngrx/store';
import { TransacResponse } from 'src/app/models/transac.model';

// Latest 5
export const loadLatestBookings = createAction(
  '[Transac] Load Latest Bookings',
);

export const loadLatestBookingsSuccess = createAction(
  '[Transac] Load Latest Bookings Success',
  props<{ bookings: TransacResponse[] }>(),
);

export const loadLatestBookingsFailure = createAction(
  '[Transac] Load Latest Bookings Failure',
  props<{ error: string }>(),
);

// All bookings
export const loadAllBookings = createAction('[Transac] Load All Bookings');

export const loadAllBookingsSuccess = createAction(
  '[Transac] Load All Bookings Success',
  props<{ bookings: TransacResponse[] }>(),
);

export const loadAllBookingsFailure = createAction(
  '[Transac] Load All Bookings Failure',
  props<{ error: string }>(),
);
