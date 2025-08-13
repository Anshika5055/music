import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Music,
  Heart,
  Home,
  User,
  Phone,
  Globe,
  Mic2,
  Film,
  Music2,
} from "lucide-react";
import "./Header.css";

const Header = () => {
  const [showGenreMenu, setShowGenreMenu] = useState(false);
  const location = useLocation();

  const musicGenres = [
    { id: "hiphop", name: "Hip Hop Vibes", icon: Mic2, color: "#FF6B6B" },
    { id: "hollywood", name: "Hollywood Hits", icon: Film, color: "#4ECDC4" },
    {
      id: "bollywood",
      name: "Bollywood Beats",
      icon: Music2,
      color: "#FFD93D",
    },
    { id: "pop", name: "Pop Classics", icon: Music, color: "#667eea" },
    { id: "rock", name: "Rock Anthems", icon: Music2, color: "#764ba2" },
    { id: "jazz", name: "Jazz Lounge", icon: Music, color: "#27ae60" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleGenreClick = () => {
    setShowGenreMenu(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <Music size={32} color="#667eea" />
            <h1>Mood Music</h1>
          </Link>

          <nav className="nav">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              <Home size={20} />
              Home
            </Link>

            <div className="nav-dropdown">
              <button
                className={`nav-link ${showGenreMenu ? "active" : ""}`}
                onClick={() => setShowGenreMenu(!showGenreMenu)}
              >
                <Globe size={20} />
                Music Genres
              </button>

              {showGenreMenu && (
                <div className="genre-menu">
                  {musicGenres.map((genre) => {
                    const IconComponent = genre.icon;
                    return (
                      <Link
                        key={genre.id}
                        to={`/genre/${genre.id}`}
                        className="genre-item"
                        style={{ "--genre-color": genre.color }}
                        onClick={handleGenreClick}
                      >
                        <IconComponent size={18} />
                        {genre.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
            >
              <User size={20} />
              About
            </Link>

            <Link
              to="/contact"
              className={`nav-link ${isActive("/contact") ? "active" : ""}`}
            >
              <Phone size={20} />
              Contact Me
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
