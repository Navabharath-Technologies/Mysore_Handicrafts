import React, { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingOverlay from './components/LoadingOverlay';
import About from './components/About';
import Catalog from './components/Catalog';
import DetailDrawer from './components/DetailDrawer';
import InspirationMasonry from './components/InspirationMasonry';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Sustainability from './components/Sustainability';
import WatermarkImage from './components/WatermarkImage';
import Reveal from './components/Reveal';
import MagneticButton from './components/MagneticButton';
import useProducts from './data/useProducts';
import homeCtaImg from './images/home-cta.webp';
import royalHeritageBannerImg from './images/royal_heritage_banner_new2.webp';
import catSandalwoodImg from './images/cat_sandalwood_new2.webp';
import catWoodCarvingsImg from './images/cat_wood_carvings.webp';

import catTeakwoodImg from './images/cat_teakwood_new.webp';
import catWallDecorImg from './images/cat_wall_decor.webp';
function App() {
  const { products } = useProducts();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [drawerProduct, setDrawerProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pinnedIds, setPinnedIds] = useState([]);
  const [catalogFilter, setCatalogFilter] = useState('all');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogSubcategory, setCatalogSubcategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const switchTab = (tab, category = 'all', subcategory = 'all', search = '') => {
    if (tab === activeTab && category === catalogFilter && subcategory === catalogSubcategory && search === catalogSearch) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setCatalogFilter(category);
      setCatalogSubcategory(subcategory);
      setCatalogSearch(search);
      scrollToTop();
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="App">
      {isLoading && <LoadingOverlay onFinish={() => setIsLoading(false)} />}
      <Navbar
        activeTab={activeTab}
        setActiveTab={switchTab}
        pinnedCount={pinnedIds.length}
      />

      <main className={`page-transition ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        {/* Main Content Based on Active Tab */}
        {activeTab === 'home' && (
        <>
          <Hero setActiveTab={switchTab} />

          {/* Featured Banner Strip */}
          <div className="featured-banner-strip">
            {[
              { icon: '◆', text: 'Handcrafted Excellence' },
              { icon: '◆', text: 'Sustainable Materials' },
              { icon: '◆', text: 'Traditional Craftsmanship' },
              { icon: '◆', text: 'Skilled Artisan Work' }
            ].map((item, i) => (
              <div key={i} className="featured-banner-item">
                <span className="featured-banner-icon">{item.icon}</span>
                <span className="featured-banner-text">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Quick-view Room Image Grid (Browse by Category) */}
          <section className="room-spaces-section">
            <Reveal delay={0}>
              <div className="section-headline">
                <p className="headline-sub">Browse by Category</p>
                <h2 className="headline-main">Explore Our Heritage</h2>
              </div>
            </Reveal>
            <div className="room-spaces-grid">
              {[
                { label: 'Sandalwood', key: 'sandalwood', desc: 'Rare Mysore sandalwood idols & aromas crafted for eternity.', img: catSandalwoodImg, span: false },
                { label: 'Rosewood', key: 'rosewood', desc: 'Intricate rosewood sculptures & furniture by hereditary artisans.', img: catWoodCarvingsImg, span: false },

                { label: 'Shivani Teakwood', key: 'shivani-teakwood', desc: 'Hand-carved premium Shivani teakwood idols & divine sculptures.', img: catTeakwoodImg, span: false },
                { label: 'Wooden Wall Decor', key: 'wooden-wall-decor', desc: 'Exquisite rosewood inlay panels depicting Mysore court traditions.', img: catWallDecorImg, span: false },

              ].map((room, i) => (
                <Reveal 
                  key={i} 
                  delay={50 + (i * 50)}
                  className={`room-spaces-item room-spaces-${room.key} ${room.span ? 'span-2' : ''}`}
                  onClick={() => switchTab('catalog', room.key)}
                >
                  <img
                    src={room.img}
                    alt={room.label}
                    className="room-spaces-img"
                  />
                  <div className="room-spaces-overlay">
                    <h3 className="room-spaces-title">{room.label}</h3>
                    <p className="room-spaces-desc">{room.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Full-width Lifestyle Banner */}
          <section 
            className="lifestyle-banner-section parallax-bg"
            style={{ backgroundImage: `url(${royalHeritageBannerImg})` }}
          >
            <div className="lifestyle-banner-overlay">
              <div className="lifestyle-banner-content">
                <p className="lifestyle-banner-sub">
                  The Royal Heritage Collection
                </p>
                <h2 className="lifestyle-banner-heading">
                  Bring Auspicious Elegance to Your Home
                </h2>
                <p className="lifestyle-banner-desc">
                  Premium Mysore Rosewood, intricately carved deities, and timeless inlay wooden wall decor. Meticulously handcrafted. Forever beautiful.
                </p>
                <MagneticButton className="btn-luxury" onClick={() => switchTab('catalog', 'rosewood')}>
                  Explore Collection
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </MagneticButton>
              </div>
            </div>
          </section>

          {/* Featured Product Strip (Curator's Selection) */}
          <section className="featured-products-section">
            <Reveal delay={0}>
              <div className="section-headline">
                <p className="headline-sub">Curator's Selection</p>
                <h2 className="headline-main">Featured Masterpieces</h2>
                <p className="headline-text">Our most coveted heritage items — each chosen for exceptional wood quality, intricate carving, and timeless cultural appeal.</p>
              </div>
            </Reveal>
            <div className="featured-products-grid">
              {products.filter(p => p.featured).map((product, idx) => (
                <Reveal 
                  key={product.id} 
                  delay={50 + (idx * 50)}
                  className="featured-product-card"
                  onClick={() => handleOpenDetail(product)}
                >
                  <WatermarkImage
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
                    <span className="featured-product-card-price" style={{display:'none'}}>{product.price}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Second Lifestyle Image Banner */}
          <section className="second-banner-section">
            <img
              src={homeCtaImg}
              alt="Mysore Handicrafts Collection"
              className="second-banner-img"
            />
            <div className="second-banner-overlay">
              <div className="second-banner-content">
                <p className="second-banner-sub">
                  Curate Your Collection
                </p>
                <h2 className="second-banner-heading" style={{ marginBottom: '40px' }}>
                  Find the Perfect Masterpiece
                </h2>
                <MagneticButton className="btn-luxury second-banner-btn" onClick={() => switchTab('contact')}>
                  Contact Us
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </MagneticButton>
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'spaces' && (
        <div>
          <About />
        </div>
      )}

      {activeTab === 'catalog' && (
        <div style={{ paddingTop: '70px' }}>
          <Catalog
            products={products}
            onOpenDetail={handleOpenDetail}
            pinnedIds={pinnedIds}
            onTogglePin={handleTogglePin}
            activeFilter={catalogFilter}
            setActiveFilter={setCatalogFilter}
            activeSubFilter={catalogSubcategory}
            setActiveSubFilter={setCatalogSubcategory}
            searchQuery={catalogSearch}
            setSearchQuery={setCatalogSearch}
          />
        </div>
      )}

      {activeTab === 'inspiration' && (
        <div style={{ paddingTop: '70px' }}>
          <InspirationMasonry products={products} onOpenDetail={handleOpenDetail} />
        </div>
      )}

      {activeTab === 'contact' && (
        <div style={{ paddingTop: '70px' }}>
          <Contact />
        </div>
      )}

      {activeTab === 'privacy' && (
        <div style={{ paddingTop: '70px' }}>
          <PrivacyPolicy />
        </div>
      )}

      {activeTab === 'terms' && (
        <div style={{ paddingTop: '70px' }}>
          <TermsOfService />
        </div>
      )}

      {activeTab === 'sustainability' && (
        <div style={{ paddingTop: '70px' }}>
          <Sustainability />
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
      </main>

      <Footer setActiveTab={switchTab} />
    </div>
  );
}

export default App;

