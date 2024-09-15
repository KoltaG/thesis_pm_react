import { ReactNode, useContext, useEffect, useReducer } from "react";
import { projectReducer } from "./ProjectReducer";
import { defaultState, ProjectContext, TaskStatus } from "./ProjectContext";
import projectService from "../../utils/services/projectService";
import { useAuthContext } from "../authContext/AuthContext";

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(projectReducer, defaultState);
  const { state: authState } = useAuthContext();

  // Fetch projects from API
  const fetchProjects = async () => {
    const projects = await projectService.fetchProjects();
    dispatch({ type: "SET_PROJECTS", payload: projects });
  };

  // Create a new project
  const createProject = async (name: string) => {
    const response = await projectService.addProject(name);
    dispatch({ type: "ADD_PROJECT", payload: response });
  };

  // Delete a project
  const deleteProject = async (id: string) => {
    await projectService.deleteProject(id);
    dispatch({ type: "DELETE_PROJECT", payload: id });
  };

  // Assign a user to a project
  const assignUserToProject = async (projectId: string, userId: string) => {
    await projectService.assignUserToProject(projectId, userId);
    dispatch({
      type: "ASSIGN_USER_TO_PROJECT",
      payload: { projectId, userId },
    });
  };

  // Unassign a user from a project
  const unassignUserFromProject = async (projectId: string, userId: string) => {
    await projectService.unassignUserFromProject(projectId, userId);
    dispatch({
      type: "UNASSIGN_USER_FROM_PROJECT",
      payload: { projectId, userId },
    });
  };

  // Create a new task in a project
  const createTask = async (projectId: string, name: string) => {
    const response = await projectService.addTaskToProject(projectId, name);
    dispatch({ type: "ADD_TASK", payload: response });
  };

  // Update a task in a project
  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    const response = await projectService.updateTaskStatus(taskId, status);
    dispatch({
      type: "UPDATE_TASK_STATUS",
      payload: { taskId, status: response.status },
    });
  };

  // Delete task
  const deleteTask = async (taskId: string) => {
    await projectService.deleteTaskFromProject(taskId);
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  // Use useEffect to fetch projects on load
  useEffect(() => {
    if (authState.isLoggedIn) {
      fetchProjects();
    }
  }, [authState.isLoggedIn]);

  return (
    <ProjectContext.Provider
      value={{
        state,
        dispatch,
        fetchProjects,
        createProject,
        deleteProject,
        createTask,
        deleteTask,
        updateTaskStatus,
        assignUserToProject,
        unassignUserFromProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within ProjectProvider");
  }
  return context;
};
