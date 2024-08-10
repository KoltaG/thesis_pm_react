import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import { useUserContext } from "./context/userContext/UserContextProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import UserManagement from "./pages/UserManagement";

const AppRoutes = () => {
  const { state } = useUserContext();

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

        <Route
          path="/user-management"
          element={
            <ProtectedRoute
              isAuthenticated={state.currentUser.role !== "Dev"}
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
