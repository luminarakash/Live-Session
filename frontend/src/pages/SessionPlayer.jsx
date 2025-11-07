
import React, { useRef, useState } from "react";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
        🎥 Live Stream Player
      </h1>

      {/* Video Container */}
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-700">
        <video
          ref={videoRef}
          className="w-full h-auto rounded-2xl"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
        />
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-600/10 to-blue-500/10 pointer-events-none"></div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button
          onClick={togglePlay}
          className={`px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 ${
            isPlaying
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500"
          }`}
        >
          {isPlaying ? "⏸ Pause" : "▶️ Play"}
        </button>

        <button
          onClick={() => (videoRef.current.currentTime = 0)}
          className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-600 hover:to-pink-500 shadow-lg transition-all duration-300"
        >
          🔁 Restart
        </button>

        <button
          onClick={() => videoRef.current.requestFullscreen()}
          className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 shadow-lg transition-all duration-300"
        >
          ⛶ Fullscreen
        </button>
      </div>

      {/* Footer Glow */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-purple-800/40 via-transparent to-transparent blur-3xl pointer-events-none"></div>
    </div>
  );
}
