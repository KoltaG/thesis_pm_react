import { createContext } from "react";
import { testUsers } from "../_MOCK/users";

export type Role = "PM" | "Dev";
export interface User {
  id: number;
  name: string;
  role: Role;
}

export type TaskStatus = "To Do" | "In Progress" | "Done";
interface Task {
  id: number;
  projectId: number;
  name: string;
  assignedUserId?: number;
  status: TaskStatus;
}

interface Project {
  id: number;
  name: string;
  assignedUsers: User[];
}

// State
export interface AppState {
  currentUser: User | null;
  users: User[];
  projects: Project[];
  tasks: Task[];
}

export const defaultState: AppState = {
  currentUser: null,
  users: testUsers, // Mock Users for development purposes
  projects: [],
  tasks: [],
};

// Actions
export type ActionType =
  | { type: "SET_CURRENT_USER"; payload: User }
  | { type: "ADD_USER"; payload: User }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "DELETE_PROJECT"; payload: number }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: number }
  | {
      type: "UPDATE_TASK_STATUS";
      payload: { taskId: number; status: "To Do" | "In Progress" | "Done" };
    };

// Context
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: defaultState,
  dispatch: () => null,
});
