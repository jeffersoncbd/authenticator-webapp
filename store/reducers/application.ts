import { ApiServices } from "@/services/api";
import { Application } from "@/services/api/interfaces";
import { createReducerWithSideEffect } from "../state";

const updateApplications = createReducerWithSideEffect(
  "update-applications",
  (state, payload: Application[]) => {
    state.loading = false;
    state.applications.list = payload;
  },
  ({ state, sideEffect }, { apiService }: { apiService: ApiServices }) => {
    state.loading = true;
    apiService.applications
      .list()
      .then(sideEffect)
      .catch(
        apiService.defaultErrorHandler("Falha ao tentar listar aplicações")
      );
  }
);

export const applicationsReducers = [updateApplications];
