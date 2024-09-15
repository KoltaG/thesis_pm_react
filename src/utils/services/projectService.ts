import {
  Project,
  Task,
  TaskStatus,
} from "../../context/projectContext/ProjectContext";
import network from "../network";

class ProjectService {
  // Fetch all projects
  fetchProjects = async (): Promise<Project[]> => {
    try {
      const response = await network.get<Project[]>(`/projects`);
      return response.data;
    } catch (error) {
      console.error("Error fetching projects", error);
      throw error;
    }
  };

  // Add a new project
  addProject = async (projectName: string): Promise<Project> => {
    try {
      const response = await network.post<Project>(`/projects`, {
        name: projectName,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding project", error);
      throw error;
    }
  };

  // Delete a project
  deleteProject = async (projectId: string): Promise<void> => {
    try {
      await network.delete(`/projects/delete/${projectId}`);
    } catch (error) {
      console.error("Error deleting project", error);
      throw error;
    }
  };

  // Assign a user to a project
  assignUserToProject = async (
    projectId: string,
    userId: string
  ): Promise<Project> => {
    try {
      const response = await network.post(
        `/projects/${projectId}/assign-user`,
        { userId }
      );
      return response.data;
    } catch (error) {
      console.error("Error assigning user to project", error);
      throw error;
    }
  };

  // Unassign a user from a project
  unassignUserFromProject = async (
    projectId: string,
    userId: string
  ): Promise<Project> => {
    try {
      const response = await network.post(
        `/projects/${projectId}/unassign-user`,
        { userId }
      );
      return response.data;
    } catch (error) {
      console.error("Error unassigning user from project", error);
      throw error;
    }
  };

  // Fetch all tasks for a specific project
  fetchTasksForProject = async (projectId: number): Promise<Task[]> => {
    try {
      const response = await network.get<Task[]>(
        `/projects/${projectId}/tasks`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks for project", error);
      throw error;
    }
  };

  // Add a task to a project
  addTaskToProject = async (
    projectId: string,
    name: string,
    assignedUserId?: string
  ): Promise<Task> => {
    try {
      const response = await network.post<Task>(
        `/projects/${projectId}/tasks`,
        { name, assignedUserId }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding task to project", error);
      throw error;
    }
  };

  // Delete a task from a project
  deleteTaskFromProject = async (taskId: string): Promise<void> => {
    try {
      await network.delete(`/tasks/${taskId}`);
    } catch (error) {
      console.error("Error deleting task from project", error);
      throw error;
    }
  };

  // Update task status
  updateTaskStatus = async (
    taskId: string,
    status: TaskStatus
  ): Promise<Task> => {
    try {
      const response = await network.patch<Task>(`/tasks/${taskId}`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating task status", error);
      throw error;
    }
  };
}

const projectService = new ProjectService();
export default projectService;
