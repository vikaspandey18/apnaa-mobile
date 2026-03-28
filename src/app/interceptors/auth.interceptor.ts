import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { getAuthId } from '../authlayout/state/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(getAuthId).pipe(
      take(1),
      switchMap((authId) => {
        let modifiedReq = request;
        if (authId) {
          modifiedReq = request.clone({
            setHeaders: {
              'X-Auth-Id': authId, // 🔥 add id in header
            },
          });
        }
        return next.handle(modifiedReq);
      }),
    );
  }
}
