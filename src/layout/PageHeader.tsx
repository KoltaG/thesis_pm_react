import { useLocation, useNavigate } from "react-router-dom";
import IconHelper from "../components/common/IconHelper";
import { useAppContext } from "../context/AppContextProvider";

interface PageHeaderProps {
  title: string;
  onAddClick?: () => void;
  addText?: string;
  onDeleteClick?: () => void;
  deleteText?: string;
}

const PageHeader = ({
  title,
  onAddClick,
  addText,
  onDeleteClick,
  deleteText = "Törlés",
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useAppContext();
  const currentUser = state.currentUser;

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
        <div className="flex items-center gap-4 mb-4">
          {onDeleteClick && currentUser?.role !== "Dev" && (
            <button
              onClick={onDeleteClick}
              className=" p-2 bg-red-500 text-white rounded"
            >
              {deleteText}
            </button>
          )}
          {onAddClick && addText && (
            <button
              onClick={onAddClick}
              className="p-2 bg-green-500 text-white rounded"
            >
              {addText}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
