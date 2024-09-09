import React, { createContext, useContext } from "react";
import { User } from "../../DTOs/login.response";

export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  _id: string;
  projectId: string;
  name: string;
  assignedUserId?: string;
  status: TaskStatus;
}

export interface Project {
  _id: string;
  name: string;
  assignedUsers: User[];
  tasks: Task[];
}

export interface ProjectState {
  projects: Project[];
}

// Default state
export const defaultState: ProjectState = {
  projects: [],
};

// Define actions
export type ActionType =
  | { type: "SET_PROJECTS"; payload: Project[] }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "DELETE_PROJECT"; payload: string }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | {
      type: "UPDATE_TASK_STATUS";
      payload: { taskId: string; status: TaskStatus };
    };

// Create the context
export const ProjectContext = createContext<{
  state: ProjectState;
  dispatch: React.Dispatch<ActionType>;
  fetchProjects: () => Promise<void>;
  createProject: (name: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  createTask: (projectId: string, name: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}>({
  state: defaultState,
  dispatch: () => null,
  fetchProjects: async () => {},
  createProject: async () => {},
  deleteProject: async () => {},
  createTask: async () => {},
  deleteTask: async () => {},
});

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within ProjectProvider");
  }
  return context;
};
