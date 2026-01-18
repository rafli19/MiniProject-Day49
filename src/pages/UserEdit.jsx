// src/pages/UserEdit.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserById, updateUser } from "../services/api/users";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load user data saat komponen mount
  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      const result = await getUserById(id);
      if (result.success) {
        const user = result.data.data;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          avatar: null, // file akan diupload ulang jika diubah
        });
      }
    } catch (err) {
      setError("Gagal memuat data user");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const result = await updateUser(id, formData);
      if (result.success) {
        alert("User berhasil diperbarui!");
        navigate(`/users/${id}`);
      } else {
        setError(result.error || "Gagal memperbarui user");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <Link
          to={`/users/${id}`}
          className="text-red-600 hover:underline mb-4 inline-block"
        >
          ← Back to Profile
        </Link>

        <div className="bg-gray-900 rounded-lg p-6 max-w-2xl mx-auto">
          <h1 className="text-white text-2xl font-bold mb-6">Edit User</h1>

          {error && (
            <div className="bg-red-600 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-red-600"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-red-600"
                required
              />
            </div>

            {/* Avatar Upload */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">
                Avatar (opsional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-white"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#e50914] text-white px-6 py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/users/${id}`)}
                className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserEdit;
