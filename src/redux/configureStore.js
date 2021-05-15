import { createStore } from "redux";
import { initialState, reducer } from "./reducer";

const ConfigureStore = () => {
  const store = createStore(reducer, initialState);
  return store;
};

export const store = ConfigureStore();
