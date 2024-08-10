import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./Navbar";
import Header from "./Header";

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
        <Header
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
        />
        <main className="flex-1 w-full p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
