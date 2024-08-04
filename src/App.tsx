import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContextProvider";
import AppRoutes from "./Routes";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-gray-100">
          <AppRoutes />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
