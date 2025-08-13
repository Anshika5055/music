import React from "react";
import {
  Play,
  Heart,
  Share2,
  Download,
  Music2,
  Calendar,
  Zap,
  Moon,
  Clock,
  Disc3,
  Maximize2,
} from "lucide-react";
import "./MusicRecommendations.css";

const MusicRecommendations = ({
  mood,
  recommendations,
  onPlaySong,
  currentSong,
  isPlaying,
  onFullScreenOpen,
  likedSongs,
  onLikeSong,
}) => {
  const getMoodIcon = (mood) => {
    switch (mood) {
      case "happy":
        return "😊";
      case "sad":
        return "😢";
      case "energetic":
        return "⚡";
      case "calm":
        return "🌙";
      case "romantic":
        return "💕";
      case "nostalgic":
        return "⏰";
      default:
        return "🎵";
    }
  };

  const getEnergyIcon = (energy) => {
    switch (energy) {
      case "high":
        return <Zap size={16} color="#FF6B6B" />;
      case "medium":
        return <Music2 size={16} color="#4ECDC4" />;
      case "low":
        return <Moon size={16} color="#6C5CE7" />;
      default:
        return <Music2 size={16} />;
    }
  };

  const getTempoText = (tempo) => {
    switch (tempo) {
      case "fast":
        return "Fast";
      case "medium":
        return "Medium";
      case "slow":
        return "Slow";
      default:
        return "Unknown";
    }
  };

  const handlePlaySong = (song, index) => {
    onPlaySong(song, index);
  };

  const handleLikeSong = (songId, e) => {
    e.stopPropagation();
    onLikeSong(songId);
  };

  const handleFullScreen = (e) => {
    e.stopPropagation();
    if (currentSong) {
      onFullScreenOpen();
    }
  };

  return (
    <div className="recommendations-section">
      <h3>
        {getMoodIcon(mood)} Perfect for your {mood} mood
      </h3>

      <div className="song-count">
        <Disc3 size={20} />
        <span>{recommendations.length} songs found</span>
      </div>

      <div className="music-grid">
        {recommendations.map((song, index) => {
          const isCurrentSong = currentSong && currentSong.id === song.id;
          const isCurrentlyPlaying = isCurrentSong && isPlaying;
          const isLiked = likedSongs.has(song.id);

          return (
            <div
              key={song.id}
              className={`music-card ${isCurrentSong ? "current-playing" : ""}`}
            >
              <div className="music-header">
                <div className="album-cover">
                  <img
                    src={song.coverArt}
                    alt={`${song.title} album cover`}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center";
                    }}
                  />
                  {isCurrentlyPlaying && (
                    <div className="playing-overlay">
                      <Music2 size={24} color="white" />
                    </div>
                  )}
                </div>

                <div className="music-info">
                  <h4 className="song-title">{song.title}</h4>
                  <p className="song-artist">{song.artist}</p>
                  <p className="song-album">{song.album}</p>
                </div>

                <div className="music-actions">
                  <button
                    className={`action-btn ${isLiked ? "liked" : ""}`}
                    onClick={(e) => handleLikeSong(song.id, e)}
                    title={isLiked ? "Unlike" : "Like"}
                  >
                    <Heart size={18} />
                  </button>
                  <button
                    className={`action-btn play-action ${
                      isCurrentlyPlaying ? "playing" : ""
                    }`}
                    onClick={() => handlePlaySong(song, index)}
                    title={isCurrentlyPlaying ? "Currently Playing" : "Play"}
                  >
                    {isCurrentlyPlaying ? (
                      <Music2 size={18} />
                    ) : (
                      <Play size={18} />
                    )}
                  </button>
                  {isCurrentSong && (
                    <button
                      className="action-btn fullscreen-action"
                      onClick={handleFullScreen}
                      title="Full Screen Player"
                    >
                      <Maximize2 size={18} />
                    </button>
                  )}
                  <button className="action-btn" title="Share">
                    <Share2 size={18} />
                  </button>
                  <button className="action-btn" title="Download">
                    <Download size={18} />
                  </button>
                </div>
              </div>

              <div className="music-details">
                <div className="detail-item">
                  <span className="detail-label">Genre:</span>
                  <span className="detail-value">{song.genre}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Energy:</span>
                  <span className="detail-value">
                    {getEnergyIcon(song.energy)} {song.energy}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tempo:</span>
                  <span className="detail-value">
                    {getTempoText(song.tempo)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">
                    <Clock size={14} />
                    {song.duration}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Year:</span>
                  <span className="detail-value">
                    <Calendar size={14} />
                    {song.year}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Album:</span>
                  <span className="detail-value">{song.album}</span>
                </div>
              </div>

              <div className="music-footer">
                <button
                  className={`btn ${
                    isCurrentSong ? "btn-secondary" : "btn-primary"
                  } play-btn`}
                  onClick={() => handlePlaySong(song, index)}
                >
                  {isCurrentSong ? (
                    <>
                      <Music2 size={16} />
                      {isPlaying ? "Now Playing" : "Resume"}
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      Play Now
                    </>
                  )}
                </button>

                {isCurrentSong && (
                  <button
                    className="btn btn-secondary fullscreen-btn"
                    onClick={handleFullScreen}
                  >
                    <Maximize2 size={16} />
                    Full Screen
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="recommendations-footer">
        <p>
          💡 Tip: These songs are carefully selected to match your current mood.
          Click on any song to start playing! Use the full-screen player for an
          immersive experience.
        </p>
      </div>
    </div>
  );
};

export default MusicRecommendations;
