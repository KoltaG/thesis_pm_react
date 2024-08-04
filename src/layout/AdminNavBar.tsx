import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4">Admin Panel</h2>
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

export default AdminNavbar;
