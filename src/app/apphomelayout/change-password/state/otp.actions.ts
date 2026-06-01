import { createAction, props } from '@ngrx/store';
import { OtpResponse } from 'src/app/models/otp-response.model';

export const sendOtpStartAction = createAction(
  '[otp] Otp Start Action',
  props<{ formData: FormData }>(),
);

export const otpSendSuccessAction = createAction(
  '[otp] Otp Send Successfully',
  props<{ otp: OtpResponse }>(),
);

export const otpFailedToSendAction = createAction(
  '[otp] Otp Failed to Send',
  props<{ message: string }>(),
);
