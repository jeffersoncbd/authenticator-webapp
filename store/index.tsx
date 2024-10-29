'use client'

import React, { createContext, useReducer } from "react";
import { Actions, reducersMap, SideEffectsActions } from "./reducers";
import { initialState, State } from "./state";



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
