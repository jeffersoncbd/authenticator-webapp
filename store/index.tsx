'use client'

import React, { createContext, useReducer } from "react";
import { Reducer } from "./helpers";
import { reducers, sideEffectsReducers } from "./reducers";
import { initialState, State } from "./state";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const actions = reducers.map((r) => r.action);
export type Actions = (typeof actions)[number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sideEffectsActions = sideEffectsReducers.map((r) => r.action);
export type SideEffectsActions = (typeof sideEffectsActions)[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducersMap: Record<string, Reducer<any>> = {};
reducers.forEach((item) => {
  reducersMap[item.action.type] = item.reducer;
});
sideEffectsReducers.forEach((item) => {
  reducersMap[`side-effect-${item.action.type}`] = item.reducer;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

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
