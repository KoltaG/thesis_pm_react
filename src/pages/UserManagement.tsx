import PageHeader from "../layout/PageHeader";
import { User } from "../context/userContext/UserContext";
import { useUserContext } from "../context/userContext/UserContextProvider";
import UserList from "../components/user/ProjectList";

const UserManagement = () => {
  const { state, dispatch } = useUserContext();
  // const navigate = useNavigate();

  //const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const addUser = () => {
    const newUser: User = {
      id: state.users.length + 1,
      name: "New dev " + (state.users.length + 1),
      role: "Dev",
    };
    dispatch({ type: "ADD_USER", payload: newUser });
  };

  return (
    <div>
      <PageHeader
        title="Felhasználók"
        onAddClick={addUser}
        addText="Új felhasználó hozzáadása"
      />
      <UserList />
    </div>
  );
};

export default UserManagement;
