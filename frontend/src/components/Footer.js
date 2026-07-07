import React, { useState, useEffect } from 'react';

export default function Footer({ setActiveTab, onAdminTrigger }) {
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next === 4) {
        if (typeof onAdminTrigger === 'function') {
          onAdminTrigger();
        }
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 4000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-brand-section">
          <div 
            className="footer-logo" 
            onClick={handleLogoClick}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'stretch', 
              width: 'fit-content', 
              gap: '0px', 
              marginBottom: '16px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <span style={{ fontSize: '22px', letterSpacing: '0.05em', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', display: 'block', textAlign: 'center', lineHeight: '1' }}>
              MYSORE
            </span>
            <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--accent-brass)', fontFamily: 'var(--font-sans)', fontWeight: '700', textTransform: 'uppercase', marginTop: '3px', lineHeight: '1' }}>
              <span>H</span><span>A</span><span>N</span><span>D</span><span>I</span><span>C</span><span>R</span><span>A</span><span>F</span><span>T</span><span>S</span>
            </span>
          </div>
          <p className="footer-desc">
            Meticulously crafted heritage handicrafts from Mysore. Every piece tells a story of Indian artisanship, natural wood, and timeless traditional design.
          </p>
        </div>

        {/* Categories Column */}
        <div>
          <p className="footer-title">Categories</p>
          <ul className="footer-links-list">
            {[
              { label: 'Sandalwood', key: 'sandalwood' },
              { label: 'Rosewood', key: 'rosewood' },

              { label: 'Shivani Teakwood', key: 'shivani-teakwood' },
              { label: 'Wooden Wall Decor', key: 'wooden-wall-decor' },

            ].map(cat => (
              <li key={cat.label}>
                <button className="footer-link-link" onClick={() => setActiveTab('catalog', cat.key)}>{cat.label}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Artifact Types Column */}
        <div>
          <p className="footer-title">By Type</p>
          <ul className="footer-links-list">
            {[
              { label: 'Statues & Idols', key: 'statues' },
              { label: 'Home & Wooden Wall Decor', key: 'decor' },
              { label: 'Accessories & Decor', key: 'boxes' },
              { label: 'Prayer Beads (Malas)', key: 'utility' }
            ].map(type => (
              <li key={type.label}>
                <button className="footer-link-link" onClick={() => setActiveTab('catalog', type.isCategory ? type.key : 'all', type.isCategory ? '' : type.key)}>{type.label}</button>
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
        <span>© 2026 Mysore Handicrafts. All rights reserved.</span>
        <div className="footer-bottom-links">
          <button className="footer-link-link" onClick={() => setActiveTab('privacy')} style={{ fontSize: 'inherit', padding: 0 }}>Privacy Policy</button>
          <button className="footer-link-link" onClick={() => setActiveTab('terms')} style={{ fontSize: 'inherit', padding: 0 }}>Terms of Service</button>
          <button className="footer-link-link" onClick={() => setActiveTab('sustainability')} style={{ fontSize: 'inherit', padding: 0 }}>Sustainability</button>
        </div>
      </div>
    </footer>
  );
}

