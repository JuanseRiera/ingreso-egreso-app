import * as fromAuth from './auth.actions';
import { AuthState } from '../types/types.models';

export function authReducer(state:AuthState,action:fromAuth.actions):AuthState{

    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: {... action.user}
            };
        
        case fromAuth.UNSET_USER:
            return {
                user:null
            };
    
        default:
            return state;
    }
}