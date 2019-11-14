import {Action, createReducer, on} from '@ngrx/store';
import {initialLoadinghState, LoadingState} from './loading.state';
import {startLoading, stopLoading} from './loading.actions';

const reducer = createReducer(
  initialLoadinghState,
  on(startLoading, () => ({
    isLoading: true
  })),
  on(stopLoading, () => ({
    isLoading: false
  })),
);

export function loadingReducer(loadingState: LoadingState | undefined, action: Action) {
  return reducer(loadingState, action);
}
