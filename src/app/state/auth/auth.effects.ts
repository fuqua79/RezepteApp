// Hier Effect schreiben, welcher beim Auth-Store dispatchen alle Daten in den local Storage schreibt !!
// Folgende types abfangen:
// ClearAuthStateAction
// LoginSuccessAction

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../service/auth.service';
import {LOGIN_SUCCESSS_ACTION} from './auth.actions';
import {map} from 'rxjs/operators';
import {AuthState} from './auth.state';

@Injectable({providedIn: 'root'})
export class AuthEffects {
  loginSucess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LOGIN_SUCCESSS_ACTION),
        map((action: any) => {
          const authState: AuthState = {
            userId: action.userId,
            userName: action.userName,
            token: action.token,
            isAuthenticated: action.isAuthenticated,
            expirationDate: action.expirationDate
          };
          this.authServices.saveAuthData(authState);
        })
      ),
    {dispatch: false}
  );

  constructor(private actions$: Actions,
              private authServices: AuthService) {

  }
}
