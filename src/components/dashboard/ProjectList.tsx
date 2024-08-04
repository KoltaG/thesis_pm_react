import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContextProvider";

const ProjectList = () => {
  const { state } = useAppContext();
  return (
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
  );
};

export default ProjectList;
