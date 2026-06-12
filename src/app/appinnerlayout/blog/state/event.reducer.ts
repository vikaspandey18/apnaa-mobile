import { createReducer, on } from '@ngrx/store';
import { initialState } from './event.state';

import {
  getEventFailedAction,
  getEventStartAction,
  getEventSuccessAction,
  loadCategoryFailed,
  loadCategoryStart,
  loadCategorySuccess,
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

  // Category
  on(loadCategoryStart, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(loadCategorySuccess, (state, action) => {
    return {
      ...state,
      category: action.category,
      loading: false,
      error: null,
    };
  }),
  on(loadCategoryFailed, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
