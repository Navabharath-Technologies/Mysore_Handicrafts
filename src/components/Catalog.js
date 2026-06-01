import React from 'react';
import { products } from '../data/products';

const categories = [
  { key: 'all', label: 'All Pieces' },
  { key: 'living', label: 'Living Room' },
  { key: 'dining', label: 'Dining Room' },
  { key: 'bedroom', label: 'Bedroom' },
  { key: 'outdoor', label: 'Outdoor' },
  { key: 'office', label: 'Home Office' }
];

export default function Catalog({ onOpenDetail, pinnedIds, onTogglePin, activeFilter, setActiveFilter, activeSubFilter, setActiveSubFilter, searchQuery, setSearchQuery }) {
  // 1. Filter by category first
  let filtered = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  // 2. Filter by subcategory (type) next
  if (activeSubFilter && activeSubFilter !== 'all') {
    if (activeSubFilter === 'seating') {
      filtered = filtered.filter(p => p.subcategory === 'sofa' || p.subcategory === 'chair' || p.subcategory === 'outdoor-seating');
    } else if (activeSubFilter === 'table') {
      filtered = filtered.filter(p => p.subcategory === 'table' || p.subcategory === 'outdoor-dining');
    } else if (activeSubFilter === 'storage') {
      filtered = filtered.filter(p => p.subcategory === 'storage');
    } else if (activeSubFilter === 'bed') {
      filtered = filtered.filter(p => p.subcategory === 'bed');
    } else if (activeSubFilter === 'poolside') {
      filtered = filtered.filter(p => p.subcategory === 'poolside');
    } else if (activeSubFilter === 'accent') {
      filtered = filtered.filter(p => p.subcategory === 'ottoman');
    }
  }

  // 3. Filter by search query next
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.materials.some(m => m.toLowerCase().includes(q))
    );
  }

  return (
    <section className="catalog-section" id="catalog-section">
      <div className="section-headline" style={{ textAlign: 'left', margin: '0 0 8px 0', maxWidth: 'none' }}>
        <p className="headline-sub">The Full Archive</p>
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
                  activeSubFilter === 'seating' ? 'Sofas & Seating' :
                  activeSubFilter === 'table' ? 'Tables' :
                  activeSubFilter === 'storage' ? 'Storage & Shelving' :
                  activeSubFilter === 'bed' ? 'Beds & Headboards' :
                  activeSubFilter === 'poolside' ? 'Outdoor Loungers' :
                  activeSubFilter === 'accent' ? 'Accent Pieces' : activeSubFilter
                }</strong>
                <button 
                  onClick={() => setActiveSubFilter('all')}
                  style={{ marginLeft: '12px', textDecoration: 'underline', color: 'var(--accent-clay)', fontWeight: '600', cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
                >
                  Clear Filter
                </button>
              </span>
            ) : (
              `Showing ${filtered.length} of ${products.length} pieces`
            )}
          </p>
        </div>
        <ul className="catalog-filters">
          {categories.map(cat => (
            <li key={cat.key}>
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
        <div className="dense-grid">
          {filtered.map((product) => {
            const isPinned = pinnedIds.includes(product.id);
            return (
              <div className="product-card" key={product.id}>
                <div className="product-card-img-wrap">
                  <img
                    src={product.images.front}
                    alt={product.name}
                    className="product-card-img main-view"
                    loading="lazy"
                  />
                  <img
                    src={Object.values(product.images).find(url => url && url !== product.images.front) || product.images.front}
                    alt={`${product.name} detail`}
                    className="product-card-img detail-view"
                    loading="lazy"
                  />
                  <button
                    className={`product-card-pin-btn glass-panel ${isPinned ? 'pinned' : ''}`}
                    onClick={(e) => { e.stopPropagation(); onTogglePin(product.id); }}
                    title={isPinned ? 'Remove from Mood Board' : 'Pin to Mood Board'}
                  >
                    {isPinned ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    )}
                  </button>
                </div>
                <div className="product-card-info">
                  <span className="product-card-sub">{product.category}</span>
                  <h3 className="product-card-title" onClick={() => onOpenDetail(product)}>
                    {product.name}
                  </h3>
                  <div className="product-card-meta">
                    <span className="product-card-price">{product.price}</span>
                    <span className="product-card-materials">
                      {product.materials.slice(0, 2).join(' · ')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
