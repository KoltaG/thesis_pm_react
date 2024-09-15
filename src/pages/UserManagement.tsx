import { useState } from "react";
import UserList from "../components/user/UserList";
import PageHeader from "../layout/PageHeader";
import Modal from "../components/common/Modal";
import NewUserForm from "../components/user/NewUserForm";

const UserManagement = () => {
  // const navigate = useNavigate();

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Felhasználók"
        onAddClick={() => setIsAddUserOpen(true)}
        addText="Új felhasználó hozzáadása"
      />
      <UserList />
      <Modal
        isOpen={isAddUserOpen}
        setIsOpen={setIsAddUserOpen}
      >
        <NewUserForm onSuccess={() => setIsAddUserOpen(false)} />
      </Modal>
    </div>
  );
};

export default UserManagement;
