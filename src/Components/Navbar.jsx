import { Link } from "react-router-dom";
import MyLink from "./MyLink";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout, loading: userLoading } = useContext(AuthContext);

  if (userLoading) return <Loading />;

  const menuItems = (
    <>
      <motion.li whileHover={{ scale: 1.05 }}>
        <MyLink to="/">Home</MyLink>
      </motion.li>

      <motion.li whileHover={{ scale: 1.05 }}>
        <MyLink to="/bills">Bills</MyLink>
      </motion.li>

      {!user && (
        <>
          <motion.li whileHover={{ scale: 1.05 }}>
            <MyLink to="/login">Login</MyLink>
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }}>
            <MyLink to="/register">Register</MyLink>
          </motion.li>
        </>
      )}

      {user && (
        <>
          <motion.li whileHover={{ scale: 1.05 }}>
            <MyLink to="/my-pay-bills">My Pay Bills</MyLink>
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }}>
            <MyLink to="/profile">Profile</MyLink>
          </motion.li>
        </>
      )}
    </>
  );

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="navbar">

          {/* Logo */}
          <div className="navbar-start">
            <Link to="/" className="flex items-center gap-2">
              <motion.img
                whileHover={{ rotate: 10, scale: 1.1 }}
                src="https://images.unsplash.com/photo-1589779137147-3d388746b765?auto=format&fit=crop&q=80&w=687"
                alt="Logo"
                className="h-12 w-12 rounded-full"
              />

              <h1 className="text-xl font-extrabold text-green-700 dark:text-green-400">
                Easy{" "}
                <span className="text-gray-900 dark:text-gray-100">
                  Bill Management System
                </span>
              </h1>
            </Link>
          </div>

          {/* Right Side */}
          <div className="navbar-end flex items-center gap-4">

            {/* Mobile Dropdown */}
            <div className="dropdown lg:hidden">
              <div tabIndex={0} className="btn btn-ghost">
                ☰
              </div>

              <motion.ul
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52 right-0"
              >
                {menuItems}

                {user && (
                  <li>
                    <button
                      onClick={logout}
                      className="text-red-600"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </motion.ul>
            </div>

            {/* Desktop Menu */}
            <ul className="menu menu-horizontal px-1 gap-3 hidden lg:flex">
              {menuItems}
            </ul>

            {/* Avatar */}
            {user && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="dropdown dropdown-end"
              >
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user.photoURL || "https://i.pravatar.cc/150?img=12"}
                      alt="user"
                    />
                  </div>
                </div>

                <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52">
                  <li>
                    <button onClick={logout} className="text-red-500">
                      Logout
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;