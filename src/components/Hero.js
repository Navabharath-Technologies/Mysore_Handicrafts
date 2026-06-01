import React, { useState, useEffect } from 'react';

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=2000&q=90",
    subtitle: "New Collection 2026",
    title: "Where Comfort Meets Artisanship",
    description: "Discover handcrafted indoor masterpieces designed to fill your spaces with organic beauty and timeless character.",
    cta: "Explore Living Room",
    ctaTab: "catalog"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Outdoor Excellence",
    title: "The Art of Living Outside",
    description: "Premium Grade-A teak, lava stone, and braided performance textiles built to celebrate every season.",
    cta: "See Outdoor Collection",
    ctaTab: "catalog"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Bedroom Sanctuary",
    title: "Rest in Refined Luxury",
    description: "Every headboard, nightstand, and dresser is a quiet statement — made for the spaces you hold closest.",
    cta: "View Bedroom Pieces",
    ctaTab: "catalog"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=2000&q=90",
    subtitle: "The Dining Experience",
    title: "Tables Built for Gathering",
    description: "From sculptural solid-oak tables to hand-woven linen chairs. Design that brings people together.",
    cta: "Browse Dining",
    ctaTab: "catalog"
  }
];

export default function Hero({ setActiveTab }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-wrapper">
      {heroSlides.map((slide, idx) => (
        <div key={slide.id} className={`hero-slide ${idx === current ? 'active' : ''}`}>
          <img src={slide.image} alt={slide.title} className="hero-image" />
          <div className="hero-image-overlay" />
          <div className="hero-content">
            <p className="hero-subtitle">{slide.subtitle}</p>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-description">{slide.description}</p>
            <button
              className="btn-luxury hero-cta"
              onClick={() => setActiveTab(slide.ctaTab)}
            >
              {slide.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {/* Progress Dot Navigation */}
      <div className="hero-nav">
        {heroSlides.map((_, idx) => (
          <div
            key={idx}
            className={`hero-nav-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          >
            <div className="hero-nav-dot-fill" />
          </div>
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">
          Scroll
        </span>
      </div>
    </div>
  );
}
