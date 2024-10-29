'use client'

import { Application } from "@/services/api/interfaces";
import React, { createContext, useReducer } from "react";
import { applicationsReducers, applicationsSideEffectsReducers } from "./reducers/application";

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

const reducers = [...applicationsReducers]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const actions = reducers.map((r) => r.action)
type Actions = typeof actions[number]

const sideEffectsReducers = [...applicationsSideEffectsReducers]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sideEffectsActions = sideEffectsReducers.map((r) => r.action)
type SideEffectsActions = typeof sideEffectsActions[number]

type SideEffect = (action: SideEffectsActions) => void

type Reducer<P> = (store: { state: State, dispatchSideEffect: SideEffect }, payload: P) => void

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
sideEffectsReducers.forEach((item) => {
  reducersMap[`side-effect-${item.action.type}`] = item.reducer
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
  const [state, dispatch] = useReducer((state: State, action: Actions | SideEffectsActions): State => {
    const newState = { ...state }
    reducersMap[action.type](
      {
        state: newState,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dispatchSideEffect: (action: SideEffectsActions) => dispatch({ type: `side-effect-${action.type}`, payload: (action as unknown as any).payload } as unknown as Actions)
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (action as unknown as any).payload)
    return newState
  }, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};
