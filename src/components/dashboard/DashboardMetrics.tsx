import { useProjectContext } from "../../context/projectContext/ProjectContext";
import { useUserContext } from "../../context/userContext/UserContext";
import ProjectIcon from "../../icons/ProjectIcon";
import TaskIcon from "../../icons/TaskIcon";
import UserIcon from "../../icons/UserIcon";
import MetricCard from "./MetricCard";

const DashboardMetrics = ({}) => {
  const { state: projectState } = useProjectContext();
  const { state: userState } = useUserContext();

  const projectCount = projectState.projects.length;
  const userCount = userState.users.length;
  const taskCount = projectState.projects.reduce(
    (acc, project) => acc + project.tasks.length,
    0
  );

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
      <MetricCard
        title="Users"
        value={userCount}
        color="border-green-500"
        icon={<UserIcon className="h-6 w-6 text-green-500" />}
      />
      <MetricCard
        title="Projects"
        value={projectCount}
        color="border-blue-500"
        icon={<ProjectIcon className="h-6 w-6 text-blue-500" />}
      />
      <MetricCard
        title="Tasks"
        value={taskCount}
        color="border-purple-500"
        icon={<TaskIcon className="h-6 w-6 text-purple-500" />}
      />
    </div>
  );
};

export default DashboardMetrics;
