import * as fromIngresoEgreso from "./ingreso-egreso.actions";
import { dataIngresoEgreso } from "../types/types.models";

const estadoInicial: dataIngresoEgreso = {
  items: [],
};

export function ingresoEgresoReducer(
  state = estadoInicial,
  actions: fromIngresoEgreso.actions
): dataIngresoEgreso {
  switch (actions.type) {
    case fromIngresoEgreso.SETITEMS:
      return {
        items: [
          ...actions.items.map((item) => {
            return {
              ...item,
            };
          }),
        ],
      };

    case fromIngresoEgreso.UNSETITEMS:
      return {
        items: [],
      };

    default:
      return state;
  }
}
