import {ActionReducerMap} from '@ngrx/store';
import {AuthState, initialAuthState} from './auth/auth.state';
import {AuthReducer} from './auth/auth.reducer';

export interface GlobalState {
  auth: AuthState;
}

export const initialGlobalState: GlobalState = {
  auth: initialAuthState
};

export const reducers: ActionReducerMap<GlobalState> = {
  auth: AuthReducer
};
