import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useProjectContext } from "../../context/projectContext/ProjectContextProvider";
import { Task, Project } from "../../context/projectContext/ProjectContext";
import { useUserContext } from "../../context/userContext/UserContext";

interface DataPoint {
  name: string;
  users: number;
  projects: number;
  tasks: number;
}

const DashboardGraph = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const { state } = useProjectContext();
  const { state: userState } = useUserContext();

  useEffect(() => {
    // Process data to group by month
    const processData = () => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthlyData: DataPoint[] = months.map((month) => ({
        name: month,
        users: 0,
        projects: 0,
        tasks: 0,
      }));

      userState.users.forEach((user) => {
        const monthIndex = new Date(user.createdAt).getMonth();
        monthlyData[monthIndex].users += 1;
      });

      state.projects.forEach((project: Project) => {
        const monthIndex = new Date(project.createdAt).getMonth();
        monthlyData[monthIndex].projects += 1;
      });

      state.projects.forEach((project: Project) => {
        project.tasks.forEach((task: Task) => {
          const monthIndex = new Date(task.createdAt).getMonth();
          monthlyData[monthIndex].tasks += 1;
        });
      });

      return monthlyData;
    };

    setData(processData());
  }, [state.projects]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Project & Task Trends
      </h3>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#22c55e"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="projects"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#a855f7"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardGraph;
