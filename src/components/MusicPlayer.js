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
  Maximize2,
} from "lucide-react";
import "./MusicPlayer.css";

const MusicPlayer = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onSongEnd,
  onFullScreenOpen,
}) => {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(0);
    }
  }, [currentSong]);

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
  }, [isPlaying, currentSong]);

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

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!currentSong) {
    return null;
  }

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onSongEnd}
        onLoadedMetadata={handleTimeUpdate}
      />

      <div className="player-info">
        <div className="music-info">
          <h4 className="song-title">{currentSong.title}</h4>
          <p className="song-artist">{currentSong.artist}</p>
        </div>

        <div className="music-actions">
          <button
            className="control-btn"
            onClick={toggleShuffle}
            title="Shuffle"
          >
            <Shuffle size={18} className={isShuffled ? "active" : ""} />
          </button>

          <button className="control-btn" onClick={onPrevious} title="Previous">
            <SkipBack size={20} />
          </button>

          <button
            className="control-btn play-btn"
            onClick={onPlayPause}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button className="control-btn" onClick={onNext} title="Next">
            <SkipForward size={20} />
          </button>

          <button className="control-btn" onClick={toggleRepeat} title="Repeat">
            <Repeat size={18} className={isRepeated ? "active" : ""} />
          </button>
        </div>

        <div className="player-progress">
          <span className="time-display">{formatTime(currentTime)}</span>
          <div
            className="progress-bar"
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div
              className="progress-fill"
              style={{
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              }}
            />
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        <div className="volume-controls">
          <button
            className="control-btn"
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
          <button
            className="control-btn fullscreen-btn"
            onClick={onFullScreenOpen}
            title="Full Screen Player"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
