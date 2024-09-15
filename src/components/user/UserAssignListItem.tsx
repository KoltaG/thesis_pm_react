import Button from "../common/Button";

interface UserAssignListItemProps {
  user: {
    _id: string;
    name: string;
    role: string;
  };
  projectId: string;
  isAssigned: boolean;
  onAssign: (projectId: string, userId: string) => void;
  onUnassign: (projectId: string, userId: string) => void;
}

const UserAssignListItem = ({
  user,
  projectId,
  isAssigned,
  onAssign,
  onUnassign,
}: UserAssignListItemProps) => {
  return (
    <li className="p-4 bg-white rounded-lg shadow flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <div className="basis-[100px] text-gray-800 font-medium">
          {user.name}
        </div>
        <div
          className={`font-bold text-sm ${
            user.role === "PM" ? "text-green-600" : "text-blue-600"
          }`}
        >
          {user.role}
        </div>
      </div>
      <Button
        variant={isAssigned ? "danger" : "success"}
        onClick={() =>
          isAssigned
            ? onUnassign(projectId, user._id)
            : onAssign(projectId, user._id)
        }
        className={`text-sm px-3 py-1 rounded ${
          isAssigned ? "hover:bg-red-50" : "hover:bg-green-50"
        }`}
      >
        {isAssigned ? "- Unassign" : "+ Assign"}
      </Button>
    </li>
  );
};

export default UserAssignListItem;
