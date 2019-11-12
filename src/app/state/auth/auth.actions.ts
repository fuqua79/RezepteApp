import {createAction, props} from '@ngrx/store';

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

export const clearAuthState = createAction(
  '[Auth] ClearAuthStateAction'
);
