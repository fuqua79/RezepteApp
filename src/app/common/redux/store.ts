import {INCREMENT} from "./actions";
import {DECREMENT} from "./actions";
import {Action} from "redux";

export interface IAppState {
  counter: number;
}

export const INITIAL_STATE: IAppState = {
  counter: 0
}
export function rootReducer(state: IAppState, action: Action) : IAppState {
  console.log(">>>> roorReducer()", action, state);
  switch(action.type){
    case INCREMENT:
      console.log(">>>> case INCREMENT");
      return {counter: state.counter +1};
    case DECREMENT:
      console.log(">>>> case DECREMENT");
      return {counter: state.counter -1};
  }
  //Default: alter State zurueckgeben
  return state;
}
