import { OtpResponse } from 'src/app/models/otp-response.model';

export interface OtpState {
  otp: OtpResponse | null;
  loading: boolean;
  error: string | null;
}

export const initialState: OtpState = {
  otp: null,
  loading: false,
  error: null,
};
