import { ApiServices } from "@/services/api";
import { Application } from "@/services/api/interfaces";
import { createReducer, createSideEffect, dispatchSideEffect } from "..";

const updateApplications = createReducer(
  "update-applications",
  (store, apiService: ApiServices) => {
    store.loading = true;
    apiService.applications
      .list()
      .then((applications) => {
        dispatchSideEffect({
          type: "side-effect-update-applications",
          payload: applications,
        });
      })
      .catch(
        apiService.defaultErrorHandler("Falha ao tentar listar aplicações")
      );
  }
);

const updateApplicationsSideEffect = createSideEffect(
  "update-applications",
  (state, payload: Application[]) => {
    state.loading = false;
    state.applications.list = payload;
  }
);

export const applicationsReducers = [updateApplications];
export const applicationsSideEffectsReducers = [updateApplicationsSideEffect];
