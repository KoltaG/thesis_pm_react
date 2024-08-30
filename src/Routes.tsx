import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import { ProtectedRoute } from "./ProtectedRoute";
import UserManagement from "./pages/UserManagement";
import { useAuthContext } from "./context/authContext/AuthContext";

const AppRoutes = () => {
  const { state } = useAuthContext();

  if (!state.isLoggedIn) {
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

        <Route
          path="/user-management"
          element={
            <ProtectedRoute
              isAuthenticated={state.user?.role === "PM"}
              redirectPath="/"
            >
              <UserManagement />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
