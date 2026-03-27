import { createReducer, on } from '@ngrx/store';
import { initialState } from './ticket.state';

import {
  loadTicketAction,
  loadTicketFailedAction,
  loadTicketSuccessAction,
} from './ticket.actions';

export const ticketReducer = createReducer(
  initialState,
  on(loadTicketAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(loadTicketSuccessAction, (state, action) => {
    return {
      ...state,
      tickets: action.tickets,
      loading: false,
    };
  }),
  on(loadTicketFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
      tickets: [],
    };
  }),
);
