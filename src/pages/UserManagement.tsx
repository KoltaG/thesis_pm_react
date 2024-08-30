import PageHeader from "../layout/PageHeader";
// import UserList from "../components/user/UserList";

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
      {/* <UserList /> */}
    </div>
  );
};

export default UserManagement;
