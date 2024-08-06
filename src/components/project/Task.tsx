import { Task, TaskStatus } from "../../context/AppContext";
import { useAppContext } from "../../context/AppContextProvider";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { dispatch } = useAppContext();

  const updateTaskStatus = (taskId: number, status: TaskStatus) => {
    dispatch({ type: "UPDATE_TASK_STATUS", payload: { taskId, status } });
  };

  const deleteTask = (taskId: number) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  return (
    <li className={`mb-2 p-2 rounded shadow ${getStatusColor(task.status)}`}>
      <div className="flex items-center justify-between">
        <h4>{task.name}</h4>
        <button onClick={() => deleteTask(task.id)}>x</button>
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={() => updateTaskStatus(task.id, "To Do")}>
          To Do
        </button>
        <button onClick={() => updateTaskStatus(task.id, "In Progress")}>
          In Progress
        </button>
        <button onClick={() => updateTaskStatus(task.id, "Done")}>Done</button>
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
