import { ReactNode, useContext, useReducer } from "react";
import {
  ActionType,
  ProjectContext,
  ProjectState,
  defaultState,
} from "./ProjectContext";
import { projectReducer } from "./ProjectReducer";

// Context provider for the components
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    (state: ProjectState, action: ActionType) => projectReducer(state, action),
    defaultState
  );

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook for the context
export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within ProjectProvider");
  }
  return context;
};
