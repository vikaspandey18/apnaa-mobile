import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { EventsService } from './services/events.service';
import { getEventStartAction, loadCategoryStart } from './state/event.actions';
import {
  eventErrorSelector,
  eventLoadingSelector,
  eventSelector,
  selectCategory,
} from './state/event.selectors';
import { Observable } from 'rxjs';
import { EventResponse } from 'src/app/models/event.model';
import { CategoryModel } from 'src/app/models/category.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  events$: Observable<EventResponse[] | []>;
  category$: Observable<CategoryModel[] | []>;
  filteredEvents$: Observable<EventResponse[]>;

  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  selectedCategoryId: string | null = null;

  ngOnInit(): void {
    this.store.dispatch(getEventStartAction());
    this.store.dispatch(loadCategoryStart());
    this.events$ = this.store.select(eventSelector);
    this.category$ = this.store.select(selectCategory);
    this.loading$ = this.store.select(eventLoadingSelector);
    this.error$ = this.store.select(eventErrorSelector);

    this.filteredEvents$ = this.events$;
  }

  filterByCategory(categoryId: string): void {
    this.selectedCategoryId = categoryId;

    this.filteredEvents$ = this.events$.pipe(
      map((events) => events.filter((event) => event.category === categoryId)),
    );
  }

  showAll(): void {
    this.selectedCategoryId = null;
    this.filteredEvents$ = this.events$;
  }
}
