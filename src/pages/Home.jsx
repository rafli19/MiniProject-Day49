import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { getMovies } from "../services/api/movies";

const Home = () => {
  const [email, setEmail] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    loadTrendingMovies();
    loadNewReleases();
  }, []);

  const loadTrendingMovies = async () => {
    try {
      const result = await getMovies({
        page: 1,
        sort_by: "rating",
        order: "desc",
      });
      if (result.success) {
        setTrendingMovies(result.data.data.slice(0, 6));
      }
    } catch (err) {
      console.error("Failed to fetch trending movies:", err);
    }
  };

  const loadNewReleases = async () => {
    try {
      const result = await getMovies({
        page: 1,
        sort_by: "release_year",
        order: "desc",
      });
      if (result.success) {
        setNewReleases(result.data.data.slice(0, 6));
      }
    } catch (err) {
      console.error("Failed to fetch new releases:", err);
    }
  };

  const handleGetStarted = () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    alert(`Thanks! We'll send info to: ${email}`);
    setEmail("");
  };

  const genres = [
    { name: "Action", id: "1" },
    { name: "Sci-Fi", id: "2" },
    { name: "Thriller", id: "3" },
    { name: "Adventure", id: "4" },
    { name: "Comedy", id: "5" },
    { name: "Drama", id: "6" },
    { name: "Horror", id: "7" },
    { name: "Romance", id: "8" },
    { name: "Animation", id: "9" },
    { name: "Documentary", id: "10" },
    { name: "Fantasy", id: "11" },
    { name: "Cyberpunk", id: "12" },
  ];

  return (
    <div className="font-sans antialiased text-white bg-black overflow-x-hidden min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section
        className="relative w-full h-[80vh] sm:h-[90vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://assets.nflxext.com/ffe/siteui/vlv3/e94073b0-a056-402f-9015-16cb1e7e45c2/web/ID-en-20251110-TRIFECTA-perspective_29287120-1497-47a9-8b0a-49e7ded22f31_large.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-lg">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Unlimited movies, TV shows, and more
            </h1>
            <p className="font-bold mb-4">
              Starts at IDR 54,000. Cancel anytime.
            </p>
            <p className="mb-6">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-white bg-[#00000080] border border-gray-600 rounded-md px-4 py-2 w-full sm:w-[300px] outline-none"
                placeholder="Email Address"
              />
              <button
                onClick={handleGetStarted}
                className="bg-[#e50914] text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-red-800 transition transform hover:scale-105 w-full sm:w-auto"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-bold text-xl sm:text-2xl mb-6">
            Trending Now
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {trendingMovies.map((movie, index) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="group">
                <div className="relative">
                  <span className="absolute text-white text-2xl sm:text-4xl font-bold bottom-2 left-2 z-10">
                    {index + 1}
                  </span>
                  <img
                    src={`https://api.rafvoid.my.id${movie.poster}`}
                    alt={movie.title}
                    className="w-full h-40 sm:h-60 object-cover rounded-md transition-transform group-hover:scale-105 bg-gray-900"
                    onError={(e) => {
                      e.target.src = "/images/no-poster.png";
                    }}
                    loading="lazy"
                  />
                </div>
                <p className="text-white text-xs mt-1 truncate">
                  {movie.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-bold text-xl sm:text-2xl mb-6">
            New Releases
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {newReleases.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="group">
                <img
                  src={`https://api.rafvoid.my.id${movie.poster}`}
                  alt={movie.title}
                  className="w-full h-40 sm:h-60 object-cover rounded-md transition-transform group-hover:scale-105 bg-gray-900"
                  onError={(e) => {
                    e.target.src = "/images/no-poster.png";
                  }}
                  loading="lazy"
                />
                <p className="text-white text-xs mt-1 truncate">
                  {movie.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Genre */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-bold text-xl sm:text-2xl mb-6">
            Browse by Genre
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                to={`/movies?category=${genre.id}`}
                className="bg-gray-900 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="py-8 px-4 bg-gray-900 text-center">
        <p className="text-gray-300 italic max-w-2xl mx-auto">
          “CineNova bikin nonton jadi lebih seru. Gak pake iklan, kualitas
          gambar oke, dan selalu ada film baru tiap minggu.”
        </p>
        <p className="text-gray-400 mt-2">- Theodore, Bandung</p>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
