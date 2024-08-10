import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext/UserContextProvider";
import { User } from "../context/userContext/UserContext";

const Navbar = () => {
  const { state } = useUserContext();
  const user = state.currentUser as User;
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
          {/* Add more navigation items here */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
