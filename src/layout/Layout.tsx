import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./Navbar";
import Header from "./Header";

const Layout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <div className="app-container flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar / Navbar */}
      <div
        className={`navbar-container w-64 border-r border-gray-700 fixed md:relative h-full z-20 transform ${
          isNavbarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-900 text-gray-200`}
      >
        <AdminNavbar />
      </div>

      {/* Overlay for Mobile View */}
      {isNavbarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsNavbarOpen(false)}
        ></div>
      )}

      {/* Main Content Container */}
      <div className="main-container flex-1 flex flex-col relative z-0 md:p-4 ">
        <Header
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
        />
        <main className="flex-1 w-full p-6 overflow-auto bg-white md:rounded-xl md:shadow-lg md:mt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
