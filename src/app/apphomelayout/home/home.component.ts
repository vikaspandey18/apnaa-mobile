import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoggedUser } from 'src/app/authlayout/state/auth.actions';
import {
  getAuthMobileState,
  getAuthNameState,
} from 'src/app/authlayout/state/auth.selectors';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isChecked: boolean = false;

  constructor(private store: Store) {}

  username$!: Observable<string | null>;
  mobile$!: Observable<string | null>;

  ngOnInit(): void {
    
    this.username$ = this.store.select(getAuthNameState);
    this.mobile$ = this.store.select(getAuthMobileState);
  }

  ngAfterInit() {}
  doCheck() {
    let html = document.getElementsByTagName('html')[0];
    this.isChecked = !this.isChecked;
    if (this.isChecked == true) {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }
  }
}
