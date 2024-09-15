import PageHeader from "../layout/PageHeader";
import ProjectList from "../components/dashboard/ProjectList";
import { useProjectContext } from "../context/projectContext/ProjectContextProvider";
import { useAuthContext } from "../context/authContext/AuthContext";

const Dashboard = () => {
  const { state: userState } = useAuthContext();
  const { createProject } = useProjectContext();

  const handleCreateProject = () => {
    createProject("New Project");
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        onAddClick={
          userState.user?.role !== "Dev" ? handleCreateProject : undefined
        }
        addText="Add New Project"
      />
      <ProjectList />
    </div>
  );
};

export default Dashboard;
