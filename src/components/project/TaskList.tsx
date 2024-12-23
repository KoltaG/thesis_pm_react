import { Task, TaskStatus } from "../../context/projectContext/ProjectContext";
import TaskItem from "./TaskItem";

interface TaskListProps {
  taskStatus: TaskStatus;
  tasks: Task[];
}

const TaskList = ({ taskStatus, tasks }: TaskListProps) => {
  return (
    <div className="flex-1 bg-gray-200 shadow p-4 rounded-xl">
      <h3 className="mb-4 font-bold text-xl">{taskStatus}</h3>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
