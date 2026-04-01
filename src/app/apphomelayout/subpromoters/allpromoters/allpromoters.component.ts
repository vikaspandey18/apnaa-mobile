import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PromoterModel } from 'src/app/models/promoter.model';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import {
  selectAllPromoter,
  selectPromoterError,
  selectPromoterLoading,
} from '../state/promoter.selectors';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-allpromoters',
  templateUrl: './allpromoters.component.html',
  styleUrls: ['./allpromoters.component.scss'],
})
export class AllpromotersComponent implements OnInit {
  constructor(private store: Store) {}

  allPromoters$!: Observable<PromoterModel[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.allPromoters$ = this.store.select(selectAllPromoter);
    this.loading$ = this.store.select(selectPromoterLoading);
    this.error$ = this.store.select(selectPromoterError);
  }
}
