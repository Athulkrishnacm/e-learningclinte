import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaUserGraduate } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { tutorMenus } from "../../../constants/constant";
import { tutorUnauthorized } from "../../../Redux/app/tutorSlice";
import { useDispatch } from "react-redux";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("");
  const currentpath = location.pathname;
  const { tutorName } = useSelector((state) => state.tutor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(tutorUnauthorized());
    localStorage.removeItem("tutorToken");
    navigate("/tutor");
  };
  useEffect(() => {
    const currentMenu = tutorMenus.find((item) => item.link === currentpath);
    setActive(currentMenu?.name);
  }, [currentpath]);

  return (
    <div
      className={`bg-[#1F2A40] min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}>
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      {open && (
        <div className=" bg-[#2a3a5fed] rounded-md py-7 px-5 my-5">
          <div className="flex">
            {React.createElement(FaUserGraduate, {
              size: "30",
              color: "#70D8BD",
            })}
            <span className="text-xl mx-3">{tutorName}</span>
          </div>
          <p className="mt-2 text-md">Tutor</p>
        </div>
      )}

      <div
        className={`mt-10 max-sm:mt-16 ${
          open ? "ml-5" : ""
        } max-sm:ml-0 flex flex-col gap-4 relative`}>
        {tutorMenus?.map((menu, i) =>
          menu.name === "Logout" ? (
            <div
              key={i}
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-950 rounded-md cursor-pointer ${
                active === menu.name && "bg-gray-950 translate-x-1"
              }`}
              onClick={handleLogout}>
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}>
                {menu.name}
              </h2>
            </div>
          ) : (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-950 rounded-md ${
                active === menu.name && "bg-gray-950 translate-x-1"
              }`}>
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}>
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}>
                {menu?.name}
              </h2>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default SideBar;
