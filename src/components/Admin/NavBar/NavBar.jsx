import React from "react";
import { BiMoon } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

function NavBar() {
  return (
    <div className="flex justify-end m-5 gap-6">
      {React.createElement(BiMoon, { size: "30", color: "white" })}
      {React.createElement(AiOutlineUser, { size: "30", color: "white" })}
    </div>
  );
}

export default NavBar;
