import React from "react";
import UserSignup from "../../components/Auth/SignUp/UserSignup";
import NavBar from "../../components/User/NavBar/NavBar";

function userSignupPage() {
  return(
    <>
    <NavBar/>
    <UserSignup />;
    </>

  ) 
}

export default userSignupPage;
