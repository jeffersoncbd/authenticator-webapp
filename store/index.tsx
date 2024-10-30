'use client'

import { applicationsReducersWithSideEffects } from "./reducers/application";
import { mountStore } from "./state";

export const { StoreProvider, useStoreActions, useStoreSelects } = mountStore(
    [],
    [...applicationsReducersWithSideEffects]
)
