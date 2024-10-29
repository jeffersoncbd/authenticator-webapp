import { ApiServices } from "@/services/api";
import { Application } from "@/services/api/interfaces";
import { SideEffects } from "..";
import { createReducer } from "../state";

const updateApplications = createReducer(
  "update-applications",
  (state, payload: { sideEffects: SideEffects; apiService: ApiServices }) => {
    state.loading = true;
    payload.apiService.applications
      .list()
      .then((applications) => {
        payload.sideEffects({
          type: "update-applications",
          payload: applications,
        });
      })
      .catch(
        payload.apiService.defaultErrorHandler(
          "Falha ao tentar listar aplicações"
        )
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
