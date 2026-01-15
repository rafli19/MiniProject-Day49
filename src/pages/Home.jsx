import { useState, useEffect } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { getMovies } from "../services/api/movies";

const Home = () => {
  const [email, setEmail] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const loadTrendingMovies = async () => {
    try {
      const result = await getMovies({
        page: 1,
        sort_by: "release_year",
        order: "desc",
      });
      if (result.success) {
        setTrendingMovies(result.data.data.slice(0, 5));
      }
    } catch (err) {
      console.error("Failed to fetch trending movies:", err);
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

  return (
    <div className="font-sans antialiased text-kakaes-brown bg-black overflow-x-hidden min-h-screen flex flex-col">
      <Header />

      <section className="top-0 absolute w-[100vw] h-[100vh] bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/e94073b0-a056-402f-9015-16cb1e7e45c2/web/ID-en-20251110-TRIFECTA-perspective_29287120-1497-47a9-8b0a-49e7ded22f31_large.jpg)]">
        <div className="absolute bg-black w-full h-full opacity-60"></div>
        <div className="w-full z-10 relative">
          <div className="w-[600px] mx-auto text-center mt-[200px] text-white">
            <h1 className="text-[50px] relative z-10 font-bold leading-none">
              Unlimited movies, TV shows, and more
            </h1>
            <br />
            <span className="font-bold">
              Starts at IDR 54,000. Cancel anytime.
            </span>
            <br />
            <br />
            <span>
              Ready to watch? Enter your email to create or restart your
              membership.
            </span>
            <div className="mt-10">
              <div className="inline-block bg-[#00000080] p-2 border border-gray-600 rounded-md mr-4">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-white bg-transparent outline-none w-[400px]"
                  placeholder="Email Address"
                />
              </div>
              <button
                onClick={handleGetStarted}
                className="cursor-pointer bg-[#e50914] px-4 py-2 rounded-md text-lg hover:bg-red-800 transition transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-[100vh]">
        <div className="mx-auto w-[1200px]">
          <span className="text-white font-bold text-2xl">Trending Now</span>
          <div className="flex flex-row justify-around gap-x-10 pt-6">
            {trendingMovies.map((movie, index) => (
              <div key={movie.id} className="relative">
                <span className="absolute text-white text-[100px] font-bold bottom-0 -left-4">
                  {index + 1}
                </span>
                <img
                  src={`http://rafvoid.my.id${movie.poster}`}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto w-[1200px] mt-23">
          <span className="text-white font-bold text-2xl">
            Other Reasons to Join
          </span>
          <div className="flex flex-row justify-around gap-x-6 pt-6">
            {[
              {
                title: "Enjoy on your TV",
                desc: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
              },
              {
                title: "Download this series to watch it offline.",
                desc: "Save your favorites easily so you always have TV shows and movies to watch.",
              },
              {
                title: "Watch anywhere",
                desc: "Stream unlimited movies and TV series on your phone, tablet, laptop, and TV.",
              },
              {
                title: "Create a profile for your child",
                desc: "Send your kids on adventures with their favorite characters in a world created just for them — free with your membership.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md p-6 text-white w-[25%] flex flex-col"
              >
                <div className="text-xl font-bold mb-4 h-[70px] flex items-start">
                  {item.title}
                </div>
                <div className="text-md text-justify flex-1 pb-20">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
