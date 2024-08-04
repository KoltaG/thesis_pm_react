import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";
import PageHeader from "../layout/PageHeader";
import { TaskStatus } from "../context/AppContext";

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
      status: "To Do" as TaskStatus,
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const updateTaskStatus = (taskId: number, status: TaskStatus) => {
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
      <PageHeader
        title={`Projekt: ${project.name}`}
        onAddClick={addTask}
        addText="Új feladat hozzáadása"
      />
      <h1 className="text-2xl font-bold mb-4"></h1>
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
