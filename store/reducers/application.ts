import { ApiServices } from "@/services/api";
import { createReducer } from "..";

const updateApplications = createReducer(
  "update-applications",
  (state, apiService: ApiServices) => {
    apiService.applications
      .list()
      .then((applications) => {
        state.applications.list = applications;
      })
      .catch(
        apiService.defaultErrorHandler("Falha ao tentar listar aplicações")
      );
  }
);

export const applicationsReducers = [updateApplications];
