'use client'

import React, { createContext, useReducer } from "react";

export function createStore<State>(initialState: State) {
  type Reducer<P> = (state: State, payload: P) => void
  function createReducer<T extends string, P = undefined>(
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
  function mountProvider<Actions extends { type: string }>(reducers: any[]) {
    const Context = createContext<{
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

    function useStoreActions() {
      const { dispatch } = React.useContext(Context);
      return (action: Actions) => dispatch(action);
    }

    function useStoreSelects<T>(query: (state: State) => T): T {
      const { state } = React.useContext(Context)
      return query(state)
    }

    const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [state, dispatch] = useReducer((state: State, action: Actions): State => {
        const newState = { ...state }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reducersMap[action.type](newState, (action as unknown as any).payload)
        return newState
      }, initialState);

      return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
    };

    return { useStoreActions, useStoreSelects, Provider }
  }

  return { createReducer, mountProvider }
}
