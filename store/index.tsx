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
export function createSideEffect<T extends string, P = undefined>(
  type: `${T}`,
  reducer: Reducer<P>
) {
  return createReducer(`side-effect-${type}`, reducer)
}

const reducers = [...applicationsReducers]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const actions = reducers.map((r) => r.action)
type Actions = typeof actions[number]

const sideEffectsReducers = [...applicationsSideEffectsReducers]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sideEffectsActions = sideEffectsReducers.map((r) => r.action)
type SideEffectsActions = typeof sideEffectsActions[number]

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

type SideEffect = (action: SideEffectsActions) => void
let dispatchSideEffect: SideEffect = () => undefined

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer((state: State, action: Actions | SideEffectsActions): State => {
    const newState = { ...state }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducersMap[action.type](newState, (action as unknown as any).payload)
    return newState
  }, initialState);

  dispatchSideEffect = (action) => dispatch(action)

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export { dispatchSideEffect };

