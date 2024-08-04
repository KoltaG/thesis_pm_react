import { useAppContext } from "../context/AppContextProvider";
import PageHeader from "../layout/PageHeader";
import ProjectList from "../components/dashboard/ProjectList";

const Dashboard = () => {
  const { state, dispatch } = useAppContext();

  const addProject = () => {
    const newProject = {
      id: state.projects.length + 1,
      name: `Projekt ${state.projects.length + 1}`,
    };
    dispatch({ type: "ADD_PROJECT", payload: newProject });
  };

  return (
    <div className="p-4">
      <PageHeader
        title="Projektmenedzser Dashboard"
        onAddClick={addProject}
        addText="Új projekt hozzáadása"
      />
      <ProjectList />
    </div>
  );
};

export default Dashboard;
