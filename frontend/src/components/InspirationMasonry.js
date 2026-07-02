import React, { useRef, useEffect } from 'react';
import Reveal from './Reveal';
import WatermarkImage from './WatermarkImage';

const heightVariants = ['65vh', '70vh', '60vh', '65vh', '75vh', '60vh'];

export default function InspirationMasonry({ products, onOpenDetail }) {
  const validProducts = products.filter(p => p.images?.room || p.images?.front || p.images?.detail);
  
  // Shuffle to ensure a diverse mix instead of just the most recently added items
  const shuffledProducts = React.useMemo(() => {
    return [...validProducts].sort(() => 0.5 - Math.random());
  }, [validProducts]);

  const masonryItems = shuffledProducts.slice(0, 15).map((product, idx) => {
    return {
      src: product.images?.room || product.images?.front || product.images?.detail,
      tag: product.category ? product.category.replace('-', ' ').toUpperCase() : 'DECOR',
      title: product.name,
      desc: product.description ? product.description.substring(0, 100) + '...' : 'Traditional Mysore craftsmanship.',
      product: product
    };
  });

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let intervalId;
    let isHovering = false;

    const advanceScroll = () => {
      if (isHovering) return;
      // Scroll by one item width (approx 500px width + 80px gap)
      // We use 580 to reliably trigger the snap to the next item
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 580, behavior: 'smooth' });
      }
    };

    const startAutoPlay = () => {
      intervalId = setInterval(advanceScroll, 4000);
    };

    const handleEnter = () => { isHovering = true; };
    const handleLeave = () => { isHovering = false; };

    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);

    startAutoPlay();

    return () => {
      clearInterval(intervalId);
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const getImgClass = (title) => {
    let classes = '';
    
    // Fix top cropping
    if (['Lord Rama with Bow', 'Goddess Saraswathi with Veena', 'Serene Meditating Buddha', 'Lord Shiva in Lotus Pose', 'Krishna Playing Flute with Cow'].includes(title)) {
      classes += 'img-align-top ';
    }
    
    // Fix Venkateshwara
    if (title === 'Lord Venkateshwara (Balaji) Bust') {
      classes += 'img-align-top-right ';
    }
    
    // Remove white background walls so they float
    if (['Lord Shiva in Lotus Pose', 'Lord Rama with Bow'].includes(title)) {
      classes += 'blend-bg ';
    }
    
    // Zoom in to crop white borders on the sides
    if (['Lord Shiva in Lotus Pose'].includes(title)) {
      classes += 'img-zoom ';
    }
    
    return classes.trim();
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
  };

  return (
    <section className="museum-section" id="inspiration-section">
      <div className="section-headline" style={{ padding: '0 5%', margin: '40px auto 48px auto' }}>
        <p className="headline-sub">Visual Inspiration</p>
        <h2 className="headline-main">The Mysore Museum</h2>
        <p className="headline-text">
          Immerse yourself in a curated exhibition of traditional art, detailed woodcarvings, and metalwork. 
          Scroll horizontally to walk the gallery.
        </p>
      </div>

      <div className="museum-container" ref={containerRef}>
        {masonryItems.map((item, idx) => (
          <Reveal
            className="museum-item"
            key={idx}
            delay={(idx % 3) * 100}
            onClick={() => onOpenDetail(item.product)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              willChange: 'transform', 
              transformStyle: 'preserve-3d' 
            }}
          >
            <div className="museum-img-wrap" style={{ height: heightVariants[idx % heightVariants.length] }}>
              <WatermarkImage
                src={item.src}
                alt={item.title}
                className={`museum-img ${getImgClass(item.title)}`}
                loading="lazy"
              />
            </div>
            <div className="museum-placard">
              <span className="museum-tag">{item.tag}</span>
              <p className="museum-title">{item.title}</p>
              <p className="museum-desc">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
