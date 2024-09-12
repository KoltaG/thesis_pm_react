import { Task, TaskStatus } from "../../context/projectContext/ProjectContext";
import { useProjectContext } from "../../context/projectContext/ProjectContextProvider";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { deleteTask, updateTaskStatus } = useProjectContext();

  const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
    updateTaskStatus(taskId, status);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  return (
    <li className={`mb-2 p-2 rounded shadow ${getStatusColor(task.status)}`}>
      <div className="flex items-center justify-between">
        <h4>{task.name}</h4>
        <button onClick={() => handleDeleteTask(task._id)}>x</button>
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={() => handleUpdateTaskStatus(task._id, "To Do")}>
          To Do
        </button>
        <button onClick={() => handleUpdateTaskStatus(task._id, "In Progress")}>
          In Progress
        </button>
        <button onClick={() => handleUpdateTaskStatus(task._id, "Done")}>
          Done
        </button>
      </div>
    </li>
  );
};

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case "To Do":
      return "bg-blue-300";
    case "In Progress":
      return "bg-yellow-300";
    case "Done":
      return "bg-green-300";
  }
};

export default TaskItem;
