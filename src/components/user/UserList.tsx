import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext/AuthContext";
import { useUserContext } from "../../context/userContext/UserContext";
import Button from "../common/Button";
import { format } from "date-fns";
import ConfirmModal from "../common/ConfirmModal";

const UserList = () => {
  const { state, fetchUsers, deleteUser } = useUserContext();
  const { state: authState } = useAuthContext();

  const [confirmDeleteId, setConfrimDeleteId] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  return (
    <div className="overflow-auto px-4 pb-6 -mx-4">
      <div className="mb-4 p-3 bg-gray-100 rounded-lg shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1">
          <div className="basis-[130px] text-gray-600 font-medium">Name</div>
          <div className="font-bold text-gray-600">Role</div>
          <div className="font-bold text-gray-600">Registered</div>
        </div>
      </div>

      <ul className="space-y-3">
        {state.users.map((user) => (
          <li
            key={user._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-6 flex-1">
              <div className="basis-[130px] text-gray-800 font-medium">
                {user.name}
              </div>
              <div
                className={`font-bold text-sm ${
                  user.role === "PM" ? "text-green-600" : "text-blue-600"
                }`}
              >
                {user.role}
              </div>
              <div className="basis-[130px] text-gray-800 font-medium">
                {format(new Date(user.createdAt), "PP")}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {authState.user?._id !== user._id && (
                <Button
                  onClick={() => setConfrimDeleteId(user._id)}
                  variant="danger"
                  className="px-3 py-1 text-sm rounded-md hover:bg-red-50 transition-colors"
                >
                  Delete
                </Button>
              )}
            </div>
            <ConfirmModal
              isOpen={confirmDeleteId === user._id}
              setIsOpen={(isOpen) => setConfrimDeleteId(isOpen ? user._id : "")}
              title="Delete User"
              onConfirm={() => handleDeleteUser(user._id)}
              message="Are you sure you want to delete this user?"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
