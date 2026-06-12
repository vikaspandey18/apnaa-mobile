import { TransacEffects } from '../apphomelayout/alltransaction/state/transac.effects';
import { transacReducer } from '../apphomelayout/alltransaction/state/transac.reducer';
import { TransacState } from '../apphomelayout/alltransaction/state/transac.state';
import { BannerEffect } from '../apphomelayout/banner/state/banner.effects';
import { bannerReducer } from '../apphomelayout/banner/state/banner.reducer';
import { BannerState } from '../apphomelayout/banner/state/banner.state';
import { OtpEffect } from '../apphomelayout/change-password/state/otp.effects';
import { otpReducer } from '../apphomelayout/change-password/state/otp.reducer';
import { OtpState } from '../apphomelayout/change-password/state/otp.state';
import { PromoterEffect } from '../apphomelayout/subpromoters/state/promoter.effects';
import { promoterReducer } from '../apphomelayout/subpromoters/state/promoter.reducer';
import { PromoterState } from '../apphomelayout/subpromoters/state/promoter.state';
import { EventEffect } from '../appinnerlayout/blog/state/event.effects';
import { eventReducer } from '../appinnerlayout/blog/state/event.reducer';
import { EventState } from '../appinnerlayout/blog/state/event.state';
import { TicketEffect } from '../appinnerlayout/blogdetails/state/ticket.effects';
import { ticketReducer } from '../appinnerlayout/blogdetails/state/ticket.reducer';
import { TicketState } from '../appinnerlayout/blogdetails/state/ticket.state';
import { AuthEffect } from '../authlayout/state/auth.effects';
import { authReducer } from '../authlayout/state/auth.reducer';
import { AuthState } from '../authlayout/state/auth.state';

export interface AppState {
  auth: AuthState;
  event: EventState;
  ticket: TicketState;
  alltransaction: TransacState;
  promoters: PromoterState;
  otp: OtpState;
  banner: BannerState;
}

export const AppReducer = {
  auth: authReducer,
  events: eventReducer,
  tickets: ticketReducer,
  transac: transacReducer,
  promoter: promoterReducer,
  otp: otpReducer,
  banners: bannerReducer,
};

export const AppEffect = [
  AuthEffect,
  EventEffect,
  TicketEffect,
  TransacEffects,
  PromoterEffect,
  OtpEffect,
  BannerEffect,
];
