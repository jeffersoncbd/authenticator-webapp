'use client'

import { createContext, useContext, useReducer } from "react";

export function initState<State>(initialState: State) {

    type Reducer<P = undefined> = (
        state: State,
        payload: P
    ) => void;

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

    function mountStore<RT extends string, RP, ST extends string, SP>(
        reducers: ReturnType<typeof createReducer<RT, RP>>[],
        sideEffectsReducers: ReturnType<typeof createReducer<ST, SP>>[]
    ) {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const actions = reducers.map((r) => r.action);
        type Actions = (typeof actions)[number];

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const sideEffectsActions = sideEffectsReducers.map((r) => r.action);
        type SideEffectsActions = (typeof sideEffectsActions)[number];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        function useStoreSideEffects() {
            const { dispatch } = useContext(StoreContext);
            return (action: SideEffectsActions) =>
                dispatch({
                    type: `side-effect-${action.type}`,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    payload: (action as unknown as any).payload
                } as unknown as Actions);
        }

        function useStoreSelects<T>(query: (state: State) => T): T {
            const { state } = useContext(StoreContext);
            return query(state);
        }

        const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
            const [state, dispatch] = useReducer((state: State, action: Actions | SideEffectsActions): State => {
                const newState = { ...state }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const reducersMap: Record<string, Reducer<any>> = {};
                reducers.forEach((item) => {
                    reducersMap[item.action.type] = item.reducer;
                });
                sideEffectsReducers.forEach((item) => {
                    reducersMap[`side-effect-${item.action.type}`] = item.reducer;
                });

                reducersMap[action.type](
                    newState,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (action as unknown as any).payload)
                return newState
            }, initialState);

            return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
        };

        return { StoreProvider, useStoreActions, useStoreSideEffects, useStoreSelects }

    }

    return { createReducer, mountStore }
}