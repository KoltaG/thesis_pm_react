import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { state, dispatch } = useAppContext();

  const project = state.projects.find(
    (p) => p.id === parseInt(projectId || "", 10)
  );
  const tasks = state.tasks.filter(
    (task) => task.projectId === parseInt(projectId || "", 10)
  );

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      projectId: project?.id || 0,
      name: `Feladat ${tasks.length + 1}`,
      status: "To Do" as "To Do",
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const updateTaskStatus = (
    taskId: number,
    status: "To Do" | "In Progress" | "Done"
  ) => {
    const updatedTask = state.tasks.find((task) => task.id === taskId);
    if (updatedTask) {
      dispatch({ type: "UPDATE_TASK", payload: { ...updatedTask, status } });
    }
  };

  if (!project) {
    return <div>Projekt nem található.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projekt: {project.name}</h1>
      <button
        onClick={addTask}
        className="mb-4 p-2 bg-green-500 text-white rounded"
      >
        Új feladat hozzáadása
      </button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="mb-2 p-2 bg-white rounded shadow"
          >
            {task.name} - {task.status}
            <div>
              <button
                onClick={() => updateTaskStatus(task.id, "To Do")}
                className="mr-2"
              >
                To Do
              </button>
              <button
                onClick={() => updateTaskStatus(task.id, "In Progress")}
                className="mr-2"
              >
                In Progress
              </button>
              <button onClick={() => updateTaskStatus(task.id, "Done")}>
                Done
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
