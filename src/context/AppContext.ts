import { createContext } from "react";

interface Task {
  id: number;
  projectId: number;
  name: string;
  status: "To Do" | "In Progress" | "Done";
}

interface Project {
  id: number;
  name: string;
}

// State
export interface AppState {
  projects: Project[];
  tasks: Task[];
}

export const defaultState: AppState = {
  projects: [],
  tasks: [],
};

// Actions
export type ActionType =
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task };
// Context
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: defaultState,
  dispatch: () => null,
});
