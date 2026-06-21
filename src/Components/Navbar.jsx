import { Link } from "react-router-dom";
import MyLink from "./MyLink";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
  const { user, logout, loading: userLoading } = useContext(AuthContext);

  // Get saved theme
  const saved = localStorage.getItem("assignment-no10-private-theme") || "light";
const [theme, setTheme] = useState(saved);

useEffect(() => {
  const html = document.querySelector("html");

  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  localStorage.setItem("assignment-no10-private-theme", theme);
}, [theme]);


  if (userLoading) return <Loading />;

  const menuItems = (
    <>
      <li><MyLink to="/">Home</MyLink></li>
      <li><MyLink to="/bills">Bills</MyLink></li>

      {!user && (
        <>
          <li><MyLink to="/login">Login</MyLink></li>
          <li><MyLink to="/register">Register</MyLink></li>
        </>
      )}

      {user && (
        <>
          <li><MyLink to="/my-pay-bills">My Pay Bills</MyLink></li>
          <li><MyLink to="/profile">Profile</MyLink></li>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="navbar">

          {/* Logo */}
          <div className="navbar-start">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1589779137147-3d388746b765?auto=format&fit=crop&q=80&w=687"
                alt="Logo"
                className="h-12 w-12 rounded-full"
              />
              <h1 className="text-xl font-extrabold text-green-700 dark:text-green-400">
                Easy <span className="text-gray-900 dark:text-gray-100">Bill Management System</span>
              </h1>
            </Link>
          </div>

          {/* Right Items */}
          <div className="navbar-end flex items-center gap-4">

            {/* Mobile menu */}
            <div className="dropdown lg:hidden">
              <div tabIndex={0} className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>

              <ul tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52 right-0">
                {menuItems}
                {user && (
                  <li>
                    <button onClick={logout} className="text-red-500">Logout</button>
                  </li>
                )}
                {/* Mobile theme toggle */}
                <li className="mt-2">
                  <ThemeToggler theme={theme} setTheme={setTheme} />
                </li>
              </ul>
            </div>

            {/* Desktop menu */}
            <ul className="menu menu-horizontal px-1 gap-3 hidden lg:flex">
              {menuItems}
            </ul>

            {/* Desktop Theme Toggle */}
            <div className="hidden lg:flex">
              <ThemeToggler theme={theme} setTheme={setTheme} />
            </div>

            {/* Avatar */}
            {user && (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL || "https://i.pravatar.cc/150?img=12"} />
                  </div>
                </div>

                <ul tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52">
                  <li>
                    <button onClick={logout} className="text-red-500">Logout</button>
                  </li>
                </ul>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
