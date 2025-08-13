import React from "react";
import { Smile, Frown, Zap, Moon, Heart, Clock, Music2 } from "lucide-react";
import "./MoodSelector.css";

const MoodSelector = ({ onMoodSelect, selectedMood }) => {
  const moods = [
    {
      id: "happy",
      name: "Happy",
      icon: Smile,
      color: "#FFD93D",
      description: "Feeling joyful and upbeat? Let's find some cheerful tunes!",
    },
    {
      id: "sad",
      name: "Sad",
      icon: Frown,
      color: "#6C5CE7",
      description: "Need some comfort? We'll find music that understands.",
    },
    {
      id: "energetic",
      name: "Energetic",
      icon: Zap,
      color: "#FF6B6B",
      description: "Ready to move? Let's get pumped with high-energy tracks!",
    },
    {
      id: "calm",
      name: "Calm",
      icon: Moon,
      color: "#4ECDC4",
      description: "Seeking peace? We'll find soothing, tranquil melodies.",
    },
    {
      id: "romantic",
      name: "Romantic",
      icon: Heart,
      color: "#FF8B94",
      description:
        "Feeling love in the air? Let's set the mood with romantic songs.",
    },
    {
      id: "nostalgic",
      name: "Nostalgic",
      icon: Clock,
      color: "#A8E6CF",
      description:
        "Missing the past? We'll find timeless classics and throwbacks.",
    },
  ];

  return (
    <div className="mood-section">
      <h2>How are you feeling today?</h2>
      <p>
        Select your mood and we'll recommend the perfect music to match your
        vibe
      </p>

      <div className="mood-grid">
        {moods.map((mood) => {
          const IconComponent = mood.icon;
          const isSelected = selectedMood === mood.id;

          return (
            <div
              key={mood.id}
              className={`mood-item ${isSelected ? "selected" : ""}`}
              onClick={() => onMoodSelect(mood.id)}
              style={{
                borderColor: isSelected ? mood.color : "transparent",
                background: isSelected
                  ? `${mood.color}15`
                  : "rgba(255, 255, 255, 0.9)",
              }}
            >
              <div className="mood-icon" style={{ color: mood.color }}>
                <IconComponent size={32} />
              </div>
              <h3>{mood.name}</h3>
            </div>
          );
        })}
      </div>

      {selectedMood && (
        <div className="mood-description">
          <h4>🎵 {moods.find((m) => m.id === selectedMood)?.name} Vibes</h4>
          <p>{moods.find((m) => m.id === selectedMood)?.description}</p>
        </div>
      )}

      <div className="mood-actions">
        <button
          className="btn btn-secondary"
          onClick={() => onMoodSelect(null)}
          style={{ display: selectedMood ? "inline-flex" : "none" }}
        >
          <Music2 size={20} />
          Choose Different Mood
        </button>
      </div>
    </div>
  );
};

export default MoodSelector;
