import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import TaskList from "../components/project/TaskList";
import { useProjectContext } from "../context/projectContext/ProjectContextProvider";
import { useState } from "react";
import { useAuthContext } from "../context/authContext/AuthContext";
import Modal from "../components/common/Modal";
import UserAssignList from "../components/user/UserAssignList";
import Button from "../components/common/Button";
import NewTaskForm from "../components/project/NewTaskForm";

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { state, deleteProject } = useProjectContext();
  const { state: userState } = useAuthContext();
  const navigate = useNavigate();

  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

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

  const RenderOpenUsers = (): React.ReactNode => {
    return (
      <Button
        onClick={() => setIsUsersOpen(true)}
        variant="info"
      >
        Assigned users
      </Button>
    );
  };

  return (
    <div>
      <PageHeader
        title={`Project: ${project.name}`}
        onDeleteClick={handleDeleteProject}
        addText="Create Task"
        onAddClick={() => setIsCreateTaskOpen(true)}
        extraActions={userState.user?.role !== "Dev" && <RenderOpenUsers />}
      />
      <h1 className="text-2xl font-bold mb-4"></h1>
      <div className="flex gap-4 flex-wrap">
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
      <Modal
        isOpen={isUsersOpen}
        setIsOpen={setIsUsersOpen}
        title="Project Users"
      >
        <UserAssignList projectId={project._id} />
      </Modal>
      <Modal
        isOpen={isCreateTaskOpen}
        setIsOpen={setIsCreateTaskOpen}
        title="Add Task"
      >
        <NewTaskForm
          projectId={project._id}
          onSuccess={() => setIsCreateTaskOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProjectDetails;
