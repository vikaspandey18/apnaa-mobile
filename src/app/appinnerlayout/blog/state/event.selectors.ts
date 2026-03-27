import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventState } from './event.state';

const getEventFeatureSelector = createFeatureSelector<EventState>('events');

export const eventSelector = createSelector(
  getEventFeatureSelector,
  (state) => {
    return state.events;
  },
);

export const eventLoadingSelector = createSelector(
  getEventFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const eventErrorSelector = createSelector(
  getEventFeatureSelector,
  (state) => {
    return state.error;
  },
);
