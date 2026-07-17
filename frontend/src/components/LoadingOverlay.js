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

    // Trick 1: Instantly finish loading if user switches tabs
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleFinish();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
      document.body.style.overflow = ''; // Restore scrolling
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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

  const handleTimeUpdate = (e) => {
    const video = e.target;
    // Cut off the last 1.5 seconds of the original video duration to skip the pause
    if (video.duration && video.currentTime >= video.duration - 1.5) {
      handleFinish();
    }
  };

  return (
    <div className={`loading-overlay ${stage === 'fading' ? 'lo-fade-out' : ''}`}>
      <div className="loading-screen-container">
        <video
          className="loading-video"
          src={`${process.env.PUBLIC_URL}/videos/loading-screen.mp4#t=4`}
          autoPlay
          muted
          playsInline
          onEnded={handleFinish}
          onTimeUpdate={handleTimeUpdate}
          onPlay={(e) => { e.target.playbackRate = 1.5; }}
        />
      </div>
    </div>
  );
};

export default LoadingOverlay;

