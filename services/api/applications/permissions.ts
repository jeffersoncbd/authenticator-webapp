import { AxiosInstance } from "axios";
import { BasicResponse, Permission } from "../interfaces";

export function permissions(service: AxiosInstance) {
  return {
    add: async (data: {
      applicationId: string;
      groupId: string;
      newPermission: Permission;
    }) => {
      const response = await service.post<BasicResponse>(
        `/applications/${data.applicationId}/groups/${data.groupId}/permissions`,
        data.newPermission
      );
      return response.data;
    },
    update: async (data: {
      applicationId: string;
      groupId: string;
      permissionKey: string;
      updatedPermission: Permission;
    }) => {
      const response = await service.put<BasicResponse>(
        `/applications/${data.applicationId}/groups/${data.groupId}/permissions/${data.permissionKey}`,
        data.updatedPermission
      )
      return response.data
    },
    delete: async (data: {
      applicationId: string;
      groupId: string;
      permissionKey: string;
    }) => {
      const response = await service.delete<BasicResponse>(
        `/applications/${data.applicationId}/groups/${data.groupId}/permissions/${data.permissionKey}`
      )
      return response.data
    }
  };
}
