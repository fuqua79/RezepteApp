import {createAction, props} from '@ngrx/store';
import {Credentials} from '../../model/credentials';

export const loginSuccess = createAction(
  '[Auth] LoginSuccessAction',
  props<{
    userId: string,
    userName: string,
    token: string,
    isAuthenticated: boolean,
    expirationDate: Date
  }>()
);

export const login = createAction(
  '[Login Page] Login User',
  props<{
    credentials: Credentials
  }>()
);

export const clearAuthState = createAction(
  '[Auth] ClearAuthStateAction'
);
