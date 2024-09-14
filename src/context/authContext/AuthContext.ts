import React, { createContext } from "react";
import { User } from "../../DTOs/login.response";

export type AuthState = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user?: User;
};

export const AuthHandlers = {
  INIT: "INIT",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  LOADING: "LOADING",
  LOADED: "LOADED",
} as const;

export type AuthAction = {
  type: (typeof AuthHandlers)[keyof typeof AuthHandlers];
  payload?: User;
};

export const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: true,
  user: undefined,
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  tryLogin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  tryLogin: async () => {},
  logout: async () => {},
});

export const useAuthContext = () => React.useContext(AuthContext);
