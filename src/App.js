import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MusicPlayer from "./components/MusicPlayer";
import FullScreenPlayer from "./components/FullScreenPlayer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("default");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [likedSongs, setLikedSongs] = useState(new Set());

  const themes = {
    default: {
      primary: "#667eea",
      secondary: "#764ba2",
    },
    dark: {
      primary: "#2c3e50",
      secondary: "#34495e",
    },
    light: {
      primary: "#f39c12",
      secondary: "#e67e22",
    },
    ocean: {
      primary: "#3498db",
      secondary: "#2980b9",
    },
    sunset: {
      primary: "#e74c3c",
      secondary: "#c0392b",
    },
    forest: {
      primary: "#27ae60",
      secondary: "#2ecc71",
    },
  };

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    const theme = themes[currentTheme];
    root.style.setProperty("--primary-color", theme.primary);
    root.style.setProperty("--secondary-color", theme.secondary);
  }, [currentTheme, themes]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    setCurrentSongIndex(0);
    setCurrentSong(null);
    setIsPlaying(false);
  };

  const handlePlaySong = (song, index) => {
    setCurrentSong(song);
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    // This will be handled by the HomePage component
  };

  const handlePrevious = () => {
    // This will be handled by the HomePage component
  };

  const handleSongEnd = () => {
    // This will be handled by the HomePage component
  };

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
  };

  const handleFullScreenOpen = () => {
    setShowFullScreen(true);
  };

  const handleFullScreenClose = () => {
    setShowFullScreen(false);
  };

  const handleLikeSong = (songId) => {
    const newLikedSongs = new Set(likedSongs);
    if (newLikedSongs.has(songId)) {
      newLikedSongs.delete(songId);
    } else {
      newLikedSongs.add(songId);
    }
    setLikedSongs(newLikedSongs);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="App">
        <Header />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  selectedMood={selectedMood}
                  onMoodSelect={handleMoodSelect}
                  currentTheme={currentTheme}
                  onThemeChange={handleThemeChange}
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onPlaySong={handlePlaySong}
                  onFullScreenOpen={handleFullScreenOpen}
                  likedSongs={likedSongs}
                  onLikeSong={handleLikeSong}
                />
              }
            />
            <Route
              path="/about"
              element={<AboutPage currentTheme={currentTheme} />}
            />
            <Route
              path="/contact"
              element={<ContactPage currentTheme={currentTheme} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        {currentSong && (
          <MusicPlayer
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSongEnd={handleSongEnd}
            onFullScreenOpen={handleFullScreenOpen}
          />
        )}

        {showFullScreen && currentSong && (
          <FullScreenPlayer
            song={currentSong}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onClose={handleFullScreenClose}
            onLike={() => handleLikeSong(currentSong.id)}
            isLiked={likedSongs.has(currentSong.id)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
