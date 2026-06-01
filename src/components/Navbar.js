import React, { useState, useEffect } from 'react';

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('catalog');
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <nav className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo" onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} style={{ cursor: 'pointer' }}>
            AURELIA
            <span className="navbar-logo-dot"></span>
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
              Hotspot Rooms
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
              Inspiration Feed
            </li>
            <li 
              className={`navbar-link-item ${activeTab === 'moodboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('moodboard')}
            >
              Mood Board
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

            {/* Mood Board Pinned Items Counter Button */}
            <button 
              className="navbar-action-btn"
              onClick={() => setActiveTab('moodboard')}
              title="View Mood Board Canvas"
              style={{ backgroundColor: activeTab === 'moodboard' ? 'rgba(194, 168, 132, 0.15)' : 'transparent' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8.48 8.48 0 0 1 8 8v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a8.48 8.48 0 0 1 8-8z"></path>
                <line x1="12" y1="10" x2="12" y2="16"></line>
                <line x1="9" y1="13" x2="15" y2="13"></line>
              </svg>
              {pinnedCount > 0 && <span className="badge-count">{pinnedCount}</span>}
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              className="navbar-action-btn navbar-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              title="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
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
              Explore the Aurelia Archive
            </h3>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', borderBottom: '1px solid var(--text-primary)', paddingBottom: '12px', marginBottom: '24px' }}>
              <input 
                type="text" 
                placeholder="Search Bouclé, Teak, Outdoor Sofa..." 
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
              {['Sectional', 'Teak Lounger', 'Travertine', 'Linen Chair', 'Outdoor'].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => { setSearchQuery(tag); }}
                  style={{ padding: '6px 14px', borderRadius: '20px', backgroundColor: 'var(--bg-secondary)', fontSize: '11px', fontWeight: '500' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Backdrop & Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-backdrop open" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-panel animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-logo">
                AURELIA<span className="navbar-logo-dot"></span>
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
                { id: 'spaces', label: 'Hotspot Rooms' },
                { id: 'catalog', label: 'The Collection' },
                { id: 'inspiration', label: 'Inspiration Feed' },
                { id: 'moodboard', label: 'Mood Board' }
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
            </ul>
            <div className="mobile-menu-footer">
              <span className="mobile-menu-copyright">© 2026 Aurelia. Handcrafted Excellence.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
