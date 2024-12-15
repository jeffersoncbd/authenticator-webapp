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
    state.loading = false
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

const updatePermission = createReducerWithSideEffect(
  "update-permission",
  (state, payload: { applicationId: string, groupId: string, permissionKey: string, updatedPermission: Permission }) => {
    if (state.applications !== undefined) {
      if (state.applications[payload.applicationId].groups !== undefined) {
        (state.applications[payload.applicationId].groups as Record<string, Group>)[payload.groupId].permissions[payload.updatedPermission.key] = payload.updatedPermission.permission
        if (payload.permissionKey !== payload.updatedPermission.key) {
          delete (state.applications[payload.applicationId].groups as Record<string, Group>)[payload.groupId].permissions[payload.permissionKey]
        }
      }
    }
    state.loading = false
  },
  (
    { state, sideEffect },
    { updatedPermission, permissionKey, groupId, apiService, applicationId, possibleErrorTitle }: { groupId: string, apiService: ApiServices, applicationId: string, possibleErrorTitle: string, updatedPermission: Permission, permissionKey: string }
  ) => {
    state.loading = true
    apiService.applications.groups.permissions.update({ applicationId, groupId, permissionKey, updatedPermission })
      .then(() => sideEffect({ applicationId, groupId, permissionKey, updatedPermission }))
      .catch(apiService.defaultErrorHandler(possibleErrorTitle))
  }
)

const removePermission = createReducerWithSideEffect(
  "delete-permission",
  (state, payload: { applicationId: string, groupId: string, permissionKey: string }) => {
    if (state.applications !== undefined) {
      if (state.applications[payload.applicationId].groups !== undefined) {
        delete (state.applications[payload.applicationId].groups as Record<string, Group>)[payload.groupId].permissions[payload.permissionKey]
      }
    }
    state.loading = false
  },
  (
    { state, sideEffect },
    { permissionKey, groupId, apiService, applicationId, possibleErrorTitle }: { groupId: string, apiService: ApiServices, applicationId: string, possibleErrorTitle: string, permissionKey: string }
  ) => {
    state.loading = true
    apiService.applications.groups.permissions.delete({ applicationId, groupId, permissionKey })
      .then(() => sideEffect({ applicationId, groupId, permissionKey }))
      .catch(apiService.defaultErrorHandler(possibleErrorTitle))
  }
)

export const permissionsReducers = [addPermission, updatePermission, removePermission]
