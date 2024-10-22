"use client";

import { SessionContext } from "@/contexts/Session";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useContext, useEffect } from "react";
import { applications } from "./applications";
import { LoginCredentials, LoginResponse } from "./interfaces";

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function useApiService() {
  const { toast } = useToast();
  const { token, authenticated, endSession } = useContext(SessionContext);

  useEffect(() => {
    if (authenticated) {
      service.defaults.headers.Authorization = `Bearer ${token}`;
      service.interceptors.response.use(
        (response) => {
          toast({
            title: response.data.feedback,
            style: { backgroundColor: "green" },
          });
          return response;
        },
        (error) => {
          if (
            error.response.status === 401 &&
            error.response.data.feedback ===
              "token has invalid claims: token is expired"
          ) {
            endSession();
          }
          return Promise.reject(error);
        }
      );
    } else {
      service.defaults.headers.Authorization = "";
    }

    return () => {
      service.defaults.headers.Authorization = "";
    };
  }, [token, authenticated, endSession, toast]);

  return {
    login: async (credentials: LoginCredentials) => {
      const response = await service.post<LoginResponse>("/login", {
        ...credentials,
        application: process.env.NEXT_PUBLIC_APP_ID,
      });
      return response.data;
    },
    defaultErrorHandler: (title: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (error: any) => {
        if (error.response === undefined) {
          toast({
            title: "Ocorreu um erro inesperado",
            description: error.message,
          });
          return;
        }
        console.log(`${title}\n${error}`);
        toast({ title, description: error.response.data.feedback });
      };
    },
    applications: applications(service),
  };
}
