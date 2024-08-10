import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext/UserContextProvider";
import { User } from "../context/userContext/UserContext";

const Navbar = () => {
  const { state, dispatch } = useUserContext();
  const user = state.currentUser as User;

  const onLogout = () => {
    dispatch({ type: "SET_CURRENT_USER", payload: null });
  };
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4">
        {user.role == "PM" ? "PM" : "Dev"} Panel
      </h2>
      <nav className="flex-1">
        <ul>
          <Link to="/">
            <li className="p-4 hover:bg-gray-700">Dashboard</li>
          </Link>
          <li
            className="p-4 hover:bg-gray-700 cursor-pointer"
            onClick={onLogout}
          >
            Kijelentkezés
          </li>
          {/* Add more navigation items here */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
