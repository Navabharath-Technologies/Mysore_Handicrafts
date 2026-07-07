import React, { useEffect, useState } from 'react';
import './LoadingOverlay.css';

const CHIPS = Array.from({ length: 30 }).map(() => ({
  angle: Math.random() * 360,
  distance: 100 + Math.random() * 160,
  size: 4 + Math.random() * 10,
  rot: 360 + Math.random() * 720,
  color: ['#4A2F1D', '#6D4C33', '#8D6440', '#3E2723'][Math.floor(Math.random() * 4)]
}));

const LoadingOverlay = ({ onFinish }) => {
  const [stage, setStage] = useState('wood'); // 'wood' -> 'spinning' -> 'fading'

  useEffect(() => {
    // Prevent scrolling while loading screen is active
    document.body.style.overflow = 'hidden';

    // 1. Wait a moment to show the raw wood tree log
    const t1 = setTimeout(() => {
      setStage('spinning'); // Triggers the intense multiple-spin CSS rotation
      
      // 2. Wait for the 2.5s spin to finish, and let the trunk animation play before fading out
      const t2 = setTimeout(() => {
        setStage('fading');
        
        // 3. Call onFinish to unmount
        const t3 = setTimeout(() => {
          if (onFinish) onFinish();
        }, 800);

        return () => clearTimeout(t3);
      }, 4500); // 2500ms spin + 2000ms pause for trunk animation

      return () => clearTimeout(t2);
    }, 1200); // Initial pause to let it fall

    return () => {
      clearTimeout(t1);
      document.body.style.overflow = ''; // Restore scrolling
    };
  }, [onFinish]);

  return (
    <div className={`loading-overlay ${stage === 'fading' ? 'lo-fade-out' : ''}`}>
      <div className="lo-inner-content">
        
        <div className="flip-container">
          {/* Wood Chip Explosion */}
          <div className={`chip-explosion ${stage === 'spinning' || stage === 'fading' ? 'explode' : ''}`}>
            {CHIPS.map((chip, i) => (
              <div 
                key={i} 
                className="wood-chip"
                style={{
                  '--angle': `${chip.angle}deg`,
                  '--dist': `${chip.distance}px`,
                  '--rot': `${chip.rot}deg`,
                  width: `${chip.size}px`,
                  height: `${chip.size * 1.5}px`,
                  backgroundColor: chip.color
                }}
              />
            ))}
          </div>

          <div className={`flipper ${stage === 'spinning' || stage === 'fading' ? 'is-spinning' : ''}`}>
            
            {/* Front: Raw Tree Log (Code SVG) */}
            <div className="wood-block-front">
              <svg viewBox="0 0 100 150" width="100%" height="100%" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="barkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4A2F1D" />
                    <stop offset="50%" stopColor="#6D4C33" />
                    <stop offset="100%" stopColor="#3E2723" />
                  </linearGradient>
                  <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A88258" />
                    <stop offset="100%" stopColor="#8D6440" />
                  </linearGradient>
                </defs>
                <path d="M10,20 L10,140 Q50,155 90,140 L90,20 Z" fill="url(#barkGrad)"/>
                <path d="M25,35 Q30,85 20,135" stroke="#3A2312" fill="none" strokeWidth="2" strokeDasharray="10, 2" />
                <path d="M45,40 Q55,90 40,140" stroke="#2B1A0E" fill="none" strokeWidth="3" opacity="0.6"/>
                <path d="M65,38 Q60,85 70,135" stroke="#3A2312" fill="none" strokeWidth="1.5" />
                <path d="M80,30 Q75,80 85,130" stroke="#2B1A0E" fill="none" strokeWidth="2.5" opacity="0.5"/>
                <ellipse cx="50" cy="20" rx="40" ry="12" fill="url(#topGrad)"/>
                <ellipse cx="50" cy="20" rx="30" ry="8" stroke="#5E3F26" fill="none" strokeWidth="1.5"/>
                <ellipse cx="50" cy="20" rx="18" ry="4" stroke="#4A2F1D" fill="none" strokeWidth="1"/>
                <ellipse cx="50" cy="20" rx="8" ry="2" fill="#4A2F1D"/>
              </svg>
            </div>

            {/* Back face of the log (Visible during spins) */}
            <div className="wood-block-back">
              <svg viewBox="0 0 100 150" width="100%" height="100%" preserveAspectRatio="none">
                <path d="M10,20 L10,140 Q50,155 90,140 L90,20 Z" fill="url(#barkGrad)"/>
                <path d="M25,35 Q30,85 20,135" stroke="#3A2312" fill="none" strokeWidth="2" strokeDasharray="10, 2" />
                <path d="M45,40 Q55,90 40,140" stroke="#2B1A0E" fill="none" strokeWidth="3" opacity="0.6"/>
                <path d="M65,38 Q60,85 70,135" stroke="#3A2312" fill="none" strokeWidth="1.5" />
                <path d="M80,30 Q75,80 85,130" stroke="#2B1A0E" fill="none" strokeWidth="2.5" opacity="0.5"/>
                <ellipse cx="50" cy="20" rx="40" ry="12" fill="url(#topGrad)"/>
              </svg>
            </div>
            
            {/* Back: Rosewood Elephant (Code SVG) */}
            <div className="carved-product-back">
              <svg viewBox="-30 -30 260 260" width="100%" height="100%" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="rosewoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5D4037" />
                    <stop offset="100%" stopColor="#3E2723" />
                  </linearGradient>
                  <linearGradient id="rosewoodDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4E342E" />
                    <stop offset="100%" stopColor="#212121" />
                  </linearGradient>
                </defs>

                {/* Back Legs (Darker for depth) */}
                <rect x="60" y="130" width="20" height="40" rx="8" fill="url(#rosewoodDark)" />
                <rect x="115" y="130" width="20" height="40" rx="8" fill="url(#rosewoodDark)" />

                {/* Tail */}
                <path d="M45,100 Q30,120 30,140" fill="none" stroke="url(#rosewoodDark)" strokeWidth="6" strokeLinecap="round" />

                {/* Body */}
                <ellipse cx="90" cy="110" rx="50" ry="40" fill="url(#rosewoodGrad)" />

                {/* Head */}
                <circle cx="150" cy="90" r="30" fill="url(#rosewoodGrad)" />

                {/* Front Legs */}
                <rect x="40" y="130" width="22" height="45" rx="8" fill="url(#rosewoodGrad)" />
                <rect x="95" y="130" width="22" height="45" rx="8" fill="url(#rosewoodGrad)" />

                {/* Ear */}
                <ellipse cx="130" cy="95" rx="20" ry="30" fill="url(#rosewoodDark)" />

                {/* Trunk */}
                <path id="elephant-trunk" d="M175,90 Q195,120 180,160 Q170,185 145,175" fill="none" stroke="url(#rosewoodGrad)" strokeWidth="18" strokeLinecap="round" />

                {/* Tusk */}
                <path d="M165,115 Q180,110 195,95" fill="none" stroke="#F5F5DC" strokeWidth="4" strokeLinecap="round" />

                {/* Eye */}
                <circle cx="155" cy="80" r="3" fill="#1A1A1A" />
                <circle cx="156" cy="79" r="1" fill="#FFFFFF" /> {/* Eye glint */}
                
                {/* Decorative Headpiece (Carving Detail) */}
                <path d="M140,65 Q150,60 160,65 Q150,75 140,65 Z" fill="#D4AF37" opacity="0.8"/>
              </svg>
            </div>

          </div>
        </div>

        <div className="lo-brand-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 'fit-content', gap: '0px' }}>
          <span className="lo-brand-name" style={{ fontSize: '32px', letterSpacing: '0.05em', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', display: 'block', textAlign: 'center', marginRight: 0, lineHeight: '1' }}>
            MYSORE
          </span>
          <span className="lo-handicrafts" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--accent-brass)', fontFamily: 'var(--font-sans)', fontWeight: '700', textTransform: 'uppercase', marginTop: '4px', lineHeight: '1' }}>
            <span>H</span><span>A</span><span>N</span><span>D</span><span>I</span><span>C</span><span>R</span><span>A</span><span>F</span><span>T</span><span>S</span>
          </span>
        </div>
        <p className="lo-subtitle">Carving the heritage…</p>
        
      </div>
    </div>
  );
};

export default LoadingOverlay;

