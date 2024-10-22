import { AxiosInstance } from "axios";
import { BasicResponse, NewUser, User, UserUpdated } from "../interfaces";

export function users(service: AxiosInstance) {
  return {
    list: async (applicationId: string) => {
      const response = await service.get<User[]>(
        `/applications/${applicationId}/users`
      );
      return response.data;
    },
    save: async (applicationId: string, data: NewUser) => {
      const response = await service.post<BasicResponse>(
        `/applications/${applicationId}/users`,
        data
      );
      return response.data;
    },
    update: async (
      applicationId: string,
      userMail: string,
      data: UserUpdated
    ) => {
      const response = await service.put<BasicResponse>(
        `/applications/${applicationId}/users/${userMail}`,
        data
      );
      return response.data;
    },
  };
}
