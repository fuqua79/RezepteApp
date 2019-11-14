import {AuthState, initialAuthState} from './auth.state';
import {clearAuthStateCreateUserFailure, clearAuthStateLogout, loginSuccess, loginSuccessAutoLogin} from './auth.actions';
import {Action, createReducer, on} from '@ngrx/store';

const reducer = createReducer(
  initialAuthState,
  on(loginSuccess, loginSuccessAutoLogin,
    (authState, {userId, userName, token, isAuthenticated, expirationDate}) => ({
      ...authState,
      userId: userId,
      userName: userName,
      token: token,
      isAuthenticated: isAuthenticated,
      expirationDate: expirationDate
    })),
  on(clearAuthStateLogout,
    clearAuthStateCreateUserFailure,
    () => initialAuthState
  )
);

export function authReducer(authState: AuthState | undefined, action: Action) {
  return reducer(authState, action);
}
