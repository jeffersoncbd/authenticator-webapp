"use client";

import { Application } from "@/services/api/interfaces";
import { initState } from "../lib/simpleStore";

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

export const { createReducer, createReducerWithSideEffect, mountStore } = initState(initialState);
