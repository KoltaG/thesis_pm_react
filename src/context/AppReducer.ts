import { ActionType, AppState } from "./appContext";

// Reducer
export const appReducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    default:
      return state;
  }
};
