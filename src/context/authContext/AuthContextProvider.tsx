import { useEffect, useReducer } from "react";
import { AuthContext, initialState } from "./AuthContext";
import { AuthReducer } from "./AuthReducer";
import { tokenExpired } from "../../utils/tokenTools";
import { LoginResponse, User } from "../../DTOs/login.response";
import authService from "../../utils/services/authService";

interface AuthContextProviderProps {
  children: React.ReactNode;
  autoLoginReady: () => void;
}

export const AuthContextProvider = ({
  children,
  autoLoginReady,
}: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const access_token = localStorage.getItem("access_token");
      const userString = localStorage.getItem("user");

      const user = userString ? JSON.parse(userString) : null;

      if (access_token && user) {
        if (!tokenExpired(access_token, 60000)) {
          console.log("Access token is valid");
          //  await updateUser();  // TODO: Check why it gives 401, and if needed
          //console.log("User updated");
          const userString = localStorage.getItem("user");
          const user = userString ? JSON.parse(userString) : null;
          dispatch({
            type: "INIT",
            payload: user as unknown as User,
          });
        } else {
          await logout();
        }
      } else {
        dispatch({
          type: "LOADED",
        });
      }
      autoLoginReady();
    };
    checkAuthStatus();
  }, []);

  const tryLogin = async (email: string, password: string) => {
    const response = await authService.postLogin(email, password);

    console.log("response: ", response);

    const responseData: LoginResponse = response.data;

    let user = responseData.user;

    localStorage.setItem("access_token", responseData.token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: "LOGIN",
      payload: user,
    });
  };

  const logout = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        tryLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
