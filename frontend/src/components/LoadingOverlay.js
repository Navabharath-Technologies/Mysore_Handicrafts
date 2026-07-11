import React, { useEffect, useState, useRef } from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = ({ onFinish }) => {
  const [stage, setStage] = useState('playing'); // 'playing' -> 'fading'
  const fallbackTimeoutRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling while loading screen is active
    document.body.style.overflow = 'hidden';

    // Fallback: If video takes longer than 20 seconds, force finish
    fallbackTimeoutRef.current = setTimeout(() => {
      handleFinish();
    }, 20000);

    return () => {
      if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
      document.body.style.overflow = ''; // Restore scrolling
    };
  }, []);

  const handleFinish = () => {
    if (stage === 'fading') return;
    setStage('fading');
    if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
    
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 800);
  };

  return (
    <div className={`loading-overlay ${stage === 'fading' ? 'lo-fade-out' : ''}`}>
      <div className="lo-inner-content" style={{ width: '100%', height: '100%', padding: 0 }}>
        
        <div className="loading-video-container" style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <video 
            src={`${process.env.PUBLIC_URL}/videos/loading-screen.mp4`} 
            autoPlay 
            muted 
            playsInline 
            onEnded={handleFinish}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
      </div>
    </div>
  );
};

export default LoadingOverlay;

