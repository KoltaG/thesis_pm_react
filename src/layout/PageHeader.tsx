import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext/AuthContext";
import Button from "../components/common/Button";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import { useState } from "react";
import ConfirmModal from "../components/common/ConfirmModal";

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

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpne] = useState(false);

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
          {onDeleteClick && currentUser?.role !== "Dev" && (
            <Button
              onClick={() => setIsConfirmDeleteOpne(true)}
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
          {extraActions}
        </div>
      </div>
      {onDeleteClick && (
        <ConfirmModal
          isOpen={isConfirmDeleteOpen}
          setIsOpen={setIsConfirmDeleteOpne}
          title="Delete Project"
          onConfirm={onDeleteClick}
          message="Are you sure you want to delete this project?"
        />
      )}
    </header>
  );
};

export default PageHeader;
