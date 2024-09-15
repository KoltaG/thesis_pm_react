import Modal from "./Modal";
import Button from "./Button";

interface ConfirmModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  message: string;
  onConfirm: () => void;
}

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  title = "Confirm Action",
  message,
  onConfirm,
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
    >
      <p className="mb-6 text-gray-700">{message}</p>
      <div className="flex justify-end gap-4">
        <Button
          onClick={() => setIsOpen(false)}
          variant="text"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="info"
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
