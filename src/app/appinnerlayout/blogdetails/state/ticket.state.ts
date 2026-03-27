import { TicketRespone } from 'src/app/models/ticket.model';

export interface TicketState {
  tickets: TicketRespone[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};
