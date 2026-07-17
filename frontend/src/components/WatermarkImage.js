import React from 'react';
import './WatermarkImage.css';

/**
 * WatermarkImage – renders an <img> with a centred @mysorehandicrafts watermark.
 * Props mirror a standard <img>: src, alt, className, style, onClick, etc.
 */
const WatermarkImage = ({ src, alt, className, style, onClick, wrapClassName, showBlurredBackground = false, ...props }) => {
  let finalSrc = src;
  let objectPosition = undefined;
  
  if (typeof src === 'string' && src.includes('?pan=')) {
    const [base, query] = src.split('?pan=');
    finalSrc = base; 
    const [x, y] = query.split(',');
    if (!isNaN(x) && !isNaN(y) && !showBlurredBackground) {
      objectPosition = `${x}% ${y}%`;
    }
  }

  const imgStyle = objectPosition ? { objectPosition } : {};

  return (
    <div className={`wm-wrap ${wrapClassName || ''}`} style={style} onClick={onClick}>
      {showBlurredBackground && (
        <img src={finalSrc} alt="" className="wm-blurred-bg" aria-hidden="true" decoding="async" />
      )}
      <img src={finalSrc} alt={alt} className={`wm-img ${className || ''} ${showBlurredBackground ? 'with-blur' : 'cover-img'}`} style={imgStyle} decoding="async" {...props} />
      <span className="wm-text" aria-hidden="true">@mysorehandicrafts</span>
    </div>
  );
};

export default WatermarkImage;

