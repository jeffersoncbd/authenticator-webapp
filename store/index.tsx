'use client'

import { Application } from "@/services/api/interfaces";
import React, { createContext, useReducer } from "react";
import { applicationsReducers } from "./reducers/application";

interface State {
  loading: boolean;
  applications: {
    list: Application[];
  };
}
const initialState: State = {
  loading: false,
  applications: {
    list: [],
  },
};

type Reducer<P> = (state: State, payload: P) => void
export function createReducer<T extends string, P = undefined>(
  type: `${T}`,
  reducer: Reducer<P>
): {
  action: P extends undefined ? { type: `${T}` } : { type: `${T}`; payload: P };
  reducer: Reducer<P>;
} {
  return {
    action: { type, payload: null } as unknown as P extends undefined
      ? { type: `${T}` }
      : { type: `${T}`; payload: P },
    reducer,
  };
}

const reducers = [...applicationsReducers]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const actions = reducers.map((r) => r.action)
type Actions = typeof actions[number]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducersMap: Record<string, Reducer<any>> = {}
reducers.forEach((item) => {
  reducersMap[item.action.type] = item.reducer
})

export function useStoreActions() {
  const { dispatch } = React.useContext(StoreContext);
  return (action: Actions) => dispatch(action);
}

export function useStoreSelects<T>(query: (state: State) => T): T {
  const { state } = React.useContext(StoreContext)
  return query(state)
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer((state: State, action: Actions): State => {
    const newState = { ...state }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducersMap[action.type](newState, (action as unknown as any).payload)
    return newState
  }, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};
