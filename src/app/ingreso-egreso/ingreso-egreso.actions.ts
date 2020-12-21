import { Action } from "@ngrx/store";
import { IngresoEgreso } from '../types/types.models';

export const SETITEMS = "[Ingreso Egreso] Set items";
export const UNSETITEMS = "[Ingreso Egreso] Unset items";

export class setItems implements Action{
    readonly type=SETITEMS;
    constructor(public items: Array<IngresoEgreso>){}
}

export class unsetItems implements Action{
    readonly type=UNSETITEMS;
}

export type actions=setItems | unsetItems;