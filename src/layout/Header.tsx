import { Link } from "react-router-dom";
import IconHelper from "../components/common/IconHelper";

interface HeaderProps {
  isNavbarOpen: boolean;
  setIsNavbarOpen: (isNavbarOpen: boolean) => void;
}

const Header = ({ isNavbarOpen, setIsNavbarOpen }: HeaderProps) => {
  return (
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
          Koltai Balázs Thesis - <span className="font-bold">React App</span>
        </h2>
      </div>
    </header>
  );
};

export default Header;
