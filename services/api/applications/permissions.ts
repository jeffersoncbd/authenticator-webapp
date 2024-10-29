import { AxiosInstance } from "axios";
import { createService } from "..";
import { BasicResponse, Permission } from "../interfaces";

export function permissions(service: AxiosInstance, hasToken: boolean) {
  return {
    add: createService(
      hasToken,
      async (data: {
        applicationId: string;
        groupId: string;
        newPermission: Permission;
      }) => {
        const response = await service.post<BasicResponse>(
          `/applications/${data.applicationId}/groups/${data.groupId}/permissions`,
          data.newPermission
        );
        return response.data;
      }
    ),
  };
}
