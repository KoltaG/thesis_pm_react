import { ActionType, ProjectState } from "./ProjectContext";

// Reducer
export const projectReducer = (
  state: ProjectState,
  action: ActionType
): ProjectState => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case "ADD_TASK":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload.projectId
            ? { ...project, tasks: [...(project.tasks ?? []), action.payload] }
            : project
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        projects: state.projects.map((project) => ({
          ...project,
          tasks: project.tasks.filter((task) => task._id !== action.payload),
        })),
      };
    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        projects: state.projects.map((project) => ({
          ...project,
          tasks: project.tasks.map((task) =>
            task._id === action.payload.taskId
              ? { ...task, status: action.payload.status }
              : task
          ),
        })),
      };
    default:
      return state;
  }
};
