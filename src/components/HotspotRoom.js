import React, { useState } from 'react';
import { products } from '../data/products';

const spaces = [
  {
    id: "living",
    label: "Living Room",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90",
    hotspots: [
      { x: 35, y: 55, productId: "liv-01" },
      { x: 55, y: 70, productId: "liv-02" },
      { x: 75, y: 50, productId: "liv-03" },
      { x: 20, y: 40, productId: "liv-04" }
    ]
  },
  {
    id: "dining",
    label: "Dining Room",
    image: "https://images.unsplash.com/photo-1505409628601-edc9af17fda6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hotspots: [
      { x: 50, y: 50, productId: "din-01" },
      { x: 30, y: 60, productId: "din-02" },
      { x: 80, y: 45, productId: "din-03" },
      { x: 65, y: 70, productId: "din-04" }
    ]
  },
  {
    id: "terrace",
    label: "Terrace Lounge",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=90",
    hotspots: [
      { x: 40, y: 55, productId: "out-01" },
      { x: 70, y: 60, productId: "out-02" },
      { x: 25, y: 70, productId: "out-05" }
    ]
  },
  {
    id: "patio",
    label: "Garden Patio",
    image: "https://cdn.mos.cms.futurecdn.net/bjyfoV4SaxvetsJqN8KDRM-1920-80.jpg",
    hotspots: [
      { x: 45, y: 50, productId: "out-03" },
      { x: 25, y: 55, productId: "out-04" },
      { x: 70, y: 65, productId: "out-05" },
      { x: 60, y: 35, productId: "out-01" }
    ]
  }
];

export default function HotspotRoom({ onOpenDetail }) {
  const [activeSpace, setActiveSpace] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const currentSpace = spaces[activeSpace];

  const getProduct = (productId) => products.find(p => p.id === productId);

  return (
    <section id="spaces-section">
      <div className="section-headline">
        <p className="headline-sub">Interactive Showrooms</p>
        <h2 className="headline-main">Shop the Spaces</h2>
        <p className="headline-text">
          Explore curated indoor and outdoor rooms. Hover over the hotspots to discover each handcrafted piece placed in its ideal setting.
        </p>
      </div>

      {/* Space Tabs */}
      <ul className="spaces-tab-nav">
        {spaces.map((space, idx) => (
          <li key={space.id}>
            <button
              className={`space-tab-btn ${idx === activeSpace ? 'active' : ''}`}
              onClick={() => { setActiveSpace(idx); setActiveHotspot(null); }}
            >
              {space.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Canvas */}
      <div className="space-canvas-wrapper">
        <div className="space-canvas" onClick={() => setActiveHotspot(null)}>
          <img
            src={currentSpace.image}
            alt={currentSpace.label}
            className="space-backdrop-img"
          />

          {currentSpace.hotspots.map((hs, idx) => {
            const product = getProduct(hs.productId);
            if (!product) return null;
            const isActive = activeHotspot === idx;

            return (
              <div
                className="hotspot-node"
                key={idx}
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              >
                <button
                  className={`hotspot-trigger pulse-hotspot ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(isActive ? null : idx);
                  }}
                >
                  +
                </button>

                {/* Popup Card */}
                <div className={`hotspot-card glass-panel ${isActive ? 'visible' : ''}`}>
                  <img src={product.images.front} alt={product.name} className="hotspot-card-img" />
                  <p className="hotspot-card-name">{product.name}</p>
                  <div className="hotspot-card-row">
                    <span className="hotspot-card-price">{product.price}</span>
                    <button
                      className="hotspot-card-view-btn"
                      onClick={(e) => { e.stopPropagation(); onOpenDetail(product); }}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
