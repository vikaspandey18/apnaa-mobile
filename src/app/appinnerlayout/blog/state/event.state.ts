import { CategoryModel } from 'src/app/models/category.model';
import { EventResponse } from 'src/app/models/event.model';

export interface EventState {
  events: EventResponse[] | [];
  category: CategoryModel[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: EventState = {
  events: [],
  category: [],
  loading: false,
  error: null,
};
