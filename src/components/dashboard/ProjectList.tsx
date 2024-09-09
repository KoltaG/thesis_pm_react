import { Link } from "react-router-dom";
import { useProjectContext } from "../../context/projectContext/ProjectContextProvider";

const ProjectList = () => {
  const { state } = useProjectContext();
  return (
    <ul>
      {state.projects.map((project) => (
        <Link
          to={`/project/${project._id}`}
          key={project._id}
        >
          <li
            key={project._id}
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
