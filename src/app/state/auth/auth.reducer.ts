import {AuthState, initialAuthState} from './auth.state';
import {AuthActions, CLEAR_LOGIN_ACTION, LOGIN_SUCCESSS_ACTION} from './auth.actions';

export function AuthReducer(state: AuthState = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case LOGIN_SUCCESSS_ACTION:
      return {
        ...state,
        userId: action.userId,
        userName: action.userName,
        token: action.token,
        isAuthenticated: action.isAuthenticated,
        expirationDate: action.expirationDate
      };

    case CLEAR_LOGIN_ACTION:
      return initialAuthState;

    default:
      return state;
  }
}
