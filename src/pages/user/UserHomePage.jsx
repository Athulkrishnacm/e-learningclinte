import React from "react";
import UserHome from "../../components/User/Home/UserHome";
import NavBar from "../../components/User/NavBar/NavBar";
import Footer from "../../components/User/Footer/Footer";
function UserHomePage() {
  return (
    <>
      <NavBar />
      <UserHome />
      <Footer/>
    </>
  );
}

export default UserHomePage;
