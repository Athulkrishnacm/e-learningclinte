import React from "react";
import { BiMoon } from "react-icons/bi";
import dp from "/assets/tutor/default-dp.png"

function NavBar() {
  return (
    <div className="flex justify-between mx-10 my-5 gap-6">
      <div>
        <h1 className="text-4xl font-bold ">Instructor Dashboard</h1>
      </div>
      <div>
      <img className="w-14" src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="user-profile" />
      </div>
    </div>
  );
}

export default NavBar;
