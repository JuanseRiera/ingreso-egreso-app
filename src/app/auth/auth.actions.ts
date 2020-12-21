import { Action } from "@ngrx/store";
import { User } from '../types/types.models';

export const SET_USER = '[AUTH] Set user';
export const UNSET_USER = '[AUTH] Unset user';

export class SetUser implements Action{
    readonly type= SET_USER;

    constructor(public user:User){
    }
}

export class UnsetUser implements Action{
    readonly type= UNSET_USER;
}

export type actions = SetUser | UnsetUser;