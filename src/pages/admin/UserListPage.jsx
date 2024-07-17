import React from "react";
import SideBar from "../../components/Admin/SideBar/SideBar";
import UsersList from "../../components/Admin/Users/UsersList";

function UserListPage() {
  return (
    <div className="flex ">
      <SideBar />
      <UsersList />
    </div>
  );
}

export default UserListPage;
