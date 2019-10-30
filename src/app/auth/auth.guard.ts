import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';

import {AuthService} from '../service/auth.service';
import {GlobalState} from '../state/state';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<GlobalState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.store.select(authState => authState.auth.isAuthenticated);
    if (!isAuth) {
      this.router.navigate(['/auth/login']);
    }
    return isAuth;
  }
}
