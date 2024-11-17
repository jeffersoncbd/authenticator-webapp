import { createReducer } from "../state";
import { applicationsReducers } from "./applications";
import { groupsReducers } from "./groups";

const setLoading = createReducer(
  "set-loading",
  ({ state }, { loading }: { loading: boolean }) => {
    state.loading = loading
  }
)

export const allReducers = [setLoading, ...applicationsReducers, ...groupsReducers]

