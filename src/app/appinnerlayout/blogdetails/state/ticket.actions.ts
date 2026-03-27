import { createAction, props } from '@ngrx/store';
import { TicketRespone } from 'src/app/models/ticket.model';

export const loadTicketAction = createAction(
  '[ticket] fetch start',
  props<{ id: string }>(),
);
export const loadTicketSuccessAction = createAction(
  '[ticket] fetch success',
  props<{ tickets: TicketRespone[] }>(),
);
export const loadTicketFailedAction = createAction(
  '[ticket] fetch failed',
  props<{ error: string }>(),
);
