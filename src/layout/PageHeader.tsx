import { useLocation, useNavigate } from "react-router-dom";
import IconHelper from "../components/common/IconHelper";

interface PageHeaderProps {
  title: string;
  onAddClick?: () => void;
  addText?: string;
}

const PageHeader = ({ title, onAddClick, addText }: PageHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="mb-4">
      {location.pathname !== "/" && (
        <button
          className="text-black flex items-center gap-2 mb-2"
          onClick={() => navigate(-1)}
        >
          <IconHelper
            icon="arrowUp"
            iconProps={{ className: "-rotate-90 w-6 h-6" }}
          />
          Vissza
        </button>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {onAddClick && addText && (
          <button
            onClick={onAddClick}
            className="mb-4 p-2 bg-green-500 text-white rounded"
          >
            {addText}
          </button>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
