import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { getMovies } from "../services/api/movies";
import { Star } from "lucide-react";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMovies();
  }, [selectedCategoryId, searchQuery, currentPage]);

  const loadMovies = async () => {
    setError("");

    try {
      const params = {
        page: currentPage,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (selectedCategoryId) {
        params.category_id = selectedCategoryId;
      }

      const result = await getMovies(params);

      if (result.success) {
        setMovies(result.data.data || result.data);
        setTotalPages(result.data.total_pages || 1);
      } else {
        setError(result.error || "Failed to load movies");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memuat data");
      console.error("Load movies error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col overflow-x-hidden">
      <Header />

      <div className="w-full px-4 py-8 flex-grow">
        <h1 className="text-white text-3xl font-bold mb-6">Movies</h1>

        {/* Filter dan Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
          <select
            value={selectedCategoryId}
            onChange={(e) => {
              setSelectedCategoryId(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 w-full"
          >
            <option value="">All Categories</option>
            <option value="1">Action</option>
            <option value="2">Sci-Fi</option>
            <option value="3">Thriller</option>
            <option value="4">Adventure</option>
            <option value="5">Comedy</option>
            <option value="6">Drama</option>
            <option value="7">Horror</option>
            <option value="8">Romance</option>
            <option value="9">Animation</option>
            <option value="10">Documentary</option>
            <option value="11">Fantasy</option>
            <option value="12">Cyberpunk</option>
          </select>

          <input
            type="text"
            placeholder="Search movie..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 w-full"
          />
        </div>

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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="block bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition cursor-pointer w-full"
                >
                  <div className="bg-black aspect-[2/3] rounded mb-3 overflow-hidden max-w-full">
                    {movie.poster ? (
                      <img
                        src={`https://api.rafvoid.my.id${movie.poster}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/images/no-poster.png";
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src="/images/no-poster.png"
                        alt="No poster available"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h3 className="text-white font-bold text-base truncate">
                    {movie.title}
                  </h3>
                  <div className="flex justify-between text-gray-400 text-xs mt-2">
                    <span>{movie.category}</span>
                    <span>{movie.release_year}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                    <Star size={14} fill="currentColor" />
                    <span>{movie.rating}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 flex-wrap">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-800 text-white px-3 py-2 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm ${
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
                  className="bg-gray-800 text-white px-3 py-2 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
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
