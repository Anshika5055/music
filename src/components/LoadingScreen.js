import React, { useEffect } from "react";
import { Music } from "lucide-react";
import "./LoadingScreen.css";

const LoadingScreen = ({ onLoadingComplete }) => {
  useEffect(() => {
    // Simple loading with a fixed delay
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen">
      {/* Animated Background */}
      <div className="loading-background">
        <div className="floating-notes">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-note"
              style={{
                "--delay": `${i * 0.2}s`,
                "--x": `${Math.random() * 100}%`,
                "--y": `${Math.random() * 100}%`,
              }}
            >
              {["♪", "♫", "♬", "♩", "♭", "♯"][i % 6]}
            </div>
          ))}
        </div>

        <div className="pulse-circles">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="pulse-circle"
              style={{ "--delay": `${i * 0.5}s` }}
            />
          ))}
        </div>
      </div>

      {/* Loading Content */}
      <div className="loading-content show">
        <div className="loading-logo">
          <div className="logo-icon">
            <Music size={80} />
            <div className="logo-glow" />
          </div>
          <h1 className="logo-text">Mood Music</h1>
          <p className="logo-subtitle">Your Perfect Soundtrack</p>
        </div>

        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill loading" />
          </div>
          <div className="progress-text">Loading...</div>
        </div>

        <div className="loading-messages">
          <div className="message-item active">
            🎵 Tuning the instruments...
          </div>
          <div className="message-item">🎶 Preparing your mood...</div>
          <div className="message-item">🎧 Loading the perfect playlist...</div>
          <div className="message-item">✨ Almost ready to rock...</div>
          <div className="message-item">🚀 Launching your music journey...</div>
        </div>

        <div className="loading-icons">
          <div className="floating-icon music-note">♪</div>
          <div className="floating-icon heart">❤️</div>
          <div className="floating-icon star">⭐</div>
          <div className="floating-icon zap">⚡</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
