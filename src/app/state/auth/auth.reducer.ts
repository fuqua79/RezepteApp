import {AuthState, initialAuthState} from './auth.state';
import {clearAuthState, loginSuccess} from './auth.actions';
import {Action, createReducer, on} from '@ngrx/store';

const reducer = createReducer(
  initialAuthState,
  on(loginSuccess, (authState, {userId, userName, token, isAuthenticated, expirationDate}) => ({
    ...authState,
    userId: userId,
    userName: userName,
    token: token,
    isAuthenticated: isAuthenticated,
    expirationDate: expirationDate
  })),
  on(clearAuthState, () => (
    initialAuthState
  ))
);

export function authReducer(authState: AuthState | undefined, action: Action) {
  return reducer(authState, action);
}
