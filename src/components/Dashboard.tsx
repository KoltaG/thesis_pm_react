import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

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
      <h1 className="text-2xl font-bold mb-4">Projektmenedzser Dashboard</h1>
      <button
        onClick={addProject}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Új projekt hozzáadása
      </button>
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
