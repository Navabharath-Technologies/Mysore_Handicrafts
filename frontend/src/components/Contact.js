import React, { useState } from 'react';
import Reveal from './Reveal';
import contactHeroImg from '../images/contact-hero.webp';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  const WHATSAPP_NUMBER = '919845106280'; // New showroom contact number

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    // 1. Full Name Validation
    if (formData.name.trim().length < 3) {
      alert("Full Name must be at least 3 characters long.");
      return;
    }
    if (/(.)\1{3,}/.test(formData.name)) {
      alert("Full Name cannot contain the same character repeating more than 3 times consecutively.");
      return;
    }

    // 2. Email Validation (if provided)
    if (formData.email.trim() !== '') {
      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email.trim())) {
        alert("Email Address must be a valid @gmail.com address.");
        return;
      }
    }

    // 3. Phone Validation
    const phoneStr = formData.phone.trim().replace(/\s+/g, ''); // strip spaces if any
    if (!/^[6-9]\d{9}$/.test(phoneStr)) {
      alert("Phone Number must be exactly 10 digits and start with 6, 7, 8, or 9.");
      return;
    }

    // Format the WhatsApp message with form values
    const text = `Namaste Mysore Handicrafts,

I have an enquiry from your website:
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'Not provided'}
*Subject:* ${formData.subject}

*Message:*
${formData.message}`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section className="contact-section">
      {/* Hero Banner */}
      <div className="contact-hero">
        <img
          src={contactHeroImg}
          alt="Contact Mysore Handicrafts"
          className="contact-hero-img"
        />
        <div className="contact-hero-overlay">
          <p className="contact-hero-sub">Get In Touch</p>
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-desc">
            Have questions about our collection? Interested in custom rosewood carvings or sandalwood sculptures? Reach out directly via WhatsApp or visit our store.
          </p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-grid">
          {/* Info Column */}
          <div className="contact-info-column">
            <div className="section-headline" style={{ textAlign: 'left', margin: '0 0 30px 0' }}>
              <p className="headline-sub">Direct Channels</p>
              <h2 className="headline-main" style={{ textAlign: 'left' }}>Connect With Us</h2>
              <p className="headline-text" style={{ margin: '15px 0 0 0' }}>
                We are a showcase gallery. All catalog item enquiries, price quotations, and customization requests are processed directly via WhatsApp.
              </p>
            </div>

            {/* Direct WhatsApp Callout */}
            <Reveal delay={100}>
              <div className="whatsapp-callout-card glass-panel" style={{ margin: '50px 0 115px 0' }}>
                <div className="whatsapp-callout-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="whatsapp-callout-details">
                  <h3>Chat on WhatsApp</h3>
                  <p>
                    As a curated digital showcase gallery, we provide personalized assistance for every acquisition.<br />
                    Please connect with us via WhatsApp for pricing details, custom requests, and to arrange your purchase.
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Mysore%20Handicrafts%2C%20I'd%20like%20to%20enquire%20about%20your%20handicrafts.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-whatsapp-btn"
                  >
                    Start WhatsApp Chat
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Contact Details Grid */}
            <Reveal delay={200} className="contact-details-grid-wrapper">
              <div className="contact-details-grid">
                <div className="contact-method-card">
                  <div className="contact-method-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>
                      <a href="tel:+919845106280">+91 98451 06280</a>
                    </p>
                  </div>
                </div>

                <div className="contact-method-card">
                  <div className="contact-method-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <h4>Email Enquiries</h4>
                    <p><a href="mailto:preetham@mysorehandicrafts.com">preetham@mysorehandicrafts.com</a></p>
                  </div>
                </div>

                <div className="contact-method-card" style={{ gridColumn: 'span 2' }}>
                  <div className="contact-method-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div style={{ width: '100%' }}>
                    <h4>Business Hours</h4>
                    <div className="contact-hours-list" style={{ marginTop: '6px' }}>
                      <div className="contact-hours-row contact-hours-row-bordered">
                        <span>Monday – Saturday</span>
                        <strong>10:00 AM – 8:00 PM</strong>
                      </div>
                      <div className="contact-hours-row">
                        <span>Sunday</span>
                        <strong>10:00 AM – 12:00 PM</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-method-card" style={{ gridColumn: 'span 2' }}>
                  <div className="contact-method-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4>Store Address</h4>
                    <p>
                      <strong>Mysore Handicrafts</strong> (Showroom: Preetham Handicrafts)<br />
                      Opposite Janatha Bazzar, Drug Unit, Dhanavantri Road,<br />
                      Mysore — 570001, Karnataka, India
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form Column */}
          <div className="contact-form-column">
            <Reveal delay={150}>
              <div className="contact-form-card glass-panel">
                <h3>Submit Enquiry</h3>
                <p>Fill out this form, and it will format your inquiry into a direct WhatsApp message to send instantly.</p>

                <form onSubmit={handleWhatsAppSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address (Optional)</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject of Enquiry</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Sandalwood Product Info">Sandalwood Product Info</option>
                      <option value="Rosewood Furniture Quote">Rosewood Furniture Quote</option>
                      <option value="Shivani Teakwood Product Info">Shivani Teakwood Product Info</option>
                      <option value="Custom Artifact Design">Custom Artifact Design</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message (Optional)</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Tell us what pieces you are interested in..."
                    />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                    Send Inquiry via WhatsApp
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Map Embed Card */}
            <Reveal delay={250}>
              <div className="contact-map-card" style={{ marginTop: '30px', background: 'var(--bg-secondary)', padding: '24px', borderRadius: '16px' }}>
                <div className="contact-map-header" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--text-primary)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                    <line x1="8" y1="2" x2="8" y2="18" />
                    <line x1="16" y1="6" x2="16" y2="22" />
                  </svg>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 500 }}>Location</h3>
                </div>
                <div className="contact-map-wrapper">
                  <iframe
                    title="Mysore Handicrafts Showroom Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.2!2d76.649809!3d12.312227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDE4JzQ0LjAiTiA3NsKwMzgnNTkuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

