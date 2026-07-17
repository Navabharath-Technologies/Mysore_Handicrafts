import React, { useState, useEffect } from 'react';
import Reveal from './Reveal';
import WatermarkImage from './WatermarkImage';
import { getBaseTermForSynonym } from '../utils/synonyms';

const categories = [
  { key: 'all', label: 'All Artifacts', desc: "Explore our full archive of meticulously handcrafted masterpieces. From sacred Chandana and dense Rosewood to perfect Shivani Teakwood substitutes and unique natural colour wood wall hangings, our collection preserves centuries of royal Mysore heritage and generational artistry." },
  { key: 'sandalwood', label: 'Sandalwood', desc: "Known as Chandana, this highly priced wood has a pleasant fragrance and good oil content with great medicinal value. Termed \"ROYAL\" and considered Sacred by different societies, it is used to make figurines, artefacts, religious Pooja items used by different communities and other artwork by artists who attain their skills by the generations." },
  { key: 'rosewood', label: 'Rosewood', desc: "A characteristically dark and highly grained wood ranging in color from rich red to dark brown. Priced historically for its close, dense grain which makes it extremely strong and durable, it is famous in Mysore for intricate Inlay work assembled like a puzzle since the time of the Maharajas." },
  { key: 'shivani-teakwood', label: 'Shivani Teakwood', desc: "As Sandalwood is not got in abundance, artifacts are made in Shivani Wood. The color of the wood is slightly close to sandalwood thus making it a perfect substitute. It is used to craft timeless, premium wooden idols and decorative artifacts with a robust and beautiful finish." },
  { key: 'wooden-wall-decor', label: 'Wooden Wall Decor', desc: "This is an art form in which we use different Natural Colour wood individually cut to desired shapes and assembled to form a subject. There is no touch of colour as we take only the natural colour wood dependent on Mother Nature. This is a unique art form done only in Mysore and no other place in the world." },
];

export default function Catalog({ products, onOpenDetail, pinnedIds, onTogglePin, activeFilter, setActiveFilter, activeSubFilter, setActiveSubFilter, searchQuery, setSearchQuery }) {
  // Extract unique subcategories for the current category
  const baseCategoryProducts = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  const uniqueSubcategories = [...new Set(
    baseCategoryProducts
      .map(p => p.subcategory?.trim()?.toLowerCase())
      .filter(Boolean)
  )].sort();

  const [scrollDirection, setScrollDirection] = useState('up');
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const [displayCount, setDisplayCount] = useState(16);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(16);
  }, [activeFilter, activeSubFilter, searchQuery]);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';

      // Determine if we scrolled past the top of the catalog section
      const catalogEl = document.getElementById('catalog-section');
      if (catalogEl) {
        if (scrollY > catalogEl.offsetTop + 100) {
          setIsPastThreshold(true);
        } else {
          setIsPastThreshold(false);
        }
      }

      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection]);

  // 1. Filter by category first and apply a deterministic shuffle
  let filtered = [...baseCategoryProducts];
  filtered.sort((a, b) => {
    const revA = a.id.split('').reverse().join('');
    const revB = b.id.split('').reverse().join('');
    return revA.localeCompare(revB);
  });

  // 2. Filter by subcategory (type) next
  if (activeSubFilter && activeSubFilter !== 'all') {
    const legacyMap = {
      'statues': ['idol'],
      'carvings': ['carving'],
      'decor': ['panel', 'furniture', 'temple'],
      'boxes': ['accessory'],
      'utility': ['mala', 'accessory']
    };

    if (legacyMap[activeSubFilter]) {
      filtered = filtered.filter(p => legacyMap[activeSubFilter].includes(p.subcategory?.trim()?.toLowerCase()));
    } else {
      // Dynamic exact match
      filtered = filtered.filter(p => p.subcategory?.trim()?.toLowerCase() === activeSubFilter.toLowerCase());
    }
  }

  // 3. Filter by search query next
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    const baseTerm = getBaseTermForSynonym(q);

    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.materials.some(m => m.toLowerCase().includes(q)) ||
      p.subcategory?.toLowerCase().includes(q) ||
      (baseTerm && p.subcategory?.toLowerCase().includes(baseTerm))
    );
  }

  const filterButtonsContent = (
    <>
      {/* Sub Filters */}
      <ul className="catalog-filters hide-scrollbar" style={{ margin: 0, paddingBottom: '8px' }}>
        {categories.map(cat => (
          <li key={cat.key} style={{ flexShrink: 0 }}>
            <button
              className={`catalog-filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(cat.key);
                setActiveSubFilter('all');
                setSearchQuery('');
              }}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Dynamic Subcategory Filters */}
      {uniqueSubcategories.length > 0 && (
        <ul className="catalog-filters hide-scrollbar" style={{ margin: 0, gap: '6px', paddingBottom: '4px', marginTop: '6px' }}>
          <li key="all-subs" style={{ flexShrink: 0 }}>
            <button
              className={`catalog-subfilter-btn ${activeSubFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveSubFilter('all')}
            >
              All Types
            </button>
          </li>
          {uniqueSubcategories.map(subcat => (
            <li key={subcat} style={{ flexShrink: 0 }}>
              <button
                className={`catalog-subfilter-btn ${activeSubFilter === subcat ? 'active' : ''}`}
                onClick={() => setActiveSubFilter(subcat)}
                style={{ textTransform: 'capitalize' }}
              >
                {subcat}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <section className="catalog-section" id="catalog-section">
      <div className={`catalog-top-sticky-container ${isPastThreshold && scrollDirection === 'down' ? 'sticky-hidden' : ''}`}>
        <div className="section-headline" style={{ textAlign: 'left', margin: '0 0 8px 0', padding: '0', maxWidth: 'none', height: 'auto', minHeight: 'auto' }}>
          <h2 className="headline-main" style={{ textAlign: 'left' }}>Our Collection</h2>
        </div>

        <div className="catalog-header">
          <div className="catalog-title-wrap">
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {searchQuery ? (
                <span>
                  Found {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "<strong>{searchQuery}</strong>"
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ marginLeft: '12px', textDecoration: 'underline', color: 'var(--accent-clay)', fontWeight: '600', cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
                  >
                    Clear Search
                  </button>
                </span>
              ) : activeSubFilter !== 'all' ? (
                <span>
                  Showing {filtered.length} piece{filtered.length !== 1 ? 's' : ''} of type <strong>{
                    activeSubFilter === 'statues' ? 'Statues & Idols' :
                      activeSubFilter === 'carvings' ? 'Wood Carvings' :
                        activeSubFilter === 'decor' ? 'Home & Wooden Wall Decor' :
                          activeSubFilter === 'boxes' ? 'Boxes & Chests' :
                            activeSubFilter === 'utility' ? 'Utility & Accent Items' : activeSubFilter
                  }</strong>
                  <button
                    onClick={() => setActiveSubFilter('all')}
                    style={{ marginLeft: '12px', textDecoration: 'underline', color: 'var(--accent-clay)', fontWeight: '600', cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
                  >
                    Clear Filter
                  </button>
                </span>
              ) : (
                `Showing ${filtered.length} of ${baseCategoryProducts.length} artifacts`
              )}
            </p>
          </div>
          <div className="catalog-filters-desktop-wrap desktop-only">
            {filterButtonsContent}
          </div>
        </div>

        <div className="catalog-filters-sticky-wrap mobile-only">
          {filterButtonsContent}
        </div>
      </div>

      {/* Category Description */}
      <div style={{ marginBottom: '35px', width: '100%' }}>
        <p className="catalog-category-desc">
          {categories.find(c => c.key === activeFilter)?.desc}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', marginTop: '30px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1" style={{ marginBottom: '16px', opacity: 0.5 }}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-primary)' }}>No pieces match your search</p>
          <p style={{ fontSize: '14px', marginBottom: '24px', color: 'var(--text-secondary)' }}>Try searching for a different keyword or browsing by room category.</p>
          <button
            className="btn-luxury"
            onClick={() => { setSearchQuery(''); setActiveFilter('all'); setActiveSubFilter('all'); }}
            style={{ padding: '14px 28px', fontSize: '11px', cursor: 'pointer' }}
          >
            Reset Filters & Search
          </button>
        </div>
      ) : (
        <>
          <div className="dense-grid" key={`${activeFilter}-${activeSubFilter}-${searchQuery}`}>
            {filtered.slice(0, displayCount).map((product, idx) => {
              return (
                <Reveal
                  className="product-card"
                  key={product.id}
                  delay={(idx % 4) * 100}
                >
                  <div
                    className="product-card-img-wrap"
                    onClick={() => onOpenDetail(product)}
                    style={{ cursor: 'pointer' }}
                  >
                    <WatermarkImage
                      src={product.images.front}
                      alt={product.name}
                      className="product-card-img main-view"
                      wrapClassName="main-view-wrap"
                      loading="lazy"
                    />
                    <WatermarkImage
                      src={Object.values(product.images).find(url => url && url !== product.images.front) || product.images.front}
                      alt={`${product.name} detail`}
                      className="product-card-img detail-view"
                      wrapClassName="detail-view-wrap"
                      loading="lazy"
                    />
                    <button
                      className="product-card-pin-btn glass-panel whatsapp-card-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        const number = "919845106280";
                        const message = `Hello Mysore Handicrafts,
  
  I would like to enquire about:
  *Product Name:* ${product.name}
  *Category:* ${product.category}
  *Price:* ${product.price}
  
  Please let me know more details about its availability and shipping.`;
                        const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
                        window.open(waUrl, '_blank');
                      }}
                      title="Enquire on WhatsApp"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </button>
                  </div>
                  <div className="product-card-info">
                    <span className="product-card-sub">{product.category}</span>
                    <h3 className="product-card-title" onClick={() => onOpenDetail(product)}>
                      {product.name}
                    </h3>
                    <div className="product-card-meta">
                      <span className="product-card-materials">
                        {product.materials.slice(0, 2).join(' · ')}
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          
          {displayCount < filtered.length && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button 
                className="btn-luxury"
                onClick={() => setDisplayCount(prev => prev + 16)}
                style={{ padding: '16px 40px', fontSize: '13px', cursor: 'pointer' }}
              >
                Load More Artifacts
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

