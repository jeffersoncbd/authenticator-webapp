import { ApiServices } from "@/services/api";
import { Application } from "@/services/api/interfaces";
import { createReducer } from "..";

const updateApplications = createReducer(
  "update-applications",
  (store, dispatchSideEffect, apiService: ApiServices) => {
    store.loading = true;
    apiService.applications
      .list()
      .then((applications) => {
        dispatchSideEffect({
          type: "update-applications",
          payload: applications,
        });
      })
      .catch(
        apiService.defaultErrorHandler("Falha ao tentar listar aplicações")
      );
  }
);

const updateApplicationsSideEffect = createReducer(
  "update-applications",
  (state, _, payload: Application[]) => {
    state.loading = false;
    state.applications.list = payload;
  }
);

export const applicationsReducers = [updateApplications];
export const applicationsSideEffectsReducers = [updateApplicationsSideEffect];
