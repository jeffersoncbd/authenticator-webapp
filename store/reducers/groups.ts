import { ApiServices } from "@/services/api"
import { createReducerWithSideEffect } from "../state"
import { Group } from "@/services/api/interfaces"

const updateGroupsApplication = createReducerWithSideEffect(
  "update-groups-application",
  (state, payload: { groups: Group[], applicationID: string }) => {
    if (state.applications !== undefined) {
      const groups: Record<string, Group> = {}
      payload.groups.forEach((g) => (groups[g.id] = g));
      state.applications[payload.applicationID].groups = groups;
    }
    state.loading = false
  },
  (
    { state, sideEffect },
    { apiService, applicationID, possibleErrorTitle }: { apiService: ApiServices, applicationID: string, possibleErrorTitle: string }
  ) => {
    state.loading = true
    apiService.applications.groups.list(applicationID)
      .then((groups) => sideEffect({ applicationID, groups }))
      .catch(apiService.defaultErrorHandler(possibleErrorTitle))
  }
)

export const groupsReducers = [updateGroupsApplication]

