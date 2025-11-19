// components/Navbar.jsx
import { Link } from "react-router-dom";
import MyLink from "./MyLink";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";

const Navbar = () => {
  const { user, logout, loading: userLoading } = useContext(AuthContext); // logout + loading

  if (userLoading) return <Loading />;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="navbar">
          {/* Logo */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
              >
                <li>
                  <MyLink to="/">Home</MyLink>
                </li>
                <li>
                  <MyLink to="/bills">Bills</MyLink>
                </li>
                {!user && (
                  <li>
                    <MyLink to="/login">Login</MyLink>
                  </li>
                )}
                {!user && (
                  <li>
                    <MyLink to="/register">Register</MyLink>
                  </li>
                )}
                {user && (
                  <li>
                    <MyLink to="/my-pay-bills">My Pay Bills</MyLink>
                  </li>
                )}
                {user && (
                  <li>
                    <MyLink to="/profile">Profile</MyLink>
                  </li>
                )}
                {user && (
                  <li>
                    <button onClick={logout} className="text-red-500">
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>

            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1589779137147-3d388746b765?auto=format&fit=crop&q=80&w=687"
                alt="Logo"
                className="h-12 w-12 rounded-full"
              />
              <div className="leading-tight">
                <h1 className="text-xl font-extrabold text-green-700">
                  Easy{" "}
                  <span className="text-gray-900">Bill Management System</span>
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">
              <li>
                <MyLink to="/">Home</MyLink>
              </li>
              <li>
                <MyLink to="/bills">Bills</MyLink>
              </li>
              {!user && (
                <li>
                  <MyLink to="/login">Login</MyLink>
                </li>
              )}
              {!user && (
                <li>
                  <MyLink to="/register">Register</MyLink>
                </li>
              )}
              {user && (
                <li>
                  <MyLink to="/my-pay-bills">My Pay Bills</MyLink>
                </li>
              )}
              {user && (
                <li>
                  <MyLink to="/profile">Profile</MyLink>
                </li>
              )}
            </ul>
          </div>

          {/* Right side */}
          <div className="navbar-end gap-2">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user.photoURL || "https://i.pravatar.cc/150?img=12"}
                      alt="Avatar"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
                >
                  <li>
                    <MyLink to="/profile">Profile</MyLink>
                  </li>
                  <li>
                    <button onClick={logout} className="text-red-500">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="btn btn-sm border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm bg-green-700 text-white hover:bg-green-800"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
