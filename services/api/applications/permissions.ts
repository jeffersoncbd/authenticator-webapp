import { AxiosInstance } from "axios";
import { BasicResponse, Permission } from "../interfaces";

export function permissions(service: AxiosInstance) {
  return {
    set: async (data: {
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
  };
}
