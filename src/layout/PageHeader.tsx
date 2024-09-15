import { useLocation, useNavigate } from "react-router-dom";
import IconHelper from "../components/common/IconHelper";
import { useAuthContext } from "../context/authContext/AuthContext";
import Button from "../components/common/Button";

interface PageHeaderProps {
  title: string;
  onAddClick?: () => void;
  addText?: string;
  onDeleteClick?: () => void;
  deleteText?: string;
  extraActions?: React.ReactNode;
}

const PageHeader = ({
  title,
  onAddClick,
  addText,
  onDeleteClick,
  deleteText = "Delete",
  extraActions,
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useAuthContext();
  const currentUser = state.user;

  return (
    <header className="mb-4">
      {location.pathname !== "/" && (
        <Button
          onClick={() => navigate(-1)}
          variant="text"
          className="!px-0"
        >
          <IconHelper
            icon="arrowUp"
            iconProps={{ className: "-rotate-90 w-6 h-6" }}
          />
          Back
        </Button>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-4 mb-4">
          {extraActions}
          {onDeleteClick && currentUser?.role !== "Dev" && (
            <Button
              onClick={onDeleteClick}
              variant="danger"
            >
              {deleteText}
            </Button>
          )}
          {onAddClick && addText && (
            <Button
              onClick={onAddClick}
              variant="success"
            >
              {addText}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
