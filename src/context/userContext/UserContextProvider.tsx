import { ReactNode, useContext, useReducer } from "react";
import { userReducer } from "./UserReducer";
import { defaultState, UserContext } from "./UserContext";

// Context provider for the components
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, defaultState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within userContextProvider");
  }
  return context;
};
