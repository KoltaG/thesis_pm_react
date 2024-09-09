// import UserList from "./UserAssignList";

interface UsersModal {
  projectId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UsersModal = ({ projectId, isOpen, setIsOpen }: UsersModal) => {
  if (!isOpen) {
    return;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>

      <div className="bg-white relative rounded-lg shadow-lg p-6 w-full max-w-lg z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-black">Felhasználók</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-gray-700 text-30 font-extrabold absolute top-2 right-6"
          >
            &times;
          </button>
        </div>
        <div>{/* <UserList projectId={projectId} /> */}</div>
      </div>
    </div>
  );
};

export default UsersModal;
