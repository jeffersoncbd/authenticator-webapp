export interface BasicResponse {
  feedback: string;
}
export interface LoginResponse extends BasicResponse {
  token: string;
}
export interface BasicCreation extends BasicResponse {
  id: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface NewApplication {
  name: string;
}
export interface Application extends NewApplication {
  id: string;
}

export interface NewGroup {
  name: string;
}
export interface Group extends NewGroup {
  id: string;
  permissions: Record<string, number>;
}

export interface Permission {
  key: string;
  permission: number;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  groupId: string;
}
export type UserStatus = "active" | "inactive";
export interface User {
  name: string;
  email: string;
  status: UserStatus;
  group: {
    id: string;
    name: string;
  };
}

export interface UserUpdated {
  name: string;
  newEmail?: string;
  newPassword?: string;
  groupId: string;
  status: UserStatus;
}
