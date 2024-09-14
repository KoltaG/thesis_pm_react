import { useEffect } from "react";
import { useAuthContext } from "../../context/authContext/AuthContext";
import { useUserContext } from "../../context/userContext/UserContext";

const UserList = ({}) => {
  const { state, fetchUsers } = useUserContext();
  const { state: authState } = useAuthContext();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = (id: string) => {};

  return (
    <div className="overflow-auto">
      <div className="mb-4 p-2 py-4 bg-gray-300 rounded shadow flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="basis-[100px]">Név</div>
          <div className="font-bold">Role</div>
        </div>
      </div>
      <ul>
        {state.users.map((user) => (
          <li
            key={user._id}
            className="mb-2 p-2 bg-white rounded shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="basis-[100px]">{user.name}</div>
              <div className="font-bold">{user.role}</div>
            </div>
            <div className="flex items-center gap-4">
              {authState.user?._id !== user._id && (
                <button onClick={() => handleDeleteUser(user._id)}>X</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
