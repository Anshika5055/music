import React from "react";
import MoodSelector from "../components/MoodSelector";
import ThemeSelector from "../components/ThemeSelector";
import MusicRecommendations from "../components/MusicRecommendations";
import { getMoodRecommendations } from "../data/musicDatabase";

const HomePage = ({
  selectedMood,
  onMoodSelect,
  currentTheme,
  onThemeChange,
  currentSong,
  isPlaying,
  onPlaySong,
  onFullScreenOpen,
  likedSongs,
  onLikeSong,
}) => {
  const [recommendations, setRecommendations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (selectedMood) {
      setLoading(true);
      setTimeout(() => {
        const moodRecommendations = getMoodRecommendations(selectedMood);
        setRecommendations(moodRecommendations);
        setLoading(false);
      }, 1000);
    }
  }, [selectedMood]);

  return (
    <div className="home-page">
      {/* Theme Selector at Top */}
      <div className="theme-section">
        <ThemeSelector
          currentTheme={currentTheme}
          onThemeChange={onThemeChange}
        />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <MoodSelector onMoodSelect={onMoodSelect} selectedMood={selectedMood} />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}

        {!loading && selectedMood && recommendations.length > 0 && (
          <MusicRecommendations
            mood={selectedMood}
            recommendations={recommendations}
            onPlaySong={onPlaySong}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onFullScreenOpen={onFullScreenOpen}
            likedSongs={likedSongs}
            onLikeSong={onLikeSong}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
