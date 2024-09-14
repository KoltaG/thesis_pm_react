import { createContext, useContext } from "react";
import { User } from "../../DTOs/login.response";

export interface UserState {
  users: User[];
}

// Default state
export const defaultState: UserState = {
  users: [],
};

// Define actions
export type ActionType =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "DELETE_USER"; payload: string };

// Create the context
export const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<ActionType>;
  fetchUsers: () => Promise<void>;
  deleteUser: (_id: string) => Promise<void>;
}>({
  state: defaultState,
  dispatch: () => null,
  fetchUsers: async () => {},
  deleteUser: async () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
