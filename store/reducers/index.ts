import {
  applicationsReducers,
  applicationsSideEffectsReducers,
} from "./application";

export const reducers = [...applicationsReducers];
export const sideEffectsReducers = [...applicationsSideEffectsReducers];
