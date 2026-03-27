import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { EventsService } from './services/events.service';
import { getEventStartAction } from './state/event.actions';
import { eventErrorSelector, eventLoadingSelector, eventSelector } from './state/event.selectors';
import { Observable } from 'rxjs';
import { EventResponse } from 'src/app/models/event.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  events$: Observable<EventResponse[] | []>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  ngOnInit(): void {
    this.store.dispatch(getEventStartAction());
    this.events$ = this.store.select(eventSelector);
    this.loading$ = this.store.select(eventLoadingSelector);
    this.error$ = this.store.select(eventErrorSelector);  
  }

}
