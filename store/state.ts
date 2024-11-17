"use client";

import { Application, Group } from "@/services/api/interfaces";
import { initState } from "@jeff.carlosbd/nano-store";

type ID = string

interface CompleteApplication extends Application {
  groups?: Record<ID, Group>
}

export interface State {
  loading: boolean;
  applications?: Record<ID, CompleteApplication>;
}
export const initialState: State = {
  loading: false
};

export const { createReducer, createReducerWithSideEffect, mountStore } =
  initState(initialState);
