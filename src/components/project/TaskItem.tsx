import { Task, TaskStatus } from "../../context/projectContext/ProjectContext";
import { useProjectContext } from "../../context/projectContext/ProjectContextProvider";
import Button from "../common/Button";

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
    <li
      className={`mb-4 p-4 rounded-lg shadow-md border ${getStatusColor(
        task.status
      )} transition-transform transform hover:scale-105`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold text-gray-800">{task.name}</h4>
        <Button
          onClick={() => handleDeleteTask(task._id)}
          variant="text"
          className="!p-0"
        >
          &times;
        </Button>
      </div>
      {task.description && (
        <div className="my-2">
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
      )}

      <div className="my-2">
        <p className="text-sm text-gray-500">
          Felelős:
          <span className="text-gray-800 ml-1 text-sm font-bold">
            {task.assignedUser?.name}
          </span>
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-500">Státusz:</p>
        <div className="flex gap-2 items-center">
          <StatusButton
            label="To Do"
            onClick={() => handleUpdateTaskStatus(task._id, "To Do")}
            active={task.status === "To Do"}
            color="blue"
          />
          <StatusButton
            label="In Progress"
            onClick={() => handleUpdateTaskStatus(task._id, "In Progress")}
            active={task.status === "In Progress"}
            color="yellow"
          />
          <StatusButton
            label="Done"
            onClick={() => handleUpdateTaskStatus(task._id, "Done")}
            active={task.status === "Done"}
            color="green"
          />
        </div>
      </div>
    </li>
  );
};

const StatusButton = ({
  label,
  onClick,
  active,
  color,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
  color: "blue" | "yellow" | "green";
}) => {
  const activeStyles = {
    blue: "bg-blue-500 text-white",
    yellow: "bg-yellow-500 text-white",
    green: "bg-green-500 text-white",
  };

  const hoverStyles = {
    blue: "hover:bg-blue-100 text-blue-500",
    yellow: "hover:bg-yellow-100 text-yellow-500",
    green: "hover:bg-green-100 text-green-500",
  };

  return (
    <Button
      onClick={onClick}
      variant="text"
      className={`px-3 py-1 rounded-full ${
        active ? activeStyles[color] : hoverStyles[color]
      }`}
    >
      {label}
    </Button>
  );
};

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case "To Do":
      return "border-blue-300 bg-blue-50";
    case "In Progress":
      return "border-yellow-300 bg-yellow-50";
    case "Done":
      return "border-green-300 bg-green-50";
  }
};

export default TaskItem;
