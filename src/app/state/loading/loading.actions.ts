import {createAction} from '@ngrx/store';

export const startLoading = createAction(
  '[GUI] Start Loading Action'
);

export const stopLoading = createAction(
  '[GUI] Stop Loading Action'
);
