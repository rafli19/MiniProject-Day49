import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/api/auth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    <header className="p-6 shadow-md relative z-10 bg-black">
      <div className="flex flex-row items-center">
        <div className="w-1/2">
          <Link to="/">
            <span className="text-xl font-bold uppercase tracking-widest text-white cursor-pointer hover:text-red-600 transition">
              CineNova
            </span>
          </Link>
        </div>
        <div className="w-1/2 text-right flex items-center justify-end gap-6">
          <Link to="/">
            <span className="text-white cursor-pointer hover:text-gray-300 transition font-semibold">
              Home
            </span>
          </Link>
          <Link to="/movies">
            <span className="text-white cursor-pointer hover:text-gray-300 transition font-semibold">
              Movies
            </span>
          </Link>

          {user ? (
            <>
              <Link to="/users">
                <span className="text-white cursor-pointer hover:text-gray-300 transition font-semibold">
                  Users
                </span>
              </Link>
              <span className="text-gray-400 text-sm">
                {"Hai, "}
                {user.name}
                {"!"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-[#e50914] text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="text-white border border-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-600 transition cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-[#e50914] text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
