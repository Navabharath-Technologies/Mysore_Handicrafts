import React, { useState, useEffect } from 'react';

export default function DetailDrawer({ product, isOpen, onClose, isPinned, onTogglePin }) {
  const [activeThumb, setActiveThumb] = useState('front');
  const [activeSwatch, setActiveSwatch] = useState(0);

  useEffect(() => {
    if (product) {
      setActiveThumb('front');
      setActiveSwatch(0);
    }
  }, [product]);

  if (!product) return null;

  const labelMap = { front: 'Front View', detail: 'Texture Close-up', room: 'In Situ', alternative: 'Lifestyle View' };

  // Deduplicate thumbnails to prevent showing repeated images
  const uniqueThumbnails = [];
  const seenUrls = new Set();
  Object.entries(product.images).forEach(([key, url]) => {
    if (url && !seenUrls.has(url)) {
      seenUrls.add(url);
      uniqueThumbnails.push({ key, url });
    }
  });

  // Parse dimensions for display
  const dimParts = product.dimensions.split('x').map(d => d.trim());

  return (
    <>
      <div className={`drawer-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`detail-drawer ${isOpen ? 'open' : ''}`}>
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
          <div className="drawer-main-img-wrap">
            <img
              src={activeSwatch >= 0 && activeSwatch < product.swatches.length ? product.swatches[activeSwatch].image : product.images[activeThumb]}
              alt={product.name}
              className="drawer-main-img"
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
                <img src={url} alt={labelMap[key] || key} className="drawer-thumb-img" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <span className="drawer-category">{product.category} — {product.subcategory}</span>
        <h2 className="drawer-name">{product.name}</h2>
        <p className="drawer-price">{product.price}</p>

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
        <div className="dimensions-grid">
          {dimParts.map((part, i) => {
            const labels = ['Width', 'Depth', 'Height'];
            return (
              <div key={i} className="dimension-item">
                <p className="dimension-label">{labels[i] || `Dim ${i + 1}`}</p>
                <p className="dimension-val">{part}</p>
              </div>
            );
          })}
        </div>

        {/* Action */}
        <div className="drawer-action-row">
          <button
            className={`drawer-btn-primary ${isPinned ? 'pinned' : ''}`}
            onClick={() => onTogglePin(product.id)}
          >
            {isPinned ? '♥ Pinned to Mood Board' : '+ Pin to Mood Board'}
          </button>
        </div>
      </div>
    </>
  );
}
