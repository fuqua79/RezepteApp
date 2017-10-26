import {INCREMENT} from "./actions";
import {StoreEnhancer} from "redux";

export interface IAppState {
  counter: number;
}

export const INITIAL_STATE: IAppState = {
  counter: 0
}
export function rootReducer(state: IAppState, action) : IAppState {
  console.log(">>>> roorReducer()", action, state);
  switch(action.type){
    case INCREMENT:
      console.log(">>>> case INCREMENT");
      return {counter: state.counter +1};
  }
  return state;
}
