import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketState } from './ticket.state';

const selectTicket = createFeatureSelector<TicketState>('tickets');

export const selectAllTicket = createSelector(selectTicket, (state) => {
  return state.tickets;
});

export const selectLoadingTicket = createSelector(selectTicket, (state) => {
  return state.loading;
});

export const selectErrorTicket = createSelector(selectTicket, (state) => {
  return state.error;
});
