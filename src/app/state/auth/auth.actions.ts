import {createAction, props} from '@ngrx/store';
import {Credentials} from '../../model/credentials';

export const login = createAction(
  '[Login Page] Login User',
  props<{
    credentials: Credentials
  }>()
);

export const loginSuccess = createAction(
  '[Auth Effect Login] LoginSuccessAction',
  props<{
    userId: string,
    userName: string,
    token: string,
    isAuthenticated: boolean,
    expirationDate: Date
  }>()
);

export const loginSuccessAutoLogin = createAction(
  '[Auth Service AutoLogin] LoginSuccessAction',
  props<{
    userId: string,
    userName: string,
    token: string,
    isAuthenticated: boolean,
    expirationDate: Date
  }>()
);

export const clearAuthStateLogout = createAction(
  '[Auth Service logout] ClearAuthStateAction'
);

export const clearAuthStateCreateUserFailure = createAction(
  '[Auth Service createUser Failure] ClearAuthStateAction'
);
