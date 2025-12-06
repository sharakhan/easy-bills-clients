import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

        {/* Logo + About */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <img
            src="https://images.unsplash.com/photo-1589779137147-3d388746b765?auto=format&fit=crop&q=80&w=200"
            alt="Easy Bill Logo"
            className="w-16 h-16 rounded-full object-cover shadow-md"
          />
          <h2 className="text-xl font-semibold text-white">
            Easy - Bill Management System
          </h2>
          <p className="text-sm text-gray-400 max-w-xs">
            Manage your bills easily in one place. Track, pay, and stay updated.
          </p>
        </div>

        {/* Useful Links - Center */}
        <div className="flex flex-col items-center">
          <h3 className="text-white font-semibold mb-4 text-lg">Useful Links</h3>
          <ul className="space-y-2 text-sm text-center">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/bills" className="hover:text-white transition-colors">
                Bills
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white transition-colors">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons - Right */}
        <div className="flex flex-col items-center md:items-end justify-between">
          <h3 className="text-white font-semibold mb-4 text-lg">Social Links</h3>

          {/* Icons directly below h3 */}
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-white transition-colors">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaTwitter />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom Center Text */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} Easy Bill. All Rights Reserved.
      </div>
    </footer>
  );
}
