import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import { AppState } from './types/types.models';

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.loadingReducer,
    auth: fromAuth.authReducer
}