import React, { useState, useEffect } from 'react';
import WatermarkImage from './WatermarkImage';
import { getSEOKeywords } from '../utils/synonyms';

export default function DetailDrawer({ product, isOpen, onClose, isPinned, onTogglePin }) {
  const [activeThumb, setActiveThumb] = useState('front');
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);
  const [lightboxImgSrc, setLightboxImgSrc] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimateIn(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (product) {
      setActiveThumb('front');
      setActiveSwatch(0);
    }
  }, [product]);

  // Automated SEO Injection
  useEffect(() => {
    if (isOpen && product) {
      const keywords = getSEOKeywords(product.subcategory);
      
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      
      const tags = [product.name, product.category, keywords].filter(Boolean).join(', ');
      metaKeywords.content = tags;
      
      document.title = `${product.name} | Mysore Handicrafts`;
    } else {
      document.title = 'Mysore Handicrafts | Premium Artifacts';
    }
  }, [isOpen, product]);

  if (!product) return null;

  const labelMap = { front: 'Front View', detail: 'Texture Close-up', room: 'In Situ', alternative: 'Lifestyle View', additional: 'Additional View', additional2: 'Detail View 2' };

  // Deduplicate thumbnails to prevent showing repeated images
  const uniqueThumbnails = [];
  const seenUrls = new Set();
  Object.entries(product.images).forEach(([key, url]) => {
    if (url && !seenUrls.has(url)) {
      seenUrls.add(url);
      uniqueThumbnails.push({ key, url });
    }
  });



  return (
    <>
      <div className={`drawer-backdrop ${animateIn ? 'open' : ''}`} onClick={onClose} />
      <div className={`detail-drawer ${animateIn ? 'open' : ''}`}>
        {/* Close Button */}
        <button className="drawer-close-btn" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Collection
        </button>

        {/* Gallery */}
        <div className="drawer-gallery-wrapper">
          <div 
            className="drawer-main-img-wrap"
            onClick={() => setLightboxImgSrc(activeSwatch >= 0 && activeSwatch < product.swatches.length ? product.swatches[activeSwatch].image : product.images[activeThumb])}
            style={{ cursor: 'zoom-in' }}
          >
            <WatermarkImage
              src={activeSwatch >= 0 && activeSwatch < product.swatches.length ? product.swatches[activeSwatch].image : product.images[activeThumb]}
              alt={product.name}
              className="drawer-main-img"
              showBlurredBackground={true}
            />
          </div>
          <div className="drawer-thumbnails">
            {uniqueThumbnails.map(({ key, url }) => (
              <div
                key={key}
                className={`drawer-thumb ${activeThumb === key || product.images[activeThumb] === url ? 'active' : ''}`}
                onClick={() => {
                  setActiveThumb(key);
                  const matchingSwatchIdx = product.swatches.findIndex(sw => sw.image === url);
                  setActiveSwatch(matchingSwatchIdx);
                }}
              >
                <img src={url} alt={labelMap[key] || `Additional View ${parseInt(key.split('_')[1] || 0) + 1}`} className="drawer-thumb-img" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <span className="drawer-category" style={{ textTransform: 'capitalize' }}>{product.category.replace('-', ' ')} — {product.subcategory.replace('-', ' ')}</span>
        <h2 className="drawer-name">{product.name}</h2>

        {/* Action (Moved Up) */}
        <div className="drawer-action-row" style={{ marginTop: '0px', marginBottom: '24px' }}>
          <button
            className="drawer-btn-primary whatsapp-enquiry-btn"
            onClick={() => {
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
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Enquire on WhatsApp
          </button>
        </div>

        <div className="drawer-divider" />

        {/* Description */}
        <p className="drawer-section-title">About this Piece</p>
        <p className="drawer-description">{product.description}</p>

        <div className="drawer-divider" />

        {/* Materials Chips */}
        <p className="drawer-section-title">Craftsmanship & Materials</p>
        <div className="drawer-chips">
          {product.materials.map((mat, i) => (
            <span key={i} className="drawer-chip">{mat}</span>
          ))}
        </div>

        {/* Swatches */}
        {product.swatches.length > 1 && (
          <>
            <p className="drawer-section-title">Available Finishes</p>
            <div className="swatch-picker">
              {product.swatches.map((sw, i) => (
                <button
                  key={i}
                  className={`swatch-option-btn ${activeSwatch === i ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSwatch(i);
                    const swatchImg = sw.image;
                    const matchingKey = Object.keys(product.images).find(key => product.images[key] === swatchImg);
                    if (matchingKey) {
                      setActiveThumb(matchingKey);
                    }
                  }}
                >
                  <div className="swatch-color-circle" style={{ backgroundColor: sw.color }} />
                  <span className="swatch-name-label">{sw.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <div className="drawer-divider" />

        {/* Dimensions */}
        <p className="drawer-section-title">Dimensions</p>
        <div className="dimension-item">
          <p className="dimension-val">{product.dimensions}</p>
        </div>

      </div>

      {lightboxImgSrc && (
        <div className="lightbox-overlay" onClick={() => setLightboxImgSrc(null)}>
          <button className="lightbox-close-btn" onClick={() => setLightboxImgSrc(null)}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImgSrc} alt={product.name} className="lightbox-img" />
          </div>
        </div>
      )}
    </>
  );
}

