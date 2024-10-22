import { AxiosInstance } from "axios";
import { BasicResponse, Permission } from "../interfaces";

export function permissions(service: AxiosInstance) {
  return {
    add: async (
      applicationId: string,
      groupId: string,
      newPermission: Permission
    ) => {
      const response = await service.post<BasicResponse>(
        `/applications/${applicationId}/groups/${groupId}/permissions`,
        newPermission
      );
      return response.data;
    },
  };
}
