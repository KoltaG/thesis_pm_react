import { ReactNode, useContext, useEffect, useReducer } from "react";
import { projectReducer } from "./ProjectReducer";
import { defaultState, ProjectContext } from "./ProjectContext";
import projectService from "../../utils/services/projectService";

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(projectReducer, defaultState);

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

  // Create a new task in a project
  const createTask = async (projectId: string, name: string) => {
    const response = await projectService.addTaskToProject(projectId, name);
    dispatch({ type: "ADD_TASK", payload: response });
  };

  // Delete task
  const deleteTask = async (taskId: string) => {
    await projectService.deleteTaskFromProject(taskId);
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  // Use useEffect to fetch projects on load
  useEffect(() => {
    fetchProjects();
  }, []);

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
