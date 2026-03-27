import { createReducer, on } from '@ngrx/store';
import { initialState } from './event.state';

import {
  getEventFailedAction,
  getEventStartAction,
  getEventSuccessAction,
} from './event.actions';

export const eventReducer = createReducer(
  initialState,
  on(getEventStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(getEventSuccessAction, (state, action) => {
    return {
      ...state,
      events: action.events,
      loading: false,
      error: null,
    };
  }),
  on(getEventFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
