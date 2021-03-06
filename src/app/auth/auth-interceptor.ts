import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {AuthService} from '../service/auth.service';
import {GlobalState} from '../state/state';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private store: Store<GlobalState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authToken = '';
    this.store.subscribe(state => authToken = state.auth.token);
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }
}
