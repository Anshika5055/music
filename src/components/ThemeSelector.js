import React from "react";
import {
  Palette,
  Sun,
  Moon,
  Waves,
  Sunset,
  TreePine,
  Music,
  Headphones,
  Disc3,
  Mic2,
  Music2,
  Star,
} from "lucide-react";
import "./ThemeSelector.css";

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const themes = [
    {
      id: "default",
      name: "Classic Vinyl",
      icon: Disc3,
      primary: "#667eea",
      secondary: "#764ba2",
      description: "Timeless vinyl record vibes",
      accent: "#FFD93D",
    },
    {
      id: "dark",
      name: "Midnight Jazz",
      icon: Music2,
      primary: "#2c3e50",
      secondary: "#34495e",
      description: "Smooth jazz club atmosphere",
      accent: "#e74c3c",
    },
    {
      id: "light",
      name: "Sunset Rock",
      icon: Mic2,
      primary: "#f39c12",
      secondary: "#e67e22",
      description: "Golden hour rock concert",
      accent: "#27ae60",
    },
    {
      id: "ocean",
      name: "Ocean Waves",
      icon: Waves,
      primary: "#3498db",
      secondary: "#2980b9",
      description: "Calming ocean depths",
      accent: "#f1c40f",
    },
    {
      id: "sunset",
      name: "Sunset Vibes",
      icon: Sunset,
      primary: "#e74c3c",
      secondary: "#c0392b",
      description: "Warm sunset melodies",
      accent: "#f39c12",
    },
    {
      id: "forest",
      name: "Forest Folk",
      icon: TreePine,
      primary: "#27ae60",
      secondary: "#2ecc71",
      description: "Nature-inspired folk music",
      accent: "#8e44ad",
    },
  ];

  return (
    <div className="theme-selector">
      <div className="theme-header">
        <Music size={32} className="theme-icon" />
        <h3>🎵 Choose Your Music Vibe</h3>
        <p>Select a theme that matches your musical taste</p>
      </div>

      <div className="theme-grid">
        {themes.map((theme) => {
          const IconComponent = theme.icon;
          const isSelected = currentTheme === theme.id;

          return (
            <div
              key={theme.id}
              className={`theme-item ${isSelected ? "selected" : ""}`}
              onClick={() => onThemeChange(theme.id)}
            >
              <div
                className="theme-preview"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                }}
              >
                <IconComponent size={28} color="white" />
                {isSelected && (
                  <div className="selected-indicator">
                    <Music size={16} color={theme.accent} />
                  </div>
                )}
              </div>
              <div className="theme-info">
                <h4>{theme.name}</h4>
                <p>{theme.description}</p>
              </div>
              <div className="theme-colors">
                <div
                  className="color-swatch primary"
                  style={{ backgroundColor: theme.primary }}
                />
                <div
                  className="color-swatch secondary"
                  style={{ backgroundColor: theme.secondary }}
                />
                <div
                  className="color-swatch accent"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;
