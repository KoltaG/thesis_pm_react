import { useState } from "react";
import UserList from "../components/user/UserList";
import PageHeader from "../layout/PageHeader";
import Modal from "../components/common/Modal";
import NewUserForm from "../components/user/NewUserForm";

const UserManagement = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="User Management"
        onAddClick={() => setIsAddUserOpen(true)}
        addText="Add User"
      />
      <UserList />
      <Modal
        isOpen={isAddUserOpen}
        setIsOpen={setIsAddUserOpen}
        title="Add User"
      >
        <NewUserForm onSuccess={() => setIsAddUserOpen(false)} />
      </Modal>
    </div>
  );
};

export default UserManagement;
