'use client'

import { applicationsReducers, applicationsSideEffectsReducers } from "./reducers/application";
import { mountStore } from "./state";

export const { StoreProvider, useStoreActions, useStoreSideEffects, useStoreSelects } = mountStore(
    [...applicationsReducers],
    [...applicationsSideEffectsReducers]
)

export type SideEffects = ReturnType<typeof useStoreSideEffects>
