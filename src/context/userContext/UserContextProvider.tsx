import { ReactNode, useContext, useEffect, useReducer } from "react";
import { userReducer } from "./UserReducer";
import { defaultState, UserContext } from "./UserContext";
import { useAuthContext } from "../authContext/AuthContext";

import userService from "../../utils/services/userService";
import { toast } from "react-toastify";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, defaultState);
  const { state: authState } = useAuthContext();

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const users = await userService.fetchUsers();
      dispatch({ type: "SET_USERS", payload: users });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      //toast.error("Error fetching users.");
    }
  };

  // Delete a user
  const deleteUser = async (_id: string) => {
    try {
      await userService.deleteUser(_id);
      dispatch({ type: "DELETE_USER", payload: _id });
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Error deleting user.");
    }
  };

  // Use useEffect to fetch users on load
  useEffect(() => {
    if (authState.isLoggedIn) {
      fetchUsers();
    }
  }, [authState.isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        fetchUsers,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
};
