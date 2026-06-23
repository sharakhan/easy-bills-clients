import React from "react";
import { NavLink } from "react-router-dom";

const MyLink = ({ to, children }) => {
    return (

        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-3 font-bold text-xl text-white transition-colors duration-200 ${isActive ? "text-green-700 border-b-2 border-white-700" : "hover:text-green-500"
                }`
            }
        >
            {children}
        </NavLink>
    );
};

export default MyLink;