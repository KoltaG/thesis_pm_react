import { UserState } from "../userContext/UserContext";
import { ActionType, ProjectState } from "./ProjectContext";

// Reducer
export const projectReducer = (
  state: ProjectState,
  action: ActionType,
  userState: UserState
): ProjectState => {
  switch (action.type) {
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, { ...action.payload, assignedUsers: [] }],
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.status }
            : task
        ),
      };
    case "ASSIGN_USER_TO_PROJECT": {
      const { projectId, userId } = action.payload;
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                assignedUsers: [
                  ...project.assignedUsers,
                  userState.users.find((user) => user.id === userId)!,
                ],
              }
            : project
        ),
      };
    }
    case "UNASSIGN_USER_FROM_PROJECT": {
      const { projectId, userId } = action.payload;
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                assignedUsers: project.assignedUsers.filter(
                  (user) => user.id !== userId
                ),
              }
            : project
        ),
      };
    }
    default:
      return state;
  }
};
