import React, { useState, useRef, useCallback } from 'react';
import { products } from '../data/products';

export default function MoodBoard({ pinnedIds, onTogglePin }) {
  const [canvasItems, setCanvasItems] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const pinnedProducts = products.filter(p => pinnedIds.includes(p.id));
  const canvasItemIds = canvasItems.map(ci => ci.productId);

  const addToCanvas = (product) => {
    if (canvasItemIds.includes(product.id)) return;
    setCanvasItems(prev => [
      ...prev,
      {
        productId: product.id,
        x: 40 + Math.random() * 300,
        y: 40 + Math.random() * 300
      }
    ]);
  };

  const removeFromCanvas = (productId) => {
    setCanvasItems(prev => prev.filter(ci => ci.productId !== productId));
  };

  const handleMouseDown = useCallback((e, productId) => {
    e.preventDefault();
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const item = canvasItems.find(ci => ci.productId === productId);
    if (!item) return;
    dragOffset.current = {
      x: e.clientX - canvasRect.left - item.x,
      y: e.clientY - canvasRect.top - item.y
    };
    setDraggingId(productId);
  }, [canvasItems]);

  const handleMouseMove = useCallback((e) => {
    if (!draggingId || !canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - dragOffset.current.x;
    const newY = e.clientY - canvasRect.top - dragOffset.current.y;
    setCanvasItems(prev =>
      prev.map(ci =>
        ci.productId === draggingId
          ? { ...ci, x: Math.max(0, Math.min(newX, canvasRect.width - 160)), y: Math.max(0, Math.min(newY, canvasRect.height - 160)) }
          : ci
      )
    );
  }, [draggingId]);

  const handleMouseUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  const clearCanvas = () => setCanvasItems([]);

  return (
    <section className="moodboard-section" id="moodboard-section">
      <div className="section-headline" style={{ textAlign: 'left', margin: '0 0 40px 0', maxWidth: 'none' }}>
        <p className="headline-sub">Design Workspace</p>
        <h2 className="headline-main" style={{ textAlign: 'left' }}>Your Mood Board</h2>
        <p className="headline-text" style={{ textAlign: 'left' }}>
          Pin furniture pieces you love and arrange them visually on the canvas to see how they look together.
        </p>
      </div>

      <div className="moodboard-container">
        {/* Sidebar - Pinned Items List */}
        <div className="moodboard-sidebar">
          <h3 className="moodboard-sidebar-title">Pinned Pieces</h3>
          <p className="moodboard-sidebar-desc">
            {pinnedProducts.length === 0
              ? 'Browse the collection and pin items you love.'
              : `${pinnedProducts.length} item${pinnedProducts.length !== 1 ? 's' : ''} pinned. Click + to place on canvas.`
            }
          </p>
          <div className="moodboard-items-list">
            {pinnedProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-brass)" strokeWidth="1.5" style={{ marginBottom: '12px' }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <p style={{ fontSize: '13px' }}>No items pinned yet.</p>
                <p style={{ fontSize: '11px', marginTop: '4px' }}>Go to The Collection to start pinning!</p>
              </div>
            )}
            {pinnedProducts.map(product => (
              <div className="moodboard-sidebar-item" key={product.id}>
                <img src={product.images.front} alt={product.name} className="moodboard-sidebar-item-img" />
                <div className="moodboard-sidebar-item-info">
                  <span className="moodboard-sidebar-item-name">{product.name}</span>
                  <span className="moodboard-sidebar-item-cat">{product.category}</span>
                </div>
                <button
                  className="moodboard-sidebar-item-add"
                  onClick={() => addToCanvas(product)}
                  title="Place on canvas"
                >
                  {canvasItemIds.includes(product.id) ? '✓' : '+'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div
          className="moodboard-canvas-area"
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {canvasItems.length === 0 && (
            <div className="moodboard-canvas-empty">
              <div className="moodboard-canvas-empty-icon">⊞</div>
              <p className="moodboard-canvas-empty-title">Your Canvas is Empty</p>
              <p className="moodboard-canvas-empty-text">
                Pin items from the collection, then click + in the sidebar to place them here. Drag to rearrange!
              </p>
            </div>
          )}

          {canvasItems.map(ci => {
            const product = products.find(p => p.id === ci.productId);
            if (!product) return null;
            return (
              <div
                key={ci.productId}
                className={`canvas-placed-item ${draggingId === ci.productId ? 'dragging' : ''}`}
                style={{ left: ci.x, top: ci.y }}
                onMouseDown={(e) => handleMouseDown(e, ci.productId)}
              >
                <img src={product.images.front} alt={product.name} className="canvas-placed-img" />
                <div className="canvas-placed-info">
                  <span className="canvas-placed-name">{product.name}</span>
                  <button
                    className="canvas-item-delete-btn"
                    onClick={(e) => { e.stopPropagation(); removeFromCanvas(ci.productId); }}
                    title="Remove from canvas"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}

          {/* Controls */}
          {canvasItems.length > 0 && (
            <div className="moodboard-canvas-controls">
              <button className="canvas-ctrl-btn" onClick={clearCanvas}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Clear All
              </button>
              <button className="canvas-ctrl-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
                {canvasItems.length} Item{canvasItems.length !== 1 ? 's' : ''}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
