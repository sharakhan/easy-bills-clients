import React from "react";
import { NavLink } from "react-router-dom";

const MyLink = ({ to, children }) => {
    return (

        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-3 font-semibold transition-colors duration-200 ${isActive ? "text-[#ffc86f] border-b-2 border-[#ffc86f]" : "hover:text-[#ffc86f]"
                }`
            }
        >
            {children}
        </NavLink>
    );
};

export default MyLink;