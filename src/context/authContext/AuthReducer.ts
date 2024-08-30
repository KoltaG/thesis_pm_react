import { AuthAction, AuthHandlers, AuthState } from "./AuthContext";

export const AuthReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthHandlers.INIT:
      if (action.payload) {
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
          isLoading: false,
        };
      }
      return {
        ...state,
        isLoggedIn: false,
      };
    case AuthHandlers.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        isLoading: false,
      };
    case AuthHandlers.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
        isLoading: false,
      };
    case AuthHandlers.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AuthHandlers.LOADED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
