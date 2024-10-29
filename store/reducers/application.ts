import { ApiServices } from "@/services/api";
import { Application } from "@/services/api/interfaces";
import { createReducer } from "../state";

const updateApplications = createReducer(
  "update-applications",
  (state, apiService: ApiServices) => {
    state.loading = true;
    apiService.applications
      .list()
      .then((applications) => {
        console.log(applications);
        // dispatchSideEffect({
        //   type: "update-applications",
        //   payload: applications,
        // });
      })
      .catch(
        apiService.defaultErrorHandler("Falha ao tentar listar aplicações")
      );
  }
);

const updateApplicationsSideEffect = createReducer(
  "update-applications",
  (state, payload: Application[]) => {
    state.loading = false;
    state.applications.list = payload;
  }
);

export const applicationsReducers = [updateApplications];
export const applicationsSideEffectsReducers = [updateApplicationsSideEffect];
