import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import TaskList from "../components/project/TaskList";
import { useProjectContext } from "../context/projectContext/ProjectContextProvider";
import { TaskStatus } from "../context/projectContext/ProjectContext";
import { useState } from "react";
import UsersModal from "../components/user/UsersModal";

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { state, dispatch } = useProjectContext();
  const navigate = useNavigate();

  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const project = state.projects.find(
    (p) => p.id === parseInt(projectId || "", 10)
  );
  const tasks = state.tasks.filter(
    (task) => task.projectId === parseInt(projectId || "", 10)
  );

  // Filter tasks by status
  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  const deleteProject = () => {
    dispatch({ type: "DELETE_PROJECT", payload: project?.id || 0 });
    navigate("/"); // Navigate to Dashboard
  };

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      projectId: project?.id || 0,
      name: `Feladat ${tasks.length + 1}`,
      status: "To Do" as TaskStatus,
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  if (!project) {
    return <div>Projekt nem található.</div>;
  }

  const RenderOpenUsers = (): React.ReactNode => {
    return (
      <button
        onClick={() => setIsUsersOpen(true)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Felhasználók kezelése
      </button>
    );
  };

  return (
    <div>
      <PageHeader
        title={`Projekt: ${project.name}`}
        onAddClick={addTask}
        addText="Új feladat hozzáadása"
        onDeleteClick={deleteProject}
        extraActions={<RenderOpenUsers />}
      />
      <h1 className="text-2xl font-bold mb-4"></h1>
      <div className="flex gap-4">
        <TaskList
          taskStatus="To Do"
          tasks={todoTasks}
        />
        <TaskList
          taskStatus="In Progress"
          tasks={inProgressTasks}
        />
        <TaskList
          taskStatus="Done"
          tasks={doneTasks}
        />
      </div>
      <UsersModal
        isOpen={isUsersOpen}
        setIsOpen={setIsUsersOpen}
        projectId={project.id}
      />
    </div>
  );
};

export default ProjectDetails;
