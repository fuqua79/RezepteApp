import {createFeatureSelector} from '@ngrx/store';
import {GlobalState} from '../state';
import {AuthState} from './auth.state';

export const selectAuth = createFeatureSelector<GlobalState, AuthState>('auth');
