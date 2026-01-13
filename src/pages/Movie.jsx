import { useState, useEffect } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { getMovies } from "../services/api/movies";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMovies();
  }, [selectedCategory, searchQuery, currentPage]);

  const loadMovies = async () => {
    setError("");

    try {
      const params = {
        page: currentPage,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (selectedCategory !== "All") {
        params.category = selectedCategory;
      }

      const result = await getMovies(params);

      if (result.success) {
        setMovies(result.data.data || result.data);
        setTotalPages(result.data.last_page || 1);
      } else {
        setError(result.error || "Failed to load movies");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memuat data");
      console.error("Load movies error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-white text-3xl font-bold mb-6">Movies</h1>

        {/* Filter dan Search */}
        <div className="flex gap-4 mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700"
          >
            <option value="All">All Categories</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>

          <input
            type="text"
            placeholder="Search movie..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 flex-grow"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-6">{error}</div>
        )}

        {/* Movie Grid */}
        {movies.length === 0 ? (
          <div className="text-white text-center py-20">
            <p className="text-xl">No movies found</p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition cursor-pointer"
                >
                  <div className="bg-gray-700 h-[200px] rounded mb-3 flex items-center justify-center overflow-hidden">
                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-lg">
                    {movie.title}
                  </h3>
                  <div className="flex justify-between text-gray-400 text-sm mt-2">
                    <span>{movie.category}</span>
                    <span>{movie.year}</span>
                  </div>
                  <div className="text-yellow-500 text-sm mt-1">
                    ⭐ {movie.rating}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === index + 1
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
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

export default Movie;
