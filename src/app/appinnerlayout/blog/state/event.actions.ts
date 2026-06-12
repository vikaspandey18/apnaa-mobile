import { createAction, props } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/category.model';
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

export const loadCategoryStart = createAction('[category] fetch start');

export const loadCategorySuccess = createAction(
  '[category] fetch success',
  props<{ category: CategoryModel[] }>(),
);

export const loadCategoryFailed = createAction(
  '[category] fetch failed',
  props<{ error: string }>(),
);
