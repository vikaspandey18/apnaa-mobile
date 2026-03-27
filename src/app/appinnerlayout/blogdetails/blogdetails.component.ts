import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadTicketAction } from './state/ticket.actions';

import {
  selectAllTicket,
  selectErrorTicket,
  selectLoadingTicket,
} from './state/ticket.selectors';
import { Observable } from 'rxjs';
import { TicketRespone } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss'],
})
export class BlogdetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {}

  tickets$: Observable<TicketRespone[] | []>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  getAvailableTickets(ticket: TicketRespone): number {
    return (ticket.total_tickets || 0) - (ticket.sold_tickets || 0);
  }

  ngOnInit() {
    this.tickets$ = this.store.select(selectAllTicket);
    this.loading$ = this.store.select(selectLoadingTicket);
    this.error$ = this.store.select(selectErrorTicket);

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.store.dispatch(loadTicketAction({ id }));
      }
    });
  }
}
