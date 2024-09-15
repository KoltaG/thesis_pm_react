import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { ProjectProvider } from "./context/projectContext/ProjectContextProvider";
import useNetwork from "./hooks/useNetwork";
import { useEffect, useState, useCallback } from "react";
import { AuthContextProvider } from "./context/authContext/AuthContextProvider";
import { UserProvider } from "./context/userContext/UserContextProvider";
import { ToastContainer } from "react-toastify";

const App = () => {
  useNetwork(); // Set up network listener, see src/hooks/useNetwork.ts

  const [hasAttemptedAutoLogin, setHasAttemptedAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hasAttemptedAutoLogin) {
      setIsLoading(false);
    }
  }, [hasAttemptedAutoLogin]);

  const onAutoLoginReady = useCallback(() => {
    setHasAttemptedAutoLogin(true);
  }, []);

  return (
    <BrowserRouter>
      <AuthContextProvider autoLoginReady={onAutoLoginReady}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <UserProvider>
            <ProjectProvider>
              <AppRoutes />
              <ToastContainer />
            </ProjectProvider>
          </UserProvider>
        )}
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
