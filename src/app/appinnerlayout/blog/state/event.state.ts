import { EventResponse } from 'src/app/models/event.model';

export interface EventState {
  events: EventResponse[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};
