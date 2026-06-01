import React, { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingOverlay from './components/LoadingOverlay';
import HotspotRoom from './components/HotspotRoom';
import Catalog from './components/Catalog';
import DetailDrawer from './components/DetailDrawer';
import InspirationMasonry from './components/InspirationMasonry';
import MoodBoard from './components/MoodBoard';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [drawerProduct, setDrawerProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pinnedIds, setPinnedIds] = useState([]);

  // Force scroll to top on refresh
  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleOpenDetail = (product) => {
    setDrawerProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setDrawerProduct(null), 500);
  };

  const handleTogglePin = (productId) => {
    setPinnedIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    scrollToTop();
  };

  return (
    <div className="App">
      {isLoading && <LoadingOverlay onFinish={() => setIsLoading(false)} />}
      <Navbar
        activeTab={activeTab}
        setActiveTab={switchTab}
        pinnedCount={pinnedIds.length}
      />

      {/* Main Content Based on Active Tab */}
      {activeTab === 'home' && (
        <>
          <Hero setActiveTab={switchTab} />

          {/* Featured Banner Strip */}
          <div className="featured-banner-strip">
            {[
              { icon: '◆', text: 'Handcrafted Excellence' },
              { icon: '◆', text: 'Sustainable Materials' },
              { icon: '◆', text: 'Global Delivery' },
              { icon: '◆', text: '10-Year Warranty' }
            ].map((item, i) => (
              <div key={i} className="featured-banner-item">
                <span className="featured-banner-icon">{item.icon}</span>
                <span className="featured-banner-text">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Featured Product Strip */}
          <section className="featured-products-section">
            <div className="section-headline">
              <p className="headline-sub">Editor's Selection</p>
              <h2 className="headline-main">Featured Masterpieces</h2>
              <p className="headline-text">Our most coveted designs — each chosen for exceptional material quality, sculptural form, and timeless appeal.</p>
            </div>
            <div className="featured-products-grid">
              {(() => {
                const { products } = require('./data/products');
                return products.filter(p => p.featured).map(product => (
                  <div
                    key={product.id}
                    className="featured-product-card"
                    onClick={() => handleOpenDetail(product)}
                  >
                    <img
                      src={product.images.room}
                      alt={product.name}
                      className="featured-product-card-img"
                      loading="lazy"
                    />
                    <div className="featured-product-card-overlay">
                      <span className="featured-product-card-cat">
                        {product.category}
                      </span>
                      <h3 className="featured-product-card-title">
                        {product.name}
                      </h3>
                      <span className="featured-product-card-price">{product.price}</span>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </section>

          {/* Full-width Lifestyle Banner */}
          <section className="lifestyle-banner-section">
            <img
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=90"
              alt="Luxury Interior"
              className="lifestyle-banner-img"
            />
            <div className="lifestyle-banner-overlay">
              <div className="lifestyle-banner-content">
                <p className="lifestyle-banner-sub">
                  The Outdoor Edit
                </p>
                <h2 className="lifestyle-banner-heading">
                  Bring Sophistication to Every Open-Air Moment
                </h2>
                <p className="lifestyle-banner-desc">
                  Premium teak sun loungers, braided dining sets, and stone accent tables. Weather-resistant. Forever elegant.
                </p>
                <button className="btn-luxury" onClick={() => switchTab('catalog')}>
                  Explore Outdoor
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </section>

          {/* Quick-view Room Image Grid */}
          <section className="room-spaces-section">
            <div className="section-headline">
              <p className="headline-sub">Browse by Space</p>
              <h2 className="headline-main">Explore Every Room</h2>
            </div>
            <div className="room-spaces-grid">
              {[
                { label: 'Living Room', img: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80', span: true },
                { label: 'Bedroom', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', span: false },
                { label: 'Outdoor', img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80', span: false },
                { label: 'Dining', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', span: false },
                { label: 'Home Office', img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80', span: false }
              ].map((room, i) => (
                <div
                  key={i}
                  className={`room-spaces-item ${room.span ? 'span-2' : ''}`}
                  onClick={() => switchTab('catalog')}
                >
                  <img
                    src={room.img}
                    alt={room.label}
                    className="room-spaces-img"
                  />
                  <div className="room-spaces-overlay">
                    <h3 className="room-spaces-title">{room.label}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Second Lifestyle Image Banner */}
          <section className="second-banner-section">
            <img
              src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=90"
              alt="Outdoor Living"
              className="second-banner-img"
            />
            <div className="second-banner-overlay">
              <div className="second-banner-content">
                <p className="second-banner-sub">
                  Curate Your Vision
                </p>
                <h2 className="second-banner-heading">
                  Design Your Dream Space
                </h2>
                <p className="second-banner-desc">
                  Use our interactive Mood Board to combine your favourite pieces and visualize your perfect room.
                </p>
                <button className="btn-luxury second-banner-btn" onClick={() => switchTab('moodboard')}>
                  Open Mood Board
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'spaces' && (
        <div style={{ paddingTop: 'var(--header-height)' }}>
          <HotspotRoom onOpenDetail={handleOpenDetail} />
        </div>
      )}

      {activeTab === 'catalog' && (
        <div style={{ paddingTop: 'var(--header-height)' }}>
          <Catalog
            onOpenDetail={handleOpenDetail}
            pinnedIds={pinnedIds}
            onTogglePin={handleTogglePin}
          />
        </div>
      )}

      {activeTab === 'inspiration' && (
        <div style={{ paddingTop: 'var(--header-height)' }}>
          <InspirationMasonry onOpenDetail={handleOpenDetail} />
        </div>
      )}

      {activeTab === 'moodboard' && (
        <div style={{ paddingTop: 'var(--header-height)' }}>
          <MoodBoard pinnedIds={pinnedIds} onTogglePin={handleTogglePin} />
        </div>
      )}

      {/* Detail Drawer */}
      <DetailDrawer
        product={drawerProduct}
        isOpen={isDrawerOpen}
        onClose={handleCloseDetail}
        isPinned={drawerProduct ? pinnedIds.includes(drawerProduct.id) : false}
        onTogglePin={handleTogglePin}
      />

      <Footer setActiveTab={switchTab} />
    </div>
  );
}

export default App;
