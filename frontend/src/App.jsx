
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Admin from "./pages/Admin";
import SessionPlayer from "./pages/SessionPlayer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
        {/* ====== NAVBAR ====== */}
        <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg shadow-md border-b border-white/20">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
            {/* Logo / Title */}
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400 hover:scale-105 transition-transform duration-300"
            >
              Live Sessions 🎥
            </Link>

            {/* Nav Links */}
            <div className="flex gap-5">
              <Link
                to="/"
                className="text-sm font-semibold hover:text-pink-300 transition-colors duration-300"
              >
                Admin
              </Link>
              <Link
                to="/session/demo"
                className="text-sm font-semibold hover:text-pink-300 transition-colors duration-300"
              >
                Student View
              </Link>
            </div>
          </nav>
        </header>

        {/* ====== MAIN CONTENT ====== */}
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-10">
          <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-10">
            <Routes>
              <Route path="/" element={<Admin />} />
              <Route path="/session/:uniqueId" element={<SessionPlayer />} />
            </Routes>
          </div>
        </main>

        {/* ====== FOOTER ====== */}
        <footer className="mt-auto bg-white/10 backdrop-blur-lg text-center py-4 border-t border-white/20 text-sm text-gray-200">
          <p>
            Built with 💜 by <span className="font-semibold text-white">Akash</span> | MERN Stack Project ❤️
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
