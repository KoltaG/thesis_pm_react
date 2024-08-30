// import { useUserContext } from "../../context/userContext/UserContextProvider";

// const UserList = () => {
//   const { state, dispatch } = useUserContext();

//   const deleteUser = (userId: number) => {
//     dispatch({ type: "DELETE_USER", payload: { id: userId } });
//   };

//   return (
//     <div className="overflow-auto">
//       <div className="mb-4 p-2 py-4 bg-gray-300 rounded shadow flex items-center justify-between">
//         <div className="flex items-center gap-4 flex-1">
//           <div className="basis-[100px]">Név</div>
//           <div className="font-bold">Role</div>
//         </div>
//       </div>
//       <ul>
//         {state.users.map((user) => (
//           <li
//             key={user.id}
//             className="mb-2 p-2 bg-white rounded shadow flex items-center justify-between"
//           >
//             <div className="flex items-center gap-4 flex-1">
//               <div className="basis-[100px]">{user.name}</div>
//               <div className="font-bold">{user.role}</div>
//             </div>
//             <div className="flex items-center gap-4">
//               {state.currentUser?.id !== user.id && (
//                 <button onClick={() => deleteUser(user.id)}>X</button>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;
