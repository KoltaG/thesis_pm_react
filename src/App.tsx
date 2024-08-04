import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContextProvider";
import AppRoutes from "./Routes";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
