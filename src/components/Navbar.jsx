import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="p-6 shadow-md relative z-10 bg-black">
      <div className="flex flex-row items-center">
        <div className="w-1/2">
          <Link to="/">
            <span className="text-xl font-bold uppercase tracking-widest text-white cursor-pointer hover:text-red-600 transition">
              Dinetflix
            </span>
          </Link>
        </div>
        <div className="w-1/2 text-right flex items-center justify-end gap-6">
          <Link to="/">
            <span className="text-white cursor-pointer hover:text-gray-300 transition">
              Home
            </span>
          </Link>
          <Link to="/movies">
            <span className="text-white cursor-pointer hover:text-gray-300 transition">
              Movies
            </span>
          </Link>
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
