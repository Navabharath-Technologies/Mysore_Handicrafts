import React, { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';
import teakwoodHeroImg from '../images/teakwood_hero.webp';
import woodCarvingsHeroImg from '../images/wood_carvings_hero.webp';
import sandalwoodHeroImg from '../images/sandalwood_hero.webp';
import wallDecorHeroImg from '../images/wall_decor_hero.webp';

const heroSlides = [
  {
    id: 1,
    image: sandalwoodHeroImg,
    subtitle: "Sacred Fragrance & Fine Carving",
    title: "The Royal Sandalwood Collection",
    description: "Discover aromatic, hand-carved sandalwood deities and panels crafted to fill your home with divine presence and timeless character.",
    cta: "Explore Sandalwood",
    ctaTab: "catalog",
    ctaCategory: "sandalwood"
  },
  {
    id: 2,
    image: woodCarvingsHeroImg,
    subtitle: "Intricate Rosewood Artistry",
    title: "The Heritage of Rosewood",
    description: "Premium Mysore rosewood carvings, Ambari elephants, and panels depicting classic folklore, hand-rubbed with natural oils.",
    cta: "See Rosewood",
    ctaTab: "catalog",
    ctaCategory: "rosewood"
  },
  {
    id: 3,
    image: wallDecorHeroImg,
    subtitle: "Exquisite Craftsmanship & Heritage",
    title: "Heritage Wooden Wall Decor",
    description: "Handcrafted rosewood inlay panels depicting Mysore court traditions, vibrant paintings, and ornate brass wall hangings.",
    cta: "Explore Wooden Wall Decor",
    ctaTab: "catalog",
    ctaCategory: "wooden-wall-decor"
  },
  {
    id: 4,
    image: teakwoodHeroImg,
    subtitle: "Glowing Welcomes & Timeless Wood",
    title: "Exquisite Shivani Teakwood Decor",
    description: "From traditional carvings to ornate furniture. Handcrafted Shivani teakwood accents designed to bring warmth and prosperity.",
    cta: "Browse Shivani Teakwood",
    ctaTab: "catalog",
    ctaCategory: "shivani-teakwood"
  }
];

export default function Hero({ setActiveTab }) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      setCurrent(prev => (prev + 1) % heroSlides.length);
    } else if (isRightSwipe) {
      setCurrent(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
    }
  };

  return (
    <div 
      className="hero-wrapper"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => setIsAutoPlaying(false)}
    >
      {heroSlides.map((slide, idx) => (
        <div key={slide.id} className={`hero-slide ${idx === current ? 'active' : ''}`}>
          <img 
            src={slide.image} 
            alt={slide.title} 
            className={`hero-image hero-image-${slide.id}`} 
            loading={idx === 0 ? "eager" : "lazy"}
          />
          <div className="hero-image-overlay" />
          <div className="hero-content">
            <p className="hero-subtitle">{slide.subtitle}</p>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-description">{slide.description}</p>
            <MagneticButton
              className="btn-luxury hero-cta"
              onClick={() => setActiveTab(slide.ctaTab, slide.ctaCategory)}
            >
              {slide.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </MagneticButton>
          </div>
        </div>
      ))}

      {/* Progress Dot Navigation */}
      <div className="hero-nav">
        {heroSlides.map((_, idx) => (
          <div
            key={idx}
            className={`hero-nav-dot ${idx === current ? 'active' : ''}`}
            onClick={() => {
              setCurrent(idx);
              setIsAutoPlaying(false);
            }}
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

