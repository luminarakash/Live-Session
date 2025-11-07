
import React, { useRef, useState } from "react";

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const handlePlay = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Playback failed:", err);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolume = (e) => {
    const value = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.volume = value;
    setVolume(value);
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      const newMute = !videoRef.current.muted;
      videoRef.current.muted = newMute;
      setIsMuted(newMute);
    }
  };

  const handleFullscreen = async () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) await el.requestFullscreen();
    else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) await el.msRequestFullscreen();
  };

  return (
    <div className="space-y-3">
      {/* Video Display */}
      <div className="w-full bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={src || "https://www.w3schools.com/html/mov_bbb.mp4"}
          className="w-full h-auto"
          playsInline
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Custom Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ▶️ Play
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            ⏸ Pause
          </button>
        )}

        <button
          onClick={handleToggleMute}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          {isMuted ? "🔇 Unmute" : "🔊 Mute"}
        </button>

        <div className="flex items-center gap-2">
          <label className="text-sm">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
          />
        </div>

        <button
          onClick={handleFullscreen}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ⛶ Fullscreen
        </button>
      </div>
    </div>
  );
}
