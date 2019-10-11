import {Action} from '@ngrx/store';

export class LoginSuccessAction implements Action {
  readonly type = 'LoginSuccessAction';

  constructor(public readonly userId: string,
              public readonly userName: string,
              public readonly token: string,
              public readonly isAuthenticated: boolean,
              public readonly expirationDate: Date) {
  }
}

export class ClearAuthStateAction implements Action {
  readonly type = 'ClearAuthStateAction';

  constructor() {
  }
}

export type AuthActions = LoginSuccessAction | ClearAuthStateAction;
