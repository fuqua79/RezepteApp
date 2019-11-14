import {createFeatureSelector} from '@ngrx/store';
import {GlobalState} from '../state';
import {LoadingState} from './loading.state';

export const selectLoading = createFeatureSelector<GlobalState, LoadingState>('loading');
