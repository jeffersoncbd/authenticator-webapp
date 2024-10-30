/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { createContext, useContext, useReducer } from "react";

export function initState<State>(initialState: State) {

    type SideEffect<P> = (
        state: State,
        payload: P
    ) => void;
    type Reducer<P, SEP = undefined> = (
        store: {
            state: State,
            sideEffect: (payload: SEP) => void
        },
        payload: P
    ) => void;

    function createReducer<T extends string, P>(
        type: `${T}`,
        reducer: Reducer<P>,
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

    function createReducerWithSideEffect<T extends string, P, SEP>(
        type: `${T}`,
        sideEffect: (state: State, payload: SEP) => void,
        reducer: Reducer<P, SEP>,
    ): {
        action: P extends undefined ? { type: `${T}` } : { type: `${T}`; payload: P };
        reducer: Reducer<P, SEP>;
        sideEffectAction: SEP extends undefined ? { type: `${T}` } : { type: `${T}`; payload: SEP };
        sideEffect: (state: State, payload: SEP) => void
    } {
        return {
            action: { type, payload: null } as unknown as P extends undefined
                ? { type: `${T}` }
                : { type: `${T}`; payload: P },
            reducer,
            sideEffectAction: { type, payload: null } as unknown as SEP extends undefined
                ? { type: `${T}` }
                : { type: `${T}`; payload: SEP },
            sideEffect
        };
    }

    function mountStore<T extends string, P, SEP>(
        reducers: ReturnType<typeof createReducer<T, P>>[],
        sideEffects: ReturnType<typeof createReducerWithSideEffect<T, P, SEP>>[]
    ) {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const reducerActions = reducers.map((r) => r.action);
        type ReducerActions = (typeof reducerActions)[number];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const sideEffectActions = sideEffects.map((r) => r.sideEffectAction);
        type SideEffectActions = (typeof sideEffectActions)[number];
        type Actions = ReducerActions | SideEffectActions;

        const StoreContext = createContext<{
            state: State;
            dispatch: React.Dispatch<Actions>;
        }>({
            state: initialState,
            dispatch: () => undefined,
        });

        function useStoreActions() {
            const { dispatch } = useContext(StoreContext);
            return (action: Actions) => dispatch(action);
        }

        function useStoreSelects<T>(query: (state: State) => T): T {
            const { state } = useContext(StoreContext);
            return query(state);
        }

        const reducersMap: Record<string, Reducer<P>> = {};
        const sideEffectsMap: Record<string, SideEffect<SEP>> = {};
        reducers.forEach((item) => {
            reducersMap[item.action.type] = item.reducer;
        });
        sideEffects.forEach((item) => {
            reducersMap[item.action.type] = item.reducer as Reducer<P>;
            sideEffectsMap[`side-effect-${item.action.type}`] = item.sideEffect;
        });

        const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
            const [state, dispatch] = useReducer((state: State, action: Actions): State => {
                const newState = { ...state }
                if (!action.type.startsWith('side-effect-')) {
                    reducersMap[action.type]({
                        state, sideEffect: (payload) => {
                            dispatch({ type: `side-effect-${action.type}`, payload } as Actions)
                        }
                    }, (action as unknown as any).payload)
                } else {
                    sideEffectsMap[action.type](newState, (action as unknown as any).payload)
                }
                return newState
            }, initialState);
            return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
        };
        return { StoreProvider, useStoreActions, useStoreSelects }
    }
    return { createReducer, createReducerWithSideEffect, mountStore }
}