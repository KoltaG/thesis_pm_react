import { useProjectContext } from "../../context/projectContext/ProjectContextProvider";
import { useUserContext } from "../../context/userContext/UserContextProvider";

interface UserListProps {
  projectId: string;
}

const UserAssignList = ({ projectId }: UserListProps) => {
  const { state: userState } = useUserContext();
  const {
    state: projectState,
    assignUserToProject,
    unassignUserFromProject,
  } = useProjectContext();

  const handleAssignUser = (projectId: string, userId: string) => {
    assignUserToProject(projectId, userId);
  };

  const handleUnassignUser = (projectId: string, userId: string) => {
    unassignUserFromProject(projectId, userId);
  };

  const project = projectState.projects.find(
    (project) => project._id === projectId
  );

  const assignedUsers = userState.users.filter((user) =>
    project?.assignedUserIds?.some(
      (assignedUserId) => assignedUserId === user._id
    )
  );

  const unassignedUsers = userState.users.filter(
    (user) =>
      !project?.assignedUserIds?.some(
        (assignedUser) => assignedUser === user._id
      )
  );

  return (
    <div className="overflow-auto">
      <div>
        <h3 className="mb-4">Assigned Users</h3>
        <ul>
          {assignedUsers.map((user) => (
            <li
              key={user._id}
              className="mb-2 p-2 bg-white rounded shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="basis-[100px]">{user.name}</div>
                <div className="font-bold">{user.role}</div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => handleUnassignUser(projectId, user._id)}>
                  Unassign
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4">Unassigned Users</h3>
        <ul>
          {unassignedUsers.map((user) => (
            <li
              key={user._id}
              className="mb-2 p-2 bg-white rounded shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="basis-[100px]">{user.name}</div>
                <div className="font-bold">{user.role}</div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => handleAssignUser(projectId, user._id)}>
                  Add
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserAssignList;
