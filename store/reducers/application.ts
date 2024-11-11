import { ApiServices } from "@/services/api";
import { Application } from "@/services/api/interfaces";
import { createReducerWithSideEffect } from "../state";

const addApplication = createReducerWithSideEffect(
  "add-application",
  (state, payload: Application) => {
    state.applications.list.push(payload)
    state.loading = false
  },
  (
    { state, sideEffect },
    { apiService, name, possibleErrorTitle }: { apiService: ApiServices, name: string, possibleErrorTitle: string }
  ) => {
    state.loading = true
    apiService.applications.save({ name })
      .then(({ id }) => sideEffect({ id, name }))
      .catch(apiService.defaultErrorHandler(possibleErrorTitle))
  }
)

const updateApplications = createReducerWithSideEffect(
  "update-applications",
  (state, payload: Application[]) => {
    state.applications.list = payload;
    state.loading = false;
  },
  (
    { state, sideEffect },
    { apiService }: { apiService: ApiServices }
  ) => {
    state.loading = true;
    apiService.applications
      .list()
      .then(sideEffect)
      .catch(
        apiService.defaultErrorHandler("Falha ao tentar listar aplicações")
      );
  }
);

export const applicationsReducers = [addApplication, updateApplications];
