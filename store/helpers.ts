import { SideEffectsActions } from "./reducers";
import { State } from "./state";

type SideEffect = (action: SideEffectsActions) => void;
export type Reducer<P = undefined> = (
  store: { state: State; dispatchSideEffect: SideEffect },
  payload: P
) => void;

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
