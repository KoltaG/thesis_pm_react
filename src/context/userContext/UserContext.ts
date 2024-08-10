import { createContext } from "react";
import { testUsers } from "../../_MOCK/users";

export type Role = "PM" | "Dev";
export interface User {
  id: number;
  name: string;
  role: Role;
}

export interface UserState {
  currentUser: User | null;
  users: User[];
}

export const defaultState: UserState = {
  currentUser: null,
  users: testUsers, // Mock Users for development purposes
};

// Actions
export type ActionType =
  | { type: "SET_CURRENT_USER"; payload: User }
  | { type: "ADD_USER"; payload: User };

// Context
export const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: defaultState,
  dispatch: () => null,
});
