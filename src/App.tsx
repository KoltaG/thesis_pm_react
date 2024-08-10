import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { UserProvider } from "./context/userContext/UserContextProvider";
import { ProjectProvider } from "./context/projectContext/ProjectContextProvider";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProjectProvider>
          <AppRoutes />
        </ProjectProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
