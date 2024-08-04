import { useAppContext } from "../../context/AppContextProvider";

const ProjectList = () => {
  const { state } = useAppContext();
  return (
    <div className="p-4">
      <ul>
        {state.projects.map((project, index) => (
          <li
            key={index}
            className="mb-2 p-2 bg-white rounded shadow"
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
