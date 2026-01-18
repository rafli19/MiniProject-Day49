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
    <footer className="bg-black text-white mt-8 p-4 sm:p-6 w-full border-t border-gray-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-x-8">
          {/* Logo & Sosial Media */}
          <div className="text-center sm:text-left">
            <div>
              <span className="text-xl font-bold uppercase tracking-widest">
                CineNova
              </span>
              <div className="text-gray-400 text-xs mt-1">
                Streaming film sambil nyantai
              </div>
            </div>
            <div className="flex justify-center sm:justify-start gap-4 mt-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <YoutubeIcon size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition"
              >
                <TwitterIcon size={18} />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div className="text-center sm:text-left">
            <div className="text-gray-400 text-xs mb-3 font-semibold">Menu</div>
            <div className="flex flex-col gap-2 items-center sm:items-start">
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

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <div className="text-gray-400 text-xs mb-3 font-semibold">
              Quick Links
            </div>
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <Link
                to="/faq"
                className="text-white text-sm hover:text-red-600 transition"
              >
                FAQ
              </Link>
              <Link
                to="/help"
                className="text-white text-sm hover:text-red-600 transition"
              >
                Help Center
              </Link>
              <Link
                to="/terms"
                className="text-white text-sm hover:text-red-600 transition"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-white text-sm hover:text-red-600 transition"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <div className="text-gray-400 text-xs mb-3 font-semibold">
              Contact
            </div>
            <div className="flex flex-col gap-3 items-center sm:items-start">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail size={14} className="text-gray-400" />
                <span>support@cinenova.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone size={14} className="text-gray-400" />
                <span>+6281318997051</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={14} className="text-gray-400" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-center text-gray-500 text-xs">
          © 2025 CineNova. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
