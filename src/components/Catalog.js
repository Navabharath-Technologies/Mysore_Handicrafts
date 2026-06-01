import React, { useState } from 'react';
import { products } from '../data/products';

const categories = [
  { key: 'all', label: 'All Pieces' },
  { key: 'living', label: 'Living Room' },
  { key: 'dining', label: 'Dining Room' },
  { key: 'bedroom', label: 'Bedroom' },
  { key: 'outdoor', label: 'Outdoor' },
  { key: 'office', label: 'Home Office' }
];

export default function Catalog({ onOpenDetail, pinnedIds, onTogglePin }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <section className="catalog-section" id="catalog-section">
      <div className="section-headline" style={{ textAlign: 'left', margin: '0 0 8px 0', maxWidth: 'none' }}>
        <p className="headline-sub">The Full Archive</p>
        <h2 className="headline-main" style={{ textAlign: 'left' }}>Our Collection</h2>
      </div>

      <div className="catalog-header">
        <div className="catalog-title-wrap">
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Showing {filtered.length} of {products.length} pieces
          </p>
        </div>
        <ul className="catalog-filters">
          {categories.map(cat => (
            <li key={cat.key}>
              <button
                className={`catalog-filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.key)}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

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
    </section>
  );
}
