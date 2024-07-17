import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineExplore, MdOutlineMessage } from "react-icons/md";
function CommunityNavigation() {

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
        <div className="fixed flex   sm:hidden bottom-0 w-full z-50 border-t border-base-300 bg-white ">
            <ul className="menu flex rounded-box menu-horizontal w-full justify-around items-end bg-base-100 my-5">
                {CommunitySidebarLink.map((item) => (
                    <li key={item.label}>
                        <Link
                            to={item.to}
                            className={item.to === location.pathname ? "text-primary" : ""}
                        >
                            {item.icon}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CommunityNavigation