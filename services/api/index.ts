"use client";

import { SessionContext } from "@/contexts/Session";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useContext, useEffect } from "react";
import { applications } from "./applications";
import { LoginCredentials, LoginResponse } from "./interfaces";
import { useStoreActions } from "@/store";

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const pendingRequests = new Map()
const cancelationToken = 'Cancel repeated request'

export function useApiService() {
  const { toast } = useToast();
  const { token, authenticated, endSession } = useContext(SessionContext);
  const action = useStoreActions()

  useEffect(() => {
    if (authenticated) {
      service.defaults.headers.Authorization = `Bearer ${token}`;
      service.interceptors.request.use(
        (config) => {
          const requestIdentifier = `${config.url}_${config.method}`;
          if (pendingRequests.has(requestIdentifier)) {
            const cancelTokenSource = pendingRequests.get(requestIdentifier);
            cancelTokenSource.cancel(cancelationToken);
          }
          const newCancelTokenSource = axios.CancelToken.source();
          config.cancelToken = newCancelTokenSource.token;
          pendingRequests.set(requestIdentifier, newCancelTokenSource);
          return config;
        }
      )
      service.interceptors.response.use(
        (response) => {
          if (Boolean(response.data.feedback)) {
            toast({
              title: response.data.feedback,
              style: { backgroundColor: "green" },
            });
          }
          return response;
        },
        (error) => {
          if (
            error.response !== undefined &&
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
        action({ type: 'set-loading', payload: { loading: false } })
        if (error.message === "void" || error.message === cancelationToken) {
          return;
        }
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

export type ApiServices = ReturnType<typeof useApiService>;
