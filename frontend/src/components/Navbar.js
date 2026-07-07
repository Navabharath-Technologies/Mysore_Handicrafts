import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Navbar({ activeTab, setActiveTab, pinnedCount }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle glassmorphism blur shift on page scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle body class for 3D Push/Fold effect
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
      document.body.classList.add('mobile-menu-active');
    } else {
      document.body.classList.remove('mobile-menu-active');
    }
  }, [isMobileMenuOpen]);

  const submitSearch = (query) => {
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      let matchedCategory = 'all';
      let searchVal = query.trim();

      // Map to correct category if it matches category keywords
      if (q.includes('sandalwood') || q.includes('fragrance') || q.includes('fan')) {
        matchedCategory = 'sandalwood';
        searchVal = '';
      } else if (q.includes('wood') || q.includes('rosewood') || q.includes('carving') || q.includes('screen') || q.includes('elephant')) {
        matchedCategory = 'rosewood';
        searchVal = '';

      } else if (q.includes('brass') || q.includes('peacock') || q.includes('diya') || q.includes('urli')) {
        matchedCategory = 'brass';
        searchVal = '';
      } else if (q.includes('wall') || q.includes('decor') || q.includes('jharokha') || q.includes('frame') || q.includes('bracket')) {
        matchedCategory = 'wooden-wall-decor';
        searchVal = '';
      }
      setActiveTab('catalog', matchedCategory, searchVal);
      setIsSearchOpen(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    submitSearch(searchQuery);
  };

  return (
    <>
      <nav className={`navbar-container ${isScrolled || activeTab !== 'home' ? 'scrolled' : ''}`}>
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo" onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 'fit-content', gap: '0px' }}>
            <span style={{ fontSize: '22px', letterSpacing: '0.05em', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', display: 'block', textAlign: 'center', lineHeight: '1' }}>
              MYSORE
            </span>
            <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--accent-brass)', fontFamily: 'var(--font-sans)', fontWeight: '700', textTransform: 'uppercase', marginTop: '3px', lineHeight: '1' }}>
              <span>H</span><span>A</span><span>N</span><span>D</span><span>I</span><span>C</span><span>R</span><span>A</span><span>F</span><span>T</span><span>S</span>
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="navbar-links">
            <li 
              className={`navbar-link-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              Home
            </li>
            <li 
              className={`navbar-link-item ${activeTab === 'spaces' ? 'active' : ''}`}
              onClick={() => setActiveTab('spaces')}
            >
              About Us
            </li>
            <li 
              className={`navbar-link-item ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              The Collection
            </li>
            <li 
              className={`navbar-link-item ${activeTab === 'inspiration' ? 'active' : ''}`}
              onClick={() => setActiveTab('inspiration')}
            >
              Inspiration Gallery
            </li>
            <li 
              className={`navbar-link-item ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              Contact Us
            </li>
          </ul>

          {/* Action Icons */}
          <div className="navbar-actions">
            {/* Search Button */}
            <button 
              className="navbar-action-btn"
              onClick={() => setIsSearchOpen(true)}
              title="Search Collection"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Direct WhatsApp Call Shortcut */}
            <a 
              className="navbar-action-btn"
              href="https://wa.me/919845106280"
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>

            {/* Mobile Hamburger Button */}
            <button 
              className="navbar-action-btn navbar-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              title="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Search Overlay */}
      {isSearchOpen && (
        <div className="drawer-backdrop open" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel animate-slide-up" style={{ padding: '50px 80px', borderRadius: '16px', width: '90%', maxWidth: '640px', position: 'relative' }}>
            <button 
              onClick={() => setIsSearchOpen(false)}
              style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-secondary)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3 style={{ marginBottom: '20px', fontSize: '20px', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>
              Explore the Mysore Archive
            </h3>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', borderBottom: '1px solid var(--text-primary)', paddingBottom: '12px', marginBottom: '24px' }}>
              <input 
                type="text" 
                placeholder="Search Sandalwood, Rosewood, Brass Peacock..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{ flex: 1, border: 'none', background: 'none', fontSize: '18px', outline: 'none', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}
              />
              <button type="submit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', alignSelf: 'center' }}>Popular:</span>
              {['Sandalwood', 'Rosewood', 'Brass Diya', 'Ganesha Idol', 'Wall Panel'].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => { setSearchQuery(tag); submitSearch(tag); }}
                  style={{ padding: '6px 14px', borderRadius: '20px', backgroundColor: 'var(--bg-secondary)', fontSize: '11px', fontWeight: '500' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Backdrop & Drawer (Rendered via Portal) */}
      {createPortal(
        <div className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-panel animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 'fit-content', gap: '0px' }}>
                <span style={{ fontSize: '20px', letterSpacing: '0.05em', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', display: 'block', textAlign: 'center', lineHeight: '1' }}>
                  MYSORE
                </span>
                <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'var(--accent-brass)', fontFamily: 'var(--font-sans)', fontWeight: '700', textTransform: 'uppercase', marginTop: '2px', lineHeight: '1' }}>
                  <span>H</span><span>A</span><span>N</span><span>D</span><span>I</span><span>C</span><span>R</span><span>A</span><span>F</span><span>T</span><span>S</span>
                </span>
              </span>
              <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <ul className="mobile-menu-links">
              {[
                { id: 'home', label: 'Home' },
                { id: 'spaces', label: 'About Us' },
                { id: 'catalog', label: 'The Collection' },
                { id: 'inspiration', label: 'Inspiration Gallery' },
                { id: 'contact', label: 'Contact Us' }
              ].map((link) => (
                <li 
                  key={link.id}
                  className={`mobile-menu-link-item ${activeTab === link.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </li>
              ))}
              
              {/* Extra Mobile Actions */}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <li 
                  className="mobile-menu-link-item"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => setIsSearchOpen(true), 300); // Wait for menu to close before opening search
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  Search Collection
                </li>
                
                <li className="mobile-menu-link-item">
                  <a href="https://wa.me/919845106280" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'inherit', textDecoration: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </li>
              </div>
            </ul>
            <div className="mobile-menu-footer">
              <span className="mobile-menu-copyright">© 2026 Mysore. Handcrafted Excellence.</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

