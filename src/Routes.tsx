import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import Layout from "./layout/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Dashboard />}
        />
        <Route
          path="project/:projectId"
          element={<ProjectDetails />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
