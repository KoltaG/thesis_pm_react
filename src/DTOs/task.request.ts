import { TaskStatus } from "../context/projectContext/ProjectContext";

export type TaskRequest = {
  name: string;
  description: string;
  assignedUserId?: string;
  status: TaskStatus;
};
