import { Application } from "@/services/api/interfaces";

export interface State {
  loading: boolean;
  applications: {
    list: Application[];
  };
}
export const initialState: State = {
  loading: false,
  applications: {
    list: [],
  },
};
