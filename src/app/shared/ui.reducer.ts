import { State } from '../types/types';
import * as fromUI from "./ui.actions";

const initState: State = {
  isLoading: false,
};

export function loadingReducer(state = initState, action: fromUI.actions):State {
  switch (action.type) {
    case fromUI.ACTIVAR_LOADING:
      return {
        isLoading: true,
      };

    case fromUI.DESACTIVAR_LOADING:
      return {
        isLoading: false,
      };

    default:
      return state;
  }
}
