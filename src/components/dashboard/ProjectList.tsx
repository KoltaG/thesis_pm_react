import { Link } from "react-router-dom";
import { useProjectContext } from "../../context/projectContext/ProjectContextProvider";
import { format } from "date-fns";

const ProjectList = () => {
  const { state } = useProjectContext();

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {state.projects
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((project) => (
          <Link
            to={`/project/${project._id}`}
            key={project._id}
            className="block bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md p-5 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {project.name}
            </h3>
            <p className="text-sm text-gray-600 font-medium mb-2">
              Created on:{" "}
              {project.createdAt
                ? format(new Date(project.createdAt), "PP")
                : "N/A"}
            </p>

            <h4 className="text-sm font-semibold text-blue-700 mb-2">
              Assigned Users: {project.assignedUserIds.length}
            </h4>

            <p className="text-sm text-blue-600 font-medium">
              Tasks: {project.tasks.length}
            </p>
          </Link>
        ))}
    </div>
  );
};

export default ProjectList;
