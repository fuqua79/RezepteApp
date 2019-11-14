import {ActionReducerMap} from '@ngrx/store';
import {AuthState} from './auth/auth.state';
import {authReducer} from './auth/auth.reducer';
import {LoadingState} from './loading/loading.state';
import {loadingReducer} from './loading/loading.reducer';

export interface GlobalState {
  auth: AuthState,
  loading: LoadingState
}

export const reducers: ActionReducerMap<GlobalState> = {
  auth: authReducer,
  loading: loadingReducer
};
