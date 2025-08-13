import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import "./ContactPage.css";

const ContactPage = ({ currentTheme }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      info: "hello@moodmusic.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "Music City, MC 12345",
      description: "Come say hello at our office",
    },
  ];

  const socialLinks = [
    { name: "Instagram", url: "#", icon: "📸" },
    { name: "Twitter", url: "#", icon: "🐦" },
    { name: "Facebook", url: "#", icon: "📘" },
    { name: "YouTube", url: "#", icon: "📺" },
    { name: "GitHub", url: "#", icon: "💻" },
  ];

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="hero-content">
          <h1>Get In Touch</h1>
          <p>
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info-section">
            <h2>Contact Information</h2>
            <div className="contact-info-grid">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="contact-info-card">
                    <div className="info-icon">
                      <IconComponent size={32} />
                    </div>
                    <h3>{item.title}</h3>
                    <p className="info-text">{item.info}</p>
                    <p className="info-description">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {submitStatus === "success" && (
              <div className="success-message">
                <MessageCircle size={24} />
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="additional-info">
            <div className="info-card">
              <Clock size={32} />
              <h3>Response Time</h3>
              <p>
                We typically respond to all inquiries within 24 hours during
                business days.
              </p>
            </div>

            <div className="info-card">
              <MessageCircle size={32} />
              <h3>Support Hours</h3>
              <p>
                Monday - Friday: 8:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-section">
            <h2>Connect With Us</h2>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
