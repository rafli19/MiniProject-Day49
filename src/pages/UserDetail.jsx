import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserById, updateUser } from "../services/api/users";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserDetail();
  }, [id]);

  const loadUserDetail = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getUserById(id);

      if (result.success) {
        setUser(result.data.data);
      } else {
        setError(result.error || "Failed to load user");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memuat data");
      console.error("Load user detail error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const result = await updateUser(id, { avatar: file });
      if (result.success) {
        setUser((prev) => ({
          ...prev,
          avatar: result.data.data.avatar,
        }));
      } else {
        alert(result.error || "Gagal mengunggah avatar");
      }
    } catch (err) {
      console.error("Avatar upload error:", err);
      alert("Terjadi kesalahan saat mengunggah avatar");
    }
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

        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-6">{error}</div>
        )}

        {loading ? (
          <div className="text-white text-center py-20">Loading...</div>
        ) : user ? (
          <div className="bg-gray-900 rounded-lg p-6 sm:p-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-4">
                <img
                  src={
                    user.avatar
                      ? `https://api.rafvoid.my.id${user.avatar}`
                      : "https://api.rafvoid.my.id/images/default-avatar.png"
                  }
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://api.rafvoid.my.id/images/default-avatar.png";
                  }}
                />
              </div>

              <label
                htmlFor="avatar-input"
                className="cursor-pointer bg-[#e50914] text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition mb-4"
              >
                Ubah Avatar
              </label>
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />

              <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">
                {user.name}
              </h1>

              <p className="text-gray-400 text-lg mb-6">{user.email}</p>

              <Link
                to={`/users/${user.id}/edit`}
                className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600 transition mb-6"
              >
                Edit Profile Lengkap
              </Link>

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
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{user.name}</span>
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
          <div className="text-white text-center py-20">
            <p className="text-xl">User not found</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserDetail;
