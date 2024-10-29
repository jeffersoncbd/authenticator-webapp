import { AxiosInstance } from "axios";
import { createService } from "..";
import { BasicResponse, NewUser, User, UserUpdated } from "../interfaces";

export function users(service: AxiosInstance, hasToken: boolean) {
  return {
    list: createService(hasToken, async (applicationId: string) => {
      const response = await service.get<User[]>(
        `/applications/${applicationId}/users`
      );
      return response.data;
    }),
    save: createService(
      hasToken,
      async (data: { applicationId: string; newUser: NewUser }) => {
        const response = await service.post<BasicResponse>(
          `/applications/${data.applicationId}/users`,
          data.newUser
        );
        return response.data;
      }
    ),
    update: createService(
      hasToken,
      async (data: {
        applicationId: string;
        userMail: string;
        user: UserUpdated;
      }) => {
        const response = await service.put<BasicResponse>(
          `/applications/${data.applicationId}/users/${data.userMail}`,
          data.user
        );
        return response.data;
      }
    ),
  };
}
