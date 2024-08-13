import PageHeader from "../layout/PageHeader";
import ProjectList from "../components/dashboard/ProjectList";
import { useProjectContext } from "../context/projectContext/ProjectContextProvider";
import { useUserContext } from "../context/userContext/UserContextProvider";

const Dashboard = () => {
  const { state, dispatch } = useProjectContext();
  const { state: userState } = useUserContext();

  const addProject = () => {
    const newProject = {
      id: state.projects.length + 1,
      name: `Projekt ${state.projects.length + 1}`,
      assignedUsers: [],
    };

    dispatch({ type: "ADD_PROJECT", payload: newProject });
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        onAddClick={
          userState.currentUser?.role !== "Dev" ? addProject : undefined
        }
        addText="Új projekt hozzáadása"
      />
      <ProjectList />
    </div>
  );
};

export default Dashboard;
