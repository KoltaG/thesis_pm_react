import PageHeader from "../layout/PageHeader";
import ProjectList from "../components/dashboard/ProjectList";
import { useProjectContext } from "../context/projectContext/ProjectContextProvider";
import { useAuthContext } from "../context/authContext/AuthContext";
import DashboardMetrics from "../components/dashboard/DashboardMetrics";
import DashboardGraph from "../components/dashboard/DashboardGraph";

const Dashboard = () => {
  const { state: authState } = useAuthContext();

  const { createProject } = useProjectContext();

  const handleCreateProject = () => {
    createProject("New Project");
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        onAddClick={
          authState.user?.role !== "Dev" ? handleCreateProject : undefined
        }
        addText="Add New Project"
      />

      <h2 className="text-2xl font-bold mb-4">Metrics</h2>
      <DashboardMetrics />
      <DashboardGraph />

      <h2 className="text-2xl font-bold mt-8">Projects</h2>
      <ProjectList />
    </div>
  );
};

export default Dashboard;
