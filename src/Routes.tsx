import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import { useAppContext } from "./context/AppContextProvider";

const AppRoutes = () => {
  const { state } = useAppContext();
  if (!state.currentUser) {
    return <Login />;
  }
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Dashboard />}
        />
        <Route
          path="/project/:projectId"
          element={<ProjectDetails />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
