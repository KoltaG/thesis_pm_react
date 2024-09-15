import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal = ({ isOpen, setIsOpen, title, children }: ModalProps) => {
  if (!isOpen) {
    return;
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>

      <div className="bg-white relative rounded-lg shadow-lg p-6 w-full max-w-lg z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-black">{title}</h3>

          <Button
            onClick={() => setIsOpen(false)}
            variant="text"
            className="text-2xl absolute top-4 right-4"
          >
            &times;
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
