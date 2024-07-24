import { ReactNode, useContext, useReducer } from "react";
import { AppContext, defaultState } from "./AppContext";
import { appReducer } from "./AppReducer";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook a context használatához
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApContext must be used within AppProvider");
  }
  return context;
};
