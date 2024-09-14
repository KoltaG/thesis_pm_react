import { ActionType, UserState } from "./UserContext";

export const userReducer = (
  state: UserState,
  action: ActionType
): UserState => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    default:
      return state;
  }
};
