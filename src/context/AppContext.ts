import { createContext } from "react";

// State
export interface AppState {
  projects: { id: number; name: string }[];
}

export const defaultState: AppState = {
  projects: [],
};

// Actions
export type ActionType = {
  type: "ADD_PROJECT";
  payload: { id: number; name: string };
};

// Context
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: defaultState,
  dispatch: () => null,
});
