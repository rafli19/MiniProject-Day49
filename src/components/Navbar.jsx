import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/api/auth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Yakin mau logout?");
    if (!confirmLogout) return;

    try {
      await logoutUser();
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logout:", error);
      logout();
      navigate("/login");
    }
  };

  return (
    <header className="p-4 shadow-md relative z-50 bg-black">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <span className="text-xl font-bold uppercase tracking-widest text-white cursor-pointer hover:text-red-600 transition">
              CineNova
            </span>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-6">
          <Link
            to="/"
            className="text-white hover:text-gray-300 font-semibold transition"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="text-white hover:text-gray-300 font-semibold transition"
          >
            Movies
          </Link>
          {user && (
            <Link
              to="/users"
              className="text-white hover:text-gray-300 font-semibold transition"
            >
              Users
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Hai, {user.name}!</span>
              <button
                onClick={handleLogout}
                className="bg-[#e50914] text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="text-white border border-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-600 transition">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-[#e50914] text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4 pb-4 space-y-4 border-t border-gray-700">
          <Link
            to="/"
            className="block text-white hover:text-gray-300 font-semibold transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="block text-white hover:text-gray-300 font-semibold transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Movies
          </Link>
          {user && (
            <Link
              to="/users"
              className="block text-white hover:text-gray-300 font-semibold transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Users
            </Link>
          )}

          {user ? (
            <div className="pt-2 space-y-3">
              <span className="block text-gray-400 text-sm">
                Hai, {user.name}!
              </span>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full bg-[#e50914] text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full text-white border border-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-600 transition">
                  Sign In
                </button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-[#e50914] text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
