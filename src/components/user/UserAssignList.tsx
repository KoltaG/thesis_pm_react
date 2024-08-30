// import { useProjectContext } from "../../context/projectContext/ProjectContextProvider";
// import { useUserContext } from "../../context/userContext/UserContextProvider";

// interface UserListProps {
//   projectId: number;
// }

// const UserAssignList = ({ projectId }: UserListProps) => {
//   const { state: userState } = useUserContext();
//   const { state: projectState, dispatch: projectDispatch } =
//     useProjectContext();

//   const assignUser = (projectId: number, userId: number) => {
//     projectDispatch({
//       type: "ASSIGN_USER_TO_PROJECT",
//       payload: { projectId, userId },
//     });
//   };

//   const unassignUser = (projectId: number, userId: number) => {
//     projectDispatch({
//       type: "UNASSIGN_USER_FROM_PROJECT",
//       payload: { projectId, userId },
//     });
//   };

//   const project = projectState.projects.find(
//     (project) => project.id === projectId
//   );

//   const assignedUsers = project?.assignedUsers || [];

//   const unassignedUsers = userState.users.filter(
//     (user) => !assignedUsers.some((assignedUser) => assignedUser.id === user.id)
//   );

//   return (
//     <div className="overflow-auto">
//       <div>
//         <h3 className="mb-4">Assigned Users</h3>
//         <ul>
//           {assignedUsers.map((user) => (
//             <li
//               key={user.id}
//               className="mb-2 p-2 bg-white rounded shadow flex items-center justify-between"
//             >
//               <div className="flex items-center gap-4 flex-1">
//                 <div className="basis-[100px]">{user.name}</div>
//                 <div className="font-bold">{user.role}</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <button onClick={() => unassignUser(projectId, user.id)}>
//                   Unassign
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h3 className="mb-4">Unassigned Users</h3>
//         <ul>
//           {unassignedUsers.map((user) => (
//             <li
//               key={user.id}
//               className="mb-2 p-2 bg-white rounded shadow flex items-center justify-between"
//             >
//               <div className="flex items-center gap-4 flex-1">
//                 <div className="basis-[100px]">{user.name}</div>
//                 <div className="font-bold">{user.role}</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <button onClick={() => assignUser(projectId, user.id)}>
//                   Add
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default UserAssignList;
