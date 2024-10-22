import { AxiosInstance } from "axios";
import { BasicCreation, Group, NewGroup } from "../interfaces";
import { permissions } from "./permissions";

export function groups(service: AxiosInstance) {
  return {
    list: async (applicationId: string) => {
      const response = await service.get<Group[]>(
        `/applications/${applicationId}/groups`
      );
      return response.data;
    },
    save: async (applicationId: string, data: NewGroup) => {
      const response = await service.post<BasicCreation>(
        `/applications/${applicationId}/groups`,
        data
      );
      return response.data;
    },
    permissions: permissions(service),
  };
}
