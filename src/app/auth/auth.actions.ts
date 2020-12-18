import { Action } from "@ngrx/store";
import { User } from '../types/types';

export const SET_USER = '[AUTH] Set user';

export class SetUser implements Action{
    type= SET_USER;

    constructor(public user:User){
    }
}

export type actions = SetUser;