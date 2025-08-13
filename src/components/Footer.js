import React from "react";
import { Link } from "react-router-dom";
import {
  Music,
  Heart,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Github,
  ExternalLink,
  Linkedin,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      color: "#E4405F",
      description: "Follow us on Instagram",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "#",
      color: "#1DA1F2",
      description: "Follow us on Twitter",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "#",
      color: "#1877F2",
      description: "Like us on Facebook",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "#",
      color: "#FF0000",
      description: "Subscribe on YouTube",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "#",
      color: "#333333",
      description: "Check out our code",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#",
      color: "#0A66C2",
      description: "Connect on LinkedIn",
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <Music size={32} color="#667eea" />
              <h3>Mood Music</h3>
            </Link>
            <p>
              Discover the perfect music for every mood. From happy vibes to
              calming melodies, we've got your soundtrack covered.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    className="social-link"
                    title={social.description}
                    style={{ "--social-color": social.color }}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/#moods">Mood Selection</Link>
              </li>
              <li>
                <Link to="/#genres">Music Genres</Link>
              </li>
              <li>
                <Link to="/#themes">Visual Themes</Link>
              </li>
              <li>
                <Link to="/#playlists">Playlists</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Music Genres</h4>
            <ul className="footer-links">
              <li>
                <Link to="/genre/hiphop">Hip Hop Vibes</Link>
              </li>
              <li>
                <Link to="/genre/hollywood">Hollywood Hits</Link>
              </li>
              <li>
                <Link to="/genre/bollywood">Bollywood Beats</Link>
              </li>
              <li>
                <Link to="/genre/pop">Pop Classics</Link>
              </li>
              <li>
                <Link to="/genre/rock">Rock Anthems</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Me</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>hello@moodmusic.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Music City, MC 12345</span>
              </div>
            </div>
            <Link to="/contact" className="contact-btn">
              Get In Touch
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              &copy; {currentYear} Mood Music. Made with{" "}
              <Heart size={16} color="#FF6B6B" /> for music lovers.
            </p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
