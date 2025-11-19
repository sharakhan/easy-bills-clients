import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-gray-300 py-10 mt-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo + Name */}
        <div className="flex flex-col gap-3">
          <img
            src="https://images.unsplash.com/photo-1589779137147-3d388746b765?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
            alt="Easy Bill Logo"
            className="w-16 h-16 rounded-full object-cover"
          />
          <h2 className="text-xl font-semibold text-white">Easy - Bill Management System</h2>
          <p className="text-sm text-gray-400 dark:text-gray-300">
            Manage your bills easily in one place. Track, pay, and stay updated.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-3 text-xl">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/bills" className="hover:text-white">Bills</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>

        {/* Theme Toggle + Copyright */}
        <div className="flex flex-col justify-between items-start md:items-end">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 mb-4 text-sm border rounded-md hover:bg-gray-700 dark:hover:bg-gray-600"
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>

          <p className="text-sm text-gray-400 dark:text-gray-300">© {new Date().getFullYear()} Easy Bill. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}
