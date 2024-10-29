import { AxiosInstance } from "axios";
import { createService } from "..";
import { Application, BasicCreation, NewApplication } from "../interfaces";
import { groups } from "./groups";
import { users } from "./users";

export function applications(service: AxiosInstance, hasToken: boolean) {
  return {
    list: createService(hasToken, async () => {
      const response = await service.get<Application[]>("/applications");
      return response.data;
    }),
    getById: createService(hasToken, async (id: string) => {
      const response = await service.get<Application>(`/applications/${id}`);
      return response.data;
    }),
    save: createService(hasToken, async (data: NewApplication) => {
      const response = await service.post<BasicCreation>("/applications", data);
      return response.data;
    }),
    groups: groups(service, hasToken),
    users: users(service, hasToken),
  };
}
