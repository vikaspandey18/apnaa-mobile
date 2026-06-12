import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EventsService } from '../services/events.service';
import {
  getEventFailedAction,
  getEventStartAction,
  getEventSuccessAction,
  loadCategoryFailed,
  loadCategoryStart,
  loadCategorySuccess,
} from './event.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EventEffect {
  constructor(
    private actions$: Actions,
    private eventService: EventsService,
  ) {}

  getEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getEventStartAction),
      switchMap(() =>
        this.eventService.getEvents().pipe(
          map((response) => getEventSuccessAction({ events: response.data })),
          catchError((error) =>
            of(
              getEventFailedAction({
                error: error?.error?.message || error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  getCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCategoryStart),
      switchMap(() =>
        this.eventService.getAllCategory().pipe(
          map((response) => loadCategorySuccess({ category: response.data })),
          catchError((error) =>
            of(
              loadCategoryFailed({
                error: error?.error?.message || error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
