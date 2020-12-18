import { Action } from "@ngrx/store";

export const ACTIVAR_LOADING='[LOADING] Activar loading';
export const DESACTIVAR_LOADING='[LOADING] Fin de loading';

export class ActivarLoadingAction implements Action{
    readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoadingAction implements Action{
    readonly type = DESACTIVAR_LOADING;
}

export type actions = ActivarLoadingAction | DesactivarLoadingAction; 