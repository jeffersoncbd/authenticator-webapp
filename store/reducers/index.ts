import { Reducer } from "../helpers";
import {
  applicationsReducers,
  applicationsSideEffectsReducers,
} from "./application";

const reducers = [...applicationsReducers];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const actions = reducers.map((r) => r.action);
export type Actions = (typeof actions)[number];

const sideEffectsReducers = [...applicationsSideEffectsReducers];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sideEffectsActions = sideEffectsReducers.map((r) => r.action);
export type SideEffectsActions = (typeof sideEffectsActions)[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducersMap: Record<string, Reducer<any>> = {};
reducers.forEach((item) => {
  reducersMap[item.action.type] = item.reducer;
});
sideEffectsReducers.forEach((item) => {
  reducersMap[`side-effect-${item.action.type}`] = item.reducer;
});

export { reducersMap };
