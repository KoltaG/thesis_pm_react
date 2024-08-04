import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import IconHelper from "../components/common/IconHelper";
import AdminNavbar from "./AdminNavBar";

const Layout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <div className="app-container flex h-screen overflow-hidden">
      <div
        className={`navbar-container w-64 border-r border-secondary fixed md:relative h-full z-20 transform ${
          isNavbarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-800`}
      >
        <AdminNavbar />
      </div>

      {isNavbarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsNavbarOpen(false)}
        ></div>
      )}

      {/* Main Content Container */}
      <div className="main-container flex-1 flex flex-col relative z-0">
        <header className="w-full shadow px-4 py-2 flex justify-between items-center space-x-4">
          <button
            className="text-black rounded border p-2 md:hidden"
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          >
            <IconHelper icon="hamburger" />
          </button>
          <div className="flex flex-1 items-center gap-4">
            <Link to="/">
              <img
                src="/react.svg"
                alt="Logo"
                className="h-8"
              />
            </Link>
            <h2>
              Koltai Balázs Thesis -{" "}
              <span className="font-bold">React App</span>
            </h2>
          </div>
        </header>

        <main className="flex-1 w-full p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
