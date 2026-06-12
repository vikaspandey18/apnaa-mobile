import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBannerStart } from './state/banner.actions';
import { Observable } from 'rxjs';
import { BannerModel } from 'src/app/models/banner.model';
import {
  selectBanners,
  selectErrorBanners,
  selectLoadingBanners,
} from './state/banner.selectors';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  public isVisited = false;
  checkVisited() {
    this.isVisited = !this.isVisited;
  }

  constructor(private store: Store) {}

  allBanners$!: Observable<BannerModel[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.store.dispatch(loadBannerStart());

    this.allBanners$ = this.store.select(selectBanners);
    this.loading$ = this.store.select(selectLoadingBanners);
    this.error$ = this.store.select(selectErrorBanners);
  }
}
