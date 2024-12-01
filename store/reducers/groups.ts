import { ApiServices } from "@/services/api"
import { createReducerWithSideEffect } from "../state"
import { Group } from "@/services/api/interfaces"

const addGroup = createReducerWithSideEffect(
  "add-group",
  (state, payload: { applicationId: string, group: Group }) => {
    if (state.applications !== undefined) {
      if (state.applications[payload.applicationId].groups !== undefined) {
        (state.applications[payload.applicationId].groups as Record<string, Group>)[payload.group.id] = payload.group;
      }
    }
    state.loading = false
  },
  (
    { state, sideEffect },
    { groupName, apiService, applicationId, possibleErrorTitle }: { groupName: string, apiService: ApiServices, applicationId: string, possibleErrorTitle: string }
  ) => {
    state.loading = true
    apiService.applications.groups.save({ applicationId, newGroup: { name: groupName } })
      .then(({ id }) => sideEffect({ applicationId, group: { id, name: groupName, permissions: {} } }))
      .catch(apiService.defaultErrorHandler(possibleErrorTitle))
  }
)

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

export const groupsReducers = [addGroup, updateGroupsApplication]

