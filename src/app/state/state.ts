import {ActionReducerMap} from '@ngrx/store';
import {AuthState} from './auth/auth.state';
import {authReducer} from './auth/auth.reducer';

export interface GlobalState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<GlobalState> = {
  auth: authReducer
};
