import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineExplore, MdOutlineMessage } from "react-icons/md";

function CommunitySidebar() {

  const CommunitySidebarLink = [
    {
      label: "Explore groups",
      icon: <MdOutlineExplore size={22} />,
      to: "/community",
    },
    {
      label: "Messages",
      icon: <MdOutlineMessage size={22} />,
      to: "/messages",
    },
  ];
  return (
    <>
      <ul className="menu hidden sm:flex sm:flex-col overflow-y-auto bg-base-100 text-base xl:w-64 m-10">
        {CommunitySidebarLink.map((item) => (
          <li
            key={item.label}
            className={`${
              item.to === location.pathname
                ? "border-l-4 border-blue-500"
                : "border-l-4 border-base-100"
            }`}>
            <Link to={item.to}>
              <div className="flex m-5">
                {item.icon}
                <span className="hidden xl:block mx-4">{item.label}</span>
              </div>
            </Link>
          </li>
        ))}
        <div className="my-3 border-t border-base-300" />
      </ul>
    </>
  );
}

export default CommunitySidebar;
