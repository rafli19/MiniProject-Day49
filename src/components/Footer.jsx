import {
  YoutubeIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-26 p-8 w-full border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-8 max-sm:gap-6">
          <div>
            <div>
              <span className="text-xl font-bold uppercase tracking-widest">
                CineNova
              </span>
            </div>
            <div className="text-gray-400 text-sm mt-2 mb-4">
              Nonton sambil nyantai dulu
            </div>
            <div className="flex flex-row gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <YoutubeIcon size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <div className="text-gray-400 text-sm mb-3 font-semibold">Menu</div>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-white text-sm hover:text-red-600 transition"
              >
                Home
              </Link>
              <Link
                to="/movies"
                className="text-white text-sm hover:text-red-600 transition"
              >
                Movies
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <div className="text-gray-400 text-sm mb-3 font-semibold">
              Account
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                className="text-white text-sm hover:text-red-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white text-sm hover:text-red-600 transition"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-gray-400 text-sm mb-3 font-semibold">
              Contact
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail size={16} className="text-gray-400" />
                <span>support@cinenova.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone size={16} className="text-gray-400" />
                <span>+62 812 3456 7890</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        © 2025 CineNova. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
