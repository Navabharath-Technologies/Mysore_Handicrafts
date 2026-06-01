import React from 'react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-brand-section">
          <div className="footer-logo">AURELIA<span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: 'var(--accent-brass)', borderRadius: '50%', marginLeft: '8px', verticalAlign: 'middle' }}></span></div>
          <p className="footer-desc">
            Meticulously crafted furniture for discerning homes. Every piece tells a story of artisanship, natural materials, and timeless design.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            {['Instagram', 'Pinterest', 'Behance'].map(social => (
              <span key={social} style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.3s' }}>
                {social}
              </span>
            ))}
          </div>
        </div>

        {/* Rooms Column */}
        <div>
          <p className="footer-title">By Room</p>
          <ul className="footer-links-list">
            {['Living Room', 'Dining Room', 'Bedroom', 'Outdoor Terrace', 'Home Office'].map(room => (
              <li key={room}>
                <button className="footer-link-link" onClick={() => setActiveTab('catalog')}>{room}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Furniture Types Column */}
        <div>
          <p className="footer-title">By Type</p>
          <ul className="footer-links-list">
            {['Sofas & Seating', 'Tables', 'Storage & Shelving', 'Beds & Headboards', 'Outdoor Loungers', 'Accent Pieces'].map(type => (
              <li key={type}>
                <button className="footer-link-link" onClick={() => setActiveTab('catalog')}>{type}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-newsletter-section">
          <p className="footer-title">Stay Inspired</p>
          <p className="footer-newsletter-text">
            Receive curated design stories, new collection launches, and behind-the-scenes craftsmanship narratives.
          </p>
          <div className="footer-input-row">
            <input type="email" placeholder="your@email.com" className="footer-input" />
            <button className="footer-input-btn">Subscribe →</button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <span>© 2026 Aurelia Home. All rights reserved.</span>
        <div className="footer-bottom-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Sustainability</span>
        </div>
      </div>
    </footer>
  );
}
