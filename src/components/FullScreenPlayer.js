import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  X,
  Heart,
  Share2,
  Download,
  Maximize2,
  Minimize2,
  Music,
} from "lucide-react";
import "./FullScreenPlayer.css";

const FullScreenPlayer = ({
  song,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onClose,
  onLike,
  isLiked = false,
}) => {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(0);
    }
  }, [song]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log("Audio playback failed:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    setIsRepeated(!isRepeated);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!song) {
    return null;
  }

  return (
    <div className="fullscreen-player-overlay" onClick={onClose}>
      <div
        className="fullscreen-player"
        ref={playerRef}
        onClick={(e) => e.stopPropagation()}
      >
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={onNext}
          onLoadedMetadata={handleTimeUpdate}
        />

        {/* Header Controls */}
        <div className="player-header">
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
          <div className="song-info-header">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          <button className="fullscreen-btn" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
          </button>
        </div>

        {/* Main Content */}
        <div className="player-main">
          <div className="album-art">
            <div className="album-placeholder">
              <Music size={80} />
              <h2>{song.title}</h2>
              <p>{song.artist}</p>
            </div>
          </div>

          <div className="song-details-full">
            <h1>{song.title}</h1>
            <h2>{song.artist}</h2>
            <p className="album-name">{song.album}</p>
            <div className="song-meta">
              <span className="meta-item">{song.genre}</span>
              <span className="meta-item">{song.year}</span>
              <span className="meta-item">{song.duration}</span>
            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="player-controls-full">
          <div className="main-controls">
            <button
              className="control-btn"
              onClick={toggleShuffle}
              title="Shuffle"
            >
              <Shuffle size={20} className={isShuffled ? "active" : ""} />
            </button>

            <button
              className="control-btn"
              onClick={onPrevious}
              title="Previous"
            >
              <SkipBack size={24} />
            </button>

            <button
              className="control-btn play-btn-large"
              onClick={onPlayPause}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>

            <button className="control-btn" onClick={onNext} title="Next">
              <SkipForward size={24} />
            </button>

            <button
              className="control-btn"
              onClick={toggleRepeat}
              title="Repeat"
            >
              <Repeat size={20} className={isRepeated ? "active" : ""} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <span className="time-display">{formatTime(currentTime)}</span>
            <div
              className="progress-bar-large"
              ref={progressRef}
              onClick={handleProgressClick}
            >
              <div
                className="progress-fill-large"
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="time-display">{formatTime(duration)}</span>
          </div>

          {/* Secondary Controls */}
          <div className="secondary-controls">
            <button
              className={`control-btn ${isLiked ? "liked" : ""}`}
              onClick={onLike}
              title={isLiked ? "Unlike" : "Like"}
            >
              <Heart size={20} />
            </button>

            <button className="control-btn" title="Share">
              <Share2 size={20} />
            </button>

            <button className="control-btn" title="Download">
              <Download size={20} />
            </button>

            <div className="volume-controls">
              <button
                className="control-btn"
                onClick={toggleMute}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="volume-slider-large"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPlayer;
