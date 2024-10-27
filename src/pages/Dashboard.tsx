import PageHeader from "../layout/PageHeader";
import ProjectList from "../components/dashboard/ProjectList";
import { useAuthContext } from "../context/authContext/AuthContext";
import DashboardMetrics from "../components/dashboard/DashboardMetrics";
import DashboardGraph from "../components/dashboard/DashboardGraph";
import { useState } from "react";
import Modal from "../components/common/Modal";
import NewProjectForm from "../components/project/NewProjectForm";

const Dashboard = () => {
  const { state: authState } = useAuthContext();

  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        onAddClick={
          authState.user?.role !== "Dev"
            ? () => setIsCreateProjectOpen(true)
            : undefined
        }
        addText="Add New Project"
      />

      {authState.user?.role !== "Dev" && (
        <>
          <h2 className="text-2xl font-bold mb-4">Metrics</h2>
          <DashboardMetrics />
          <DashboardGraph />
        </>
      )}

      <h2 className="text-2xl font-bold mt-8">Projects</h2>
      <ProjectList />
      <Modal
        isOpen={isCreateProjectOpen}
        setIsOpen={setIsCreateProjectOpen}
        title="Add Project"
      >
        <NewProjectForm onSuccess={() => setIsCreateProjectOpen(false)} />
      </Modal>
    </div>
  );
};

export default Dashboard;
