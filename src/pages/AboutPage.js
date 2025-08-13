import React from "react";
import { Music, Heart, Users, Globe, Zap, Star } from "lucide-react";
import "./AboutPage.css";

const AboutPage = ({ currentTheme }) => {
  const features = [
    {
      icon: Music,
      title: "Mood-Based Recommendations",
      description:
        "Get personalized music suggestions based on your current emotional state",
    },
    {
      icon: Heart,
      title: "Curated Playlists",
      description:
        "Hand-picked songs that perfectly match your mood and preferences",
    },
    {
      icon: Users,
      title: "User Experience",
      description: "Intuitive interface designed for music lovers of all ages",
    },
    {
      icon: Globe,
      title: "Multiple Themes",
      description: "Choose from various beautiful themes to match your style",
    },
    {
      icon: Zap,
      title: "Fast & Responsive",
      description:
        "Lightning-fast performance across all devices and screen sizes",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "High-quality music recommendations with detailed metadata",
    },
  ];

  const stats = [
    { number: "6", label: "Mood Categories" },
    { number: "48+", label: "Curated Songs" },
    { number: "6", label: "Visual Themes" },
    { number: "∞", label: "Possibilities" },
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About Mood Music</h1>
          <p>Your personal soundtrack companion for every moment of life</p>
        </div>
      </div>

      <div className="container">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Mood Music was born from a simple idea: music has the power to
            transform our emotions and enhance our experiences. We believe that
            the right song at the right time can make all the difference in how
            we feel and how we navigate through life's ups and downs.
          </p>
          <p>
            Our team of music enthusiasts and developers came together to create
            an intelligent music recommendation system that understands not just
            what you like, but how you feel. By combining mood analysis with
            carefully curated playlists, we help you discover the perfect
            soundtrack for every moment.
          </p>
        </div>

        <div className="features-section">
          <h2>What Makes Us Special</h2>
          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="stats-section">
          <h2>By The Numbers</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            To create a world where everyone has access to the perfect music for
            every moment, helping people connect with their emotions and enhance
            their daily experiences through the universal language of music.
          </p>
        </div>

        <div className="team-section">
          <h2>Meet The Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <Music size={40} />
              </div>
              <h3>Music Curators</h3>
              <p>
                Passionate music experts who carefully select and organize our
                playlists
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <Zap size={40} />
              </div>
              <h3>Developers</h3>
              <p>
                Skilled engineers who bring our vision to life with cutting-edge
                technology
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <Heart size={40} />
              </div>
              <h3>Designers</h3>
              <p>
                Creative minds who craft beautiful and intuitive user
                experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
