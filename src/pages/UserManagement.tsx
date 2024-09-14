import UserList from "../components/user/UserList";
import PageHeader from "../layout/PageHeader";

const UserManagement = () => {
  // const navigate = useNavigate();

  //const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Felhasználók"
        // onAddClick={addUser}
        addText="Új felhasználó hozzáadása"
      />
      <UserList />
    </div>
  );
};

export default UserManagement;
