import { AxiosInstance } from "axios";
import { Application, BasicCreation, NewApplication } from "../interfaces";
import { groups } from "./groups";
import { users } from "./users";

export function applications(service: AxiosInstance) {
  return {
    list: async () => {
      const response = await service.get<Application[]>("/applications");
      return response.data;
    },
    getById: async (id: string) => {
      const response = await service.get<Application>(`/applications/${id}`);
      return response.data;
    },
    save: async (data: NewApplication) => {
      const response = await service.post<BasicCreation>("/applications", data);
      return response.data;
    },
    groups: groups(service),
    users: users(service),
  };
}
