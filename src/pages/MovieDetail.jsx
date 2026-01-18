import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMovieDetail();
  }, [id]);

  useEffect(() => {
    loadSimilarMovies();
  }, [id]);

  const loadMovieDetail = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.rafvoid.my.id/api/v1/movies/${id}`,
      );
      const result = await response.json();

      if (result.success) {
        setMovie(result.data);
      } else {
        setError("Failed to load movie details");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memuat data");
      console.error("Load movie detail error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadSimilarMovies = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.rafvoid.my.id/api/v1/movies?page=1`,
      );
      const result = await response.json();

      if (result.success) {
        const allMovies = result.data.data || result.data;

        const filtered = allMovies
          .filter((movie) => movie.id !== parseInt(id))
          .slice(0, 5);

        setSimilarMovies(filtered);
      } else {
        setError("Failed to load similar movies");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memuat film serupa");
      console.error("Load similar movies error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Header />
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-2xl mb-4">
              {error || "Movie not found"}
            </p>
            <button
              onClick={() => navigate("/movies")}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Back to Movies
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-[700px] overflow-hidden">
          <img
            src={`https://api.rafvoid.my.id${movie.poster}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-white text-6xl font-bold mb-4">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 text-white mb-6">
              <span className="text-green-500 font-bold text-xl">
                {movie.rating ? `${movie.rating}/10` : "N/A"}
              </span>
              <span className="text-lg">{movie.release_year}</span>
              <span className="px-3 py-1 border border-white/50 rounded text-sm">
                {movie.category}
              </span>
              <span className="text-lg">
                {movie.duration_minutes || "N/A"} {" minutes"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-12 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h2 className="text-white text-2xl font-bold mb-4">Synopsis</h2>
            <p className="text-gray-300 text-lg leading-relaxed text-justify">
              {movie.synopsis || "No synopsis available for this movie."}
            </p>

            {movie.cast && (
              <div className="mt-8">
                <h2 className="text-white text-2xl font-bold mb-4">Cast</h2>
                <p className="text-gray-300 text-lg">{movie.cast}</p>
              </div>
            )}

            {movie.director && (
              <div className="mt-6">
                <h2 className="text-white text-2xl font-bold mb-4">Director</h2>
                <p className="text-gray-300 text-lg">{movie.director}</p>
              </div>
            )}
          </div>

          <div>
            <img
              src={`https://api.rafvoid.my.id${movie.poster}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {movie.trailer_url && (
          <div className="mt-12">
            <h2 className="text-white text-2xl font-bold mb-4">Trailer</h2>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src={movie.trailer_url}
                title="Movie Trailer"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-white text-2xl font-bold mb-6">More Like This</h2>

          {loading ? (
            <div className="text-white text-center py-10">
              Loading similar movies...
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-10">{error}</div>
          ) : similarMovies.length === 0 ? (
            <div className="text-gray-400 text-center py-10">
              No similar movies found
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {similarMovies.map((similarMovie) => (
                <Link
                  key={similarMovie.id}
                  to={`/movie/${similarMovie.id}`}
                  className="block bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer"
                >
                  <div className="aspect-[2/3] bg-black overflow-hidden">
                    {similarMovie.poster ? (
                      <img
                        src={`https://api.rafvoid.my.id${similarMovie.poster}`}
                        alt={similarMovie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src="/images/no-poster.jpg"
                        alt="No poster available"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-bold truncate">
                      {similarMovie.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {similarMovie.release_year}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetail;
