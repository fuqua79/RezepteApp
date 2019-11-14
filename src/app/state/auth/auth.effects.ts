// Hier Effect schreiben, welcher beim Auth-Store dispatchen alle Daten in den local Storage schreibt !!
// Folgende types abfangen:
// ClearAuthStateAction
// LoginSuccessAction

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../service/auth.service';
import {catchError, concatMap, map} from 'rxjs/operators';
import {login, loginSuccess} from './auth.actions';
import {EMPTY} from 'rxjs/internal/observable/empty';

@Injectable({providedIn: 'root'})
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      concatMap(action => this.authServices.justLogin(action.credentials.email, action.credentials.password).pipe(
        map(result => loginSuccess({
          userId: result.userId,
          userName: action.credentials.email,
          token: result.token,
          isAuthenticated: true,
          expirationDate: new Date(new Date().getTime() + result.expiresIn * 1000)
        })),
        catchError(error => EMPTY))
      )
    )
  );

  constructor(private actions$: Actions, private authServices: AuthService) {
  }
}
