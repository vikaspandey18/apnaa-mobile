import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TicketService } from '../services/ticket.service';
import {
  loadTicketAction,
  loadTicketFailedAction,
  loadTicketSuccessAction,
} from './ticket.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TicketEffect {
  constructor(
    private action$: Actions,
    private ticketServices: TicketService,
  ) {}

  getTicket$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadTicketAction),
      switchMap((action) => {
        return this.ticketServices.getEventTicket(action.id).pipe(
          map((response) => {
            return loadTicketSuccessAction({ tickets: response.data });
          }),
          catchError((error) => {
            return of(
              loadTicketFailedAction({
                error: error.error.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });
}
