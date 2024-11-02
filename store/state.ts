"use client";

import { Application } from "@/services/api/interfaces";
import { initState } from "@jeff.carlosbd/nano-store";

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

export const { createReducer, createReducerWithSideEffect, mountStore } =
  initState(initialState);
