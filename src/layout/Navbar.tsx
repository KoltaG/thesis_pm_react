import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext/AuthContext";
import { User } from "../DTOs/login.response";

const Navbar = () => {
  const { state, logout } = useAuthContext();
  const user = state.user as User;

  const onLogout = () => {
    logout();
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
          {state.user?.role !== "Dev" && (
            <Link to="/user-management">
              <li className="p-4 hover:bg-gray-700">Felhasználók</li>
            </Link>
          )}
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
