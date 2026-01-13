import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { getUsers } from "../services/api/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users setiap kali halaman berubah
  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  // Load users dari API
  const loadUsers = async (page) => {
    setLoading(true);
    const result = await getUsers(page);

    if (result.success) {
      setUsers(result.data.data);
      setTotalPages(result.data.total_pages);
    }

    setLoading(false);
  };

  // Ganti halaman
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

      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-white text-3xl font-bold mb-6">User List</h1>

        {loading ? (
          <div className="text-white text-center py-20">Loading...</div>
        ) : (
          <>
            {/* Grid Users */}
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-6 mb-8">
              {users.map((user) => (
                <Link
                  key={user.id}
                  to={`/users/${user.id}`}
                  className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                  <h3 className="text-white font-bold text-lg">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-white px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Users;
