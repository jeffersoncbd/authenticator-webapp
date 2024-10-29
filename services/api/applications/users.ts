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
    save: async (data: { applicationId: string; newUser: NewUser }) => {
      const response = await service.post<BasicResponse>(
        `/applications/${data.applicationId}/users`,
        data.newUser
      );
      return response.data;
    },
    update: async (data: {
      applicationId: string;
      userMail: string;
      user: UserUpdated;
    }) => {
      const response = await service.put<BasicResponse>(
        `/applications/${data.applicationId}/users/${data.userMail}`,
        data.user
      );
      return response.data;
    },
  };
}
