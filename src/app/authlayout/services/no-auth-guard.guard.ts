import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthId } from '../state/auth.selectors';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuardGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(getAuthId).pipe(
      take(1),
      map((id) => {
        if (id) {
          return this.router.createUrlTree(['/', 'home']);
        } else {
          return true;
        }
      }),
    );
  }
}
