import React from "react";
import { StoreContext } from ".";
import { Actions } from "./reducers";
import { State } from "./state";

export function useStoreActions() {
  const { dispatch } = React.useContext(StoreContext);
  return (action: Actions) => dispatch(action);
}

export function useStoreSelects<T>(query: (state: State) => T): T {
  const { state } = React.useContext(StoreContext);
  return query(state);
}
