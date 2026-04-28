import { TransacResponse } from 'src/app/models/transac.model';

export interface TransacState {
  latestBookings: TransacResponse[] | [];
  bookings: TransacResponse[] | [];
  subPromoterBookings: TransacResponse[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: TransacState = {
  latestBookings: [],
  bookings: [],
  subPromoterBookings: [],
  loading: false,
  error: null,
};
