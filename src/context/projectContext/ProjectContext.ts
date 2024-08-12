import { createContext } from "react";
import { User } from "../userContext/UserContext";

export type TaskStatus = "To Do" | "In Progress" | "Done";
export interface Task {
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
export interface ProjectState {
  projects: Project[];
  tasks: Task[];
}

export const defaultState: ProjectState = {
  projects: [],
  tasks: [],
};

// Actions
export type ActionType =
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "DELETE_PROJECT"; payload: number }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: number }
  | {
      type: "UPDATE_TASK_STATUS";
      payload: { taskId: number; status: "To Do" | "In Progress" | "Done" };
    }
  | {
      type: "ASSIGN_USER_TO_PROJECT";
      payload: { projectId: number; userId: number };
    }
  | {
      type: "UNASSIGN_USER_FROM_PROJECT";
      payload: { projectId: number; userId: number };
    };

// Context
export const ProjectContext = createContext<{
  state: ProjectState;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: defaultState,
  dispatch: () => null,
});
