import { createReducer, on } from '@ngrx/store';
import { initialState } from './promoter.state';
import {
  loadPromoterFailedAction,
  loadPromoterStartAction,
  loadPromoterSuccessAction,
} from './promoter.actions';

export const promoterReducer = createReducer(
  initialState,
  on(loadPromoterStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(loadPromoterSuccessAction, (state, action) => {
    return {
      ...state,
      promoters: action.promoters,
      loading: false,
    };
  }),
  on(loadPromoterFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
