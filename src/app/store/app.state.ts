import { TransacEffects } from '../apphomelayout/alltransaction/state/transac.effects';
import { transacReducer } from '../apphomelayout/alltransaction/state/transac.reducer';
import { TransacState } from '../apphomelayout/alltransaction/state/transac.state';
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
}

export const AppReducer = {
  auth: authReducer,
  events: eventReducer,
  tickets: ticketReducer,
  transac: transacReducer,
};

export const AppEffect = [
  AuthEffect,
  EventEffect,
  TicketEffect,
  TransacEffects,
];
