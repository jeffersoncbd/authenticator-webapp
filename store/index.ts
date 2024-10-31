"use client";

import { applicationsReducers } from "./reducers/application";
import { mountStore } from "./state";

const allReducers = [...applicationsReducers];

const actions = allReducers.map((r) => r.action);
const reducers = allReducers.map((r) => r.reducer);
const sideEffects = allReducers
  .map((r) => r.reducer.sideEffect)
  .filter((se) => se !== undefined);

export const { StoreProvider, useStoreActions, useStoreSelects } = mountStore(
  reducers,
  actions,
  sideEffects
);
