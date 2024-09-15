import { Link } from "react-router-dom";
import HamburgerIcon from "../icons/HamburgerIcon";

interface HeaderProps {
  isNavbarOpen: boolean;
  setIsNavbarOpen: (isNavbarOpen: boolean) => void;
}

const Header = ({ isNavbarOpen, setIsNavbarOpen }: HeaderProps) => {
  return (
    <header className="w-full shadow md:rounded-xl bg-white px-4 py-2 flex justify-between items-center space-x-4">
      <button
        className="text-black rounded border p-2 md:hidden"
        onClick={() => setIsNavbarOpen(!isNavbarOpen)}
      >
        <HamburgerIcon className="w-6 h-6" />
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
          Koltai Balázs Thesis - <span className="font-bold">React App</span>
        </h2>
      </div>
    </header>
  );
};

export default Header;
