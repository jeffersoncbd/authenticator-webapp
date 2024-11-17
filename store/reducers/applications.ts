import { ApiServices } from "@/services/api";
import { Application } from "@/services/api/interfaces";
import { createReducerWithSideEffect } from "../state";

const addApplication = createReducerWithSideEffect(
  "add-application",
  (state, payload: Application) => {
    if (state.applications !== undefined) {
      state.applications[payload.id] = payload
    }
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
    const applications: Record<string, Application> = {}
    payload.forEach((a) => (applications[a.id] = a));
    state.applications = applications
    state.loading = false;
  },
  (
    { state, sideEffect },
    { apiService, possibleErrorTitle }: { apiService: ApiServices, possibleErrorTitle: string }
  ) => {
    state.loading = true;
    apiService.applications
      .list()
      .then(sideEffect)
      .catch(
        apiService.defaultErrorHandler(possibleErrorTitle)
      );
  }
);

export const applicationsReducers = [addApplication, updateApplications];
