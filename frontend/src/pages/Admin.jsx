
import React, { useState } from "react";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const startSession = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/session/create");
      // backend returns session in res.data.data (as per backend code I gave earlier)
      const sessionData = res?.data?.data || res?.data?.session || null;
      if (!sessionData) {
        alert("Unexpected response from server. Check backend.");
        setLoading(false);
        return;
      }
      setSession(sessionData);
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Failed to create session. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white px-4 py-12">
      <div className="w-full max-w-4xl text-center mb-10 px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400 drop-shadow-lg">
          🎬 Admin Live Session
        </h1>
        <p className="text-gray-200 text-base sm:text-lg">
          Start a live session and share the link with your students. The player will
          appear below once the session is created.
        </p>
      </div>

      {!session ? (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={startSession}
            disabled={loading}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 font-semibold disabled:opacity-60"
          >
            {loading ? "🚀 Starting Session..." : "🎥 Start Session"}
          </button>

          
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20">
          <p className="text-lg text-gray-100 mb-2 text-center">📡 Share this link with your students:</p>

          <a
            href={session.userurl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-blue-300 underline break-words hover:text-pink-400 transition-colors mb-4"
          >
            {session.userurl}
          </a>

          <div className="mt-6 rounded-xl overflow-hidden border border-gray-300/20 shadow-xl">
            {/* If your VideoPlayer expects props (like src or sessionId), pass them here.
                I kept it generic — VideoPlayer should have a default source fallback. */}
            <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-200">
              <div>Session ID: <span className="font-mono text-xs bg-white/10 px-2 py-1 rounded">{session.unique_id}</span></div>
              <div className="mt-1">Created: <span className="text-gray-300">{new Date(session.createdAt || Date.now()).toLocaleString()}</span></div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigator.clipboard?.writeText(session.userurl)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-105 transition transform shadow"
              >
                🔗 Copy Link
              </button>

              <button
                onClick={() => {
                  // simple stop/reset: clear session UI only (doesn't delete from DB)
                  setSession(null);
                }}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/5 transition"
              >
                ✖ Close Session View
              </button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
}
