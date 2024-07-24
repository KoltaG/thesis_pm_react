import Dashboard from "./components/Dashboard";
import { AppProvider } from "./context/AppContextProvider";

const App = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100">
        <Dashboard />
      </div>
    </AppProvider>
  );
};

export default App;
