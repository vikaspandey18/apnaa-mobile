import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { PromoterModel } from 'src/app/models/promoter.model';
import {
  selectAllPromoter,
  selectPromoterError,
  selectPromoterLoading,
} from './state/promoter.selectors';
import { loadPromoterStartAction } from './state/promoter.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subpromoters',
  templateUrl: './subpromoters.component.html',
  styleUrls: ['./subpromoters.component.scss'],
})
export class SubpromotersComponent implements OnInit {
  constructor(private store: Store) {}

  allPromoters$!: Observable<PromoterModel[] | []>;
  loading$!: Observable<boolean>;
  error$: Observable<string | null>;

  private searchTerm$ = new BehaviorSubject<string>('');
  filteredPromoters$!: Observable<PromoterModel[] | []>;

  ngOnInit(): void {
    this.store.dispatch(loadPromoterStartAction());

    this.allPromoters$ = this.store.select(selectAllPromoter);
    this.loading$ = this.store.select(selectPromoterLoading);
    this.error$ = this.store.select(selectPromoterError);

    // combine search term with promoters list
    this.filteredPromoters$ = combineLatest([
      this.allPromoters$,
      this.searchTerm$,
    ]).pipe(
      map(([promoters, term]) =>
        promoters.filter((p) => {
          const name = p?.name?.toLowerCase() || '';
          const mobile = p?.mobile?.toLowerCase() || '';
          const search = term.toLowerCase();

          return name.includes(search) || mobile.includes(search);
        }),
      ),
    );
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm$.next(input.value);
  }
}
