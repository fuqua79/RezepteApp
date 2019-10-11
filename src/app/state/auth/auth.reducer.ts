import {AuthState, initialAuthState} from './auth.state';
import {AuthActions} from './auth.actions';

export function AuthReducer(state: AuthState = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case 'LoginSuccessAction':
      return {
        ...state,
        userId: action.userId,
        userName: action.userName,
        token: action.token,
        isAuthenticated: action.isAuthenticated,
        expirationDate: action.expirationDate
      };

    case 'ClearAuthStateAction':
      return initialAuthState;

    default:
      return state;
  }
}
