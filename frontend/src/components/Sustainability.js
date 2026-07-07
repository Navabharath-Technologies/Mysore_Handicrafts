import React from 'react';
import Reveal from './Reveal';
import aboutStoryImg from '../images/elephants_hero.webp';

export default function Sustainability() {
  return (
    <section className="sustainability-section">
      <div className="contact-hero" style={{ height: '40vh', minHeight: '300px' }}>
        <img src={aboutStoryImg} alt="Sustainability" className="contact-hero-img" style={{ objectPosition: 'center 46%' }} />
        <div className="contact-hero-overlay">
          <p className="contact-hero-sub">Our Commitment</p>
          <h1 className="contact-hero-title">Sustainability & Heritage</h1>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px 40px' }}>
        <Reveal delay={100}>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px', lineHeight: '1.8' }}>
            At Mysore Handicrafts, our 80-year legacy is deeply rooted in respect for nature. We recognize that true artistry cannot exist without environmental stewardship.
          </p>
        </Reveal>

        <div className="about-categories-grid">
          <Reveal delay={200} className="about-category-card">
            <span className="about-category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <h3 className="about-category-title">Ethical Sourcing</h3>
            <p className="about-category-desc">Our premium woods, including authentic Sandalwood and rich Rosewood, are procured exclusively through highly regulated, government-approved channels to ensure forest preservation.</p>
          </Reveal>

          <Reveal delay={300} className="about-category-card">
            <span className="about-category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <h3 className="about-category-title">Embracing Alternatives</h3>
            <p className="about-category-desc">We champion the use of Shivani Teakwood as a sustainable, high-quality alternative to rare Sandalwood for large-scale carvings, preserving delicate ecosystems without compromising our traditional aesthetic.</p>
          </Reveal>

          <Reveal delay={400} className="about-category-card">
            <span className="about-category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
              </svg>
            </span>
            <h3 className="about-category-title">Zero-Waste Craftsmanship</h3>
            <p className="about-category-desc">Our world-famous Mysore Inlay technique utilizes natural colored wood offcuts, transforming every scrap into a masterpiece. We never use artificial paints, honoring the true shades of Mother Nature.</p>
          </Reveal>

          <Reveal delay={500} className="about-category-card">
            <span className="about-category-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <h3 className="about-category-title">Supporting Local Artisans</h3>
            <p className="about-category-desc">We are committed to empowering our local community of hereditary woodcarvers. By providing fair wages and a safe, supportive workshop, we help preserve this ancient Mysore craft for future generations.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

