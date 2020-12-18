import * as fromAuth from './auth.actions';
import { AuthState } from '../types/types';

export function authReducer(state:AuthState,action:fromAuth.actions):AuthState{

    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: {... action.user}
            };
    
        default:
            return state;
    }
}