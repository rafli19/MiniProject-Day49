import { useState } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [email, setEmail] = useState("");

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

      {/* Hero Section */}
      <section className="top-0 absolute w-[100vw] h-[73vh] bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/e94073b0-a056-402f-9015-16cb1e7e45c2/web/ID-en-20251110-TRIFECTA-perspective_29287120-1497-47a9-8b0a-49e7ded22f31_large.jpg)]">
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

      {/* Trending Now */}
      <section className="relative mt-[65vh]">
        <div className="mx-auto w-[1200px]">
          <span className="text-white font-bold text-2xl">Trending Now</span>
          <div className="flex flex-row justify-around gap-x-10 pt-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="relative">
                <span className="absolute text-white text-[100px] font-bold bottom-0 -left-4">
                  {num}
                </span>
                <img
                  src={`https://occ-0-6701-58.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABafNfNBnPzbvBbw4GnTFZkDiSL1qzru82NeNh8Jx0b7RhG4ChsUTw26xC_s_gksZ7hpK-a8HHnnnWdDftAqu3-ijJYzP4XdD7J3916ZX3YmiXp7DUBvgvxcRHnZSnw7ndDsa.webp?r=3e2`}
                  alt={`Trending ${num}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Reasons */}
      <section className="relative">
        <div className="mx-auto w-[1200px] mt-10">
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
                className="relative bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md p-6 text-white w-[25%] h-[350px]"
              >
                <div className="text-xl font-bold mb-4">{item.title}</div>
                <div className="text-md">{item.desc}</div>
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
