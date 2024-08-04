import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProjectDetails from "./components/ProjectDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
      />
      <Route
        path="/project/:projectId"
        element={<ProjectDetails />}
      />
    </Routes>
  );
};

export default AppRoutes;
