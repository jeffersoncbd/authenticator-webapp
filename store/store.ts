import { Application } from "@/services/api/interfaces";
import { createStore } from ".";

interface State {
  applications: {
    list: Application[];
  };
}
const initialState: State = {
  applications: {
    list: [],
  },
};

export const { createReducer, mountProvider } = createStore(initialState);
