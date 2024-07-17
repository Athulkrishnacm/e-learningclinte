import React from "react";
import SideBar from "../../components/Admin/SideBar/SideBar";
import AdminDashboard from "../../components/Admin/Dashboard/AdminDashboard";

function Dashboard() {
  return (
    <div className="flex">
      <SideBar />
      <AdminDashboard />
    </div>
  );
}

export default Dashboard;
