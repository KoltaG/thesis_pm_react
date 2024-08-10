import { ActionType, UserState } from "./UserContext";

// Reducer
export const userReducer = (
  state: UserState,
  action: ActionType
): UserState => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };

    default:
      return state;
  }
};
