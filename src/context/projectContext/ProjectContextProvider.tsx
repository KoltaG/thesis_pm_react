import { ReactNode, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { projectReducer } from "./ProjectReducer";
import { defaultState, ProjectContext, TaskStatus } from "./ProjectContext";
import projectService from "../../utils/services/projectService";
import { useAuthContext } from "../authContext/AuthContext";
import { TaskRequest } from "../../DTOs/task.request";

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(projectReducer, defaultState);
  const { state: authState } = useAuthContext();

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const projects = await projectService.fetchProjects();
      dispatch({ type: "SET_PROJECTS", payload: projects });
    } catch (error) {
      toast.error("Error fetching projects.");
    }
  };

  // Create a new project
  const createProject = async (name: string) => {
    try {
      const response = await projectService.addProject(name);
      dispatch({ type: "ADD_PROJECT", payload: response });
      toast.success("Project created successfully!");
    } catch (error) {
      toast.error("Error creating project.");
    }
  };

  // Delete a project
  const deleteProject = async (id: string) => {
    try {
      await projectService.deleteProject(id);
      dispatch({ type: "DELETE_PROJECT", payload: id });
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Error deleting project.");
    }
  };

  // Assign a user to a project
  const assignUserToProject = async (projectId: string, userId: string) => {
    try {
      await projectService.assignUserToProject(projectId, userId);
      dispatch({
        type: "ASSIGN_USER_TO_PROJECT",
        payload: { projectId, userId },
      });
      toast.success("User assigned to project successfully!");
    } catch (error) {
      toast.error("Error assigning user to project.");
    }
  };

  // Unassign a user from a project
  const unassignUserFromProject = async (projectId: string, userId: string) => {
    try {
      await projectService.unassignUserFromProject(projectId, userId);
      dispatch({
        type: "UNASSIGN_USER_FROM_PROJECT",
        payload: { projectId, userId },
      });
      toast.success("User unassigned from project successfully!");
    } catch (error) {
      toast.error("Error unassigning user from project.");
    }
  };

  // Create a new task in a project
  const createTask = async (projectId: string, task: TaskRequest) => {
    try {
      const response = await projectService.addTaskToProject(projectId, task);
      dispatch({ type: "ADD_TASK", payload: response });
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Error creating task.");
    }
  };

  // Update a task in a project
  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    try {
      const response = await projectService.updateTaskStatus(taskId, status);
      dispatch({
        type: "UPDATE_TASK_STATUS",
        payload: { taskId, status: response.status },
      });
      toast.success("Task status updated successfully!");
    } catch (error) {
      toast.error("Error updating task status.");
    }
  };

  // Delete task
  const deleteTask = async (taskId: string) => {
    try {
      await projectService.deleteTaskFromProject(taskId);
      dispatch({ type: "DELETE_TASK", payload: taskId });
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Error deleting task.");
    }
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
