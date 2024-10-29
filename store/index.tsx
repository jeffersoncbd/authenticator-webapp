import { applicationsReducers, applicationsSideEffectsReducers } from "./reducers/application";
import { mountStore } from "./state";

export const { StoreProvider, useStoreActions, useStoreSelects } = mountStore(
    [...applicationsReducers],
    [...applicationsSideEffectsReducers]
)
