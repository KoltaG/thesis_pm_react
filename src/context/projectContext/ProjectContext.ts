import React, { createContext, useContext } from "react";
import { TaskRequest } from "../../DTOs/task.request";
import { User } from "../../DTOs/login.response";

export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  _id: string;
  projectId: string;
  name: string;
  description?: string;
  assignedUser?: User;
  status: TaskStatus;
}

export interface Project {
  _id: string;
  name: string;
  assignedUserIds: string[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
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
    }
  | {
      type: "ASSIGN_USER_TO_PROJECT";
      payload: { projectId: string; userId: string };
    }
  | {
      type: "UNASSIGN_USER_FROM_PROJECT";
      payload: { projectId: string; userId: string };
    };

// Create the context
export const ProjectContext = createContext<{
  state: ProjectState;
  dispatch: React.Dispatch<ActionType>;
  fetchProjects: () => Promise<void>;
  createProject: (name: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  assignUserToProject: (projectId: string, userId: string) => Promise<void>;
  unassignUserFromProject: (projectId: string, userId: string) => Promise<void>;
  createTask: (projectId: string, task: TaskRequest) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
}>({
  state: defaultState,
  dispatch: () => null,
  fetchProjects: async () => {},
  createProject: async () => {},
  deleteProject: async () => {},
  assignUserToProject: async () => {},
  unassignUserFromProject: async () => {},
  createTask: async () => {},
  deleteTask: async () => {},
  updateTaskStatus: async () => {},
});

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within ProjectProvider");
  }
  return context;
};
