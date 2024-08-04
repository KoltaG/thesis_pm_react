import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";
import PageHeader from "../layout/PageHeader";

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

      <ul>
        {state.projects.map((project) => (
          <Link to={`/project/${project.id}`}>
            <li
              key={project.id}
              className="mb-2 p-2 bg-white rounded shadow"
            >
              {project.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
