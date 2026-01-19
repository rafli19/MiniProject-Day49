import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { getUsers } from "../services/api/users";
import { Users as UsersIcon } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  const loadUsers = async (page) => {
    setLoading(true);
    setError("");

    try {
      const result = await getUsers(page);

      if (result.success) {
        const data = result.data.data || result.data;
        setUsers(data.data || []);
        setTotalPages(data.last_page || 1);
      } else {
        setError(result.error || "Failed to load users");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memuat data");
      console.error("Load users error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow pt-20">
        {/* HERO SECTION */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 rounded-lg"></div>
          <div className="relative z-10 p-6 sm:p-8">
            <h1 className="text-white text-4xl sm:text-5xl font-extrabold mb-2 flex items-center gap-3">
              <UsersIcon size={36} />
              Users
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              Kelola akun pengguna Cinemova
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-6">{error}</div>
        )}

        {loading ? (
          <div className="text-white text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
            <p className="mt-4">Loading user list...</p>
          </div>
        ) : (
          <>
            {users.length === 0 ? (
              <div className="text-white text-center py-20">
                <p className="text-xl font-medium">No users found</p>
                <p className="text-gray-400 mt-2">
                  Try adding a new user or check your database.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {users.map((user) => (
                  <Link
                    key={user.id}
                    to={`/users/${user.id}`}
                    className="block bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-full mx-auto mb-3 bg-gray-800">
                      <img
                        src={
                          user.avatar
                            ? `https://api.rafvoid.my.id/storage${user.avatar}`
                            : `https://api.rafvoid.my.id/storage/avatars/ava.png`
                        }
                        alt={user.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4A5568&color=fff&size=200`;
                        }}
                      />
                    </div>
                    <h3 className="text-white font-bold text-center text-sm sm:text-base truncate px-2">
                      {user.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 text-center truncate px-2">
                      {user.email}
                    </p>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 flex-wrap">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
                >
                  Previous
                </button>

                <span className="text-white px-3 py-2 text-sm">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Users;
