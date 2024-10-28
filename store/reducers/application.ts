import { Application } from "@/services/api/interfaces";
import { createReducer } from "../store";

export const updateApplications = createReducer(
  "update-applications",
  () => {}
);

export const setUpdateApplications = createReducer(
  "set-update-applications",
  (state, payload: Application[]) => {
    state.applications.list = payload;
  }
);
