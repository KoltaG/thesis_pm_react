import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import TaskList from "../components/project/TaskList";
import { useProjectContext } from "../context/projectContext/ProjectContextProvider";
import { useState } from "react";
import UsersModal from "../components/user/UsersModal";
import { useAuthContext } from "../context/authContext/AuthContext";

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { state, deleteProject, createTask } = useProjectContext();
  const { state: userState } = useAuthContext();
  const navigate = useNavigate();

  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const project = state.projects.find((p) => p._id === projectId);

  if (!project) {
    return <div>Projekt nem található.</div>;
  }

  const tasks = project.tasks ?? [];

  // Filter tasks by status
  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  const handleDeleteProject = async () => {
    try {
      await deleteProject(projectId ?? "");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      await createTask(projectId ?? "", "New Task");
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const RenderOpenUsers = (): React.ReactNode => {
    return (
      <button
        onClick={() => setIsUsersOpen(true)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Felhasználók
      </button>
    );
  };

  return (
    <div>
      <PageHeader
        title={`Projekt: ${project.name}`}
        onDeleteClick={handleDeleteProject}
        addText="Új feladat hozzáadása"
        onAddClick={handleAddTask}
        extraActions={userState.user?.role !== "Dev" && <RenderOpenUsers />}
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
        projectId={project._id}
      />
    </div>
  );
};

export default ProjectDetails;
