import { useProjectContext } from "../../context/projectContext/ProjectContextProvider";
import { useUserContext } from "../../context/userContext/UserContextProvider";
import UserAssignListItem from "./UserAssignListItem";

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
    <div className="overflow-auto px-1">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Assigned Users
        </h3>
        <ul className="space-y-2">
          {assignedUsers.map((user) => (
            <UserAssignListItem
              key={user._id}
              user={user}
              projectId={projectId}
              isAssigned={true}
              onAssign={handleAssignUser}
              onUnassign={handleUnassignUser}
            />
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Unassigned Users
        </h3>
        <ul className="space-y-2">
          {unassignedUsers.map((user) => (
            <UserAssignListItem
              key={user._id}
              user={user}
              projectId={projectId}
              isAssigned={false}
              onAssign={handleAssignUser}
              onUnassign={handleUnassignUser}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserAssignList;
