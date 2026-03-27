import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { getLoggedUser } from './authlayout/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private store: Store,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.activatedRoute;

        while (route.firstChild) {
          route = route.firstChild;
        }

        route.data.subscribe((data) => {
          if (data.title) {
            this.titleService.setTitle(data.title);
          }
        });
      });
  }

  ngOnInit(): void {
    this.store.dispatch(getLoggedUser());
  }
}
