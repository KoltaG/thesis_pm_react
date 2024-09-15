import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext/AuthContext";
import Button from "../components/common/Button";
import ArrowUpIcon from "../icons/ArrowUpIcon";

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
          <ArrowUpIcon className="w-6 h-6 -rotate-90" />
          Back
        </Button>
      )}
      <div className="flex items-center justify-between flex-wrap gap-2s">
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
