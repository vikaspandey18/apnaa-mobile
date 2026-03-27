import { createAction, props } from '@ngrx/store';
import { EventResponse } from 'src/app/models/event.model';

export const getEventStartAction = createAction('[event] fetch start');

export const getEventSuccessAction = createAction(
  '[event] fetch success',
  props<{ events: EventResponse[] }>(),
);

export const getEventFailedAction = createAction(
  '[event] fetch failed',
  props<{ error: string }>(),
);

