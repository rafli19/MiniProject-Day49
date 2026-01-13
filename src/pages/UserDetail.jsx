import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserById } from "../services/api/users";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user detail pas pertama kali
  useEffect(() => {
    loadUserDetail();
  }, []);

  // Load user detail dari API
  const loadUserDetail = async () => {
    setLoading(true);
    const result = await getUserById(id);

    if (result.success) {
      setUser(result.data.data);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <Link
          to="/users"
          className="text-red-600 hover:underline mb-4 inline-block"
        >
          ← Back to Users
        </Link>

        {loading ? (
          <div className="text-white text-center py-20">Loading...</div>
        ) : user ? (
          <div className="bg-gray-900 rounded-lg p-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-48 h-48 rounded-full object-cover mb-6"
              />

              <h1 className="text-white text-3xl font-bold mb-2">
                {user.first_name} {user.last_name}
              </h1>

              {/* Email */}
              <p className="text-gray-400 text-lg mb-6">{user.email}</p>

              {/* Info Detail */}
              <div className="bg-gray-800 p-6 rounded w-full">
                <h2 className="text-white text-xl font-bold mb-4">
                  User Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">ID:</span>
                    <span className="text-white">{user.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">First Name:</span>
                    <span className="text-white">{user.first_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Name:</span>
                    <span className="text-white">{user.last_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-white text-center py-20">User not found</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserDetail;
