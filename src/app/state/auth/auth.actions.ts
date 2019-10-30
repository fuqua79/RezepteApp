import {Action} from '@ngrx/store';

export const LOGIN_SUCCESSS_ACTION = '[Auth] LoginSuccessAction';
export const CLEAR_LOGIN_ACTION = '[Auth] ClearAuthStateAction';

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESSS_ACTION;

  constructor(public readonly userId: string,
              public readonly userName: string,
              public readonly token: string,
              public readonly isAuthenticated: boolean,
              public readonly expirationDate: Date) {
  }
}

export class ClearAuthStateAction implements Action {
  readonly type = CLEAR_LOGIN_ACTION;

  constructor() {
  }
}

export type AuthActions = LoginSuccessAction | ClearAuthStateAction;
