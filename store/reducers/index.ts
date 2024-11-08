import { createReducer } from "../state";
import { applicationsReducers } from "./application";

const setLoading = createReducer(
  "set-loading",
  ({ state }, { loading }: { loading: boolean }) => {
    state.loading = loading
  }
)

export const allReducers = [setLoading, ...applicationsReducers]

