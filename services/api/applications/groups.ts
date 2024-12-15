import { AxiosInstance } from "axios";
import { BasicCreation, BasicResponse, Group, NewGroup } from "../interfaces";
import { permissions } from "./permissions";

export function groups(service: AxiosInstance) {
  return {
    list: async (applicationId: string) => {
      const response = await service.get<Group[]>(
        `/applications/${applicationId}/groups`
      );
      return response.data;
    },
    save: async (data: { applicationId: string; newGroup: NewGroup }) => {
      const response = await service.post<BasicCreation>(
        `/applications/${data.applicationId}/groups`,
        data.newGroup
      );
      return response.data;
    },
    delete: async (data: { applicationId: string; groupId: string }) => {
      const response = await service.delete<BasicResponse>(`/applications/${data.applicationId}/groups/${data.groupId}`);
      return response.data;
    },
    permissions: permissions(service),
  };
}
