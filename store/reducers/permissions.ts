import { ApiServices } from "@/services/api";
import { createReducerWithSideEffect } from "../state";
import { Group, Permission } from "@/services/api/interfaces"

const addPermission = createReducerWithSideEffect(
  "add-permission",
  (state, payload: { applicationId: string, groupId: string, newPermission: Permission }) => {
    if (state.applications !== undefined) {
      if (state.applications[payload.applicationId].groups !== undefined) {
        (state.applications[payload.applicationId].groups as Record<string, Group>)[payload.groupId].permissions[payload.newPermission.key] = payload.newPermission.permission
      }
    }
  },
  (
    { state, sideEffect },
    { newPermission, groupId, apiService, applicationId, possibleErrorTitle }: { groupId: string, apiService: ApiServices, applicationId: string, possibleErrorTitle: string, newPermission: Permission }
  ) => {
    state.loading = true
    apiService.applications.groups.permissions.add({ applicationId, groupId, newPermission })
      .then(() => sideEffect({ applicationId, groupId, newPermission }))
      .catch(apiService.defaultErrorHandler(possibleErrorTitle))
  }
)

export const permissionsReducers = [addPermission]