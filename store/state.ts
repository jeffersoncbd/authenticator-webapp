"use client";

import { Application, Group } from "@/services/api/interfaces";
import { initState } from "@jeff.carlosbd/nano-store";

interface CompleteApplication extends Application {
  groups?: Record<string, Group>
}

export interface State {
  loading: boolean;
  applications?: Record<string, CompleteApplication>;
}
export const initialState: State = {
  loading: false
};

export const { createReducer, createReducerWithSideEffect, mountStore } =
  initState(initialState);
