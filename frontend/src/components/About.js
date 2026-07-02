import React, { useEffect, useState, useRef } from 'react';
import Reveal from './Reveal';
import aboutStoryImg from '../images/about-story-sandalwood.jpg';

const AnimatedCounter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const numericStr = value.replace(/[^0-9.]/g, '');
  const isFloat = numericStr.includes('.');
  const target = parseFloat(numericStr);
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(target * ease);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, target]);

  return (
    <div className="about-stat-item" ref={ref}>
      <span className="about-stat-value">
        {isFloat ? count.toFixed(1) : Math.floor(count)}{suffix}
      </span>
      <span className="about-stat-label">{label}</span>
    </div>
  );
};

const ScrollRevealCard = ({ cat }) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, {
      rootMargin: "-45% 0px -45% 0px", // Only trigger when passing through the exact center 10% of the screen
      threshold: 0
    });
    
    if (cardRef.current) observer.observe(cardRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className={`hover-reveal-card ${inView ? 'scroll-active' : ''}`}>
      <div className="hover-reveal-base">
        <span className="hover-reveal-icon">{cat.icon}</span>
        <h3 className="hover-reveal-title">{cat.title}</h3>
      </div>
      <div className="hover-reveal-overlay">
        <div className="hover-reveal-content">
          <p className="hover-reveal-desc">{cat.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const marqueeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const specialtiesList = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-13.8 2.2V22" />
        </svg>
      ),
      title: 'Sandalwood Handicrafts',
      desc: 'Known as Santalum (Sanskrit: CHANDANA). A premium, high-priced royal wood cherished for its pleasant fragrance and medicinal oil values. Sourced under strict Government regulations tracing back to the era of Sultans (1800 A.D.), our artisans craft this sacred "ROYAL" wood into exquisite, highly sought-after aromatic figurines and divine artworks.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18.5 3.5a2.12 2.12 0 0 1 3 3L7 21H3v-4L18.5 3.5Z" />
          <path d="M15 7 17 9" />
        </svg>
      ),
      title: 'Rosewood Carvings & Inlay',
      desc: 'Characterized by its dense grain ranging from rich red to dark brown. Our master artisans carve intricate majestic furniture, and specialize in the world-famous Mysore Inlay work—an intricate puzzle-like assembly of natural colored woods, a majestic art form celebrated since the era of the Maharajas and featured in the Mysore Palace doors.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c4.5-5 5-9 5-11.5S15 6 12 6s-5 2-5 4.5 .5 6.5 5 11.5Z" />
          <path d="M12 22c-2.5-3.5-6-5.5-8-7.5s-2-4 0-6 5.5.5 8 5" />
          <path d="M12 22c2.5-3.5 6-5.5 8-7.5s2-4 0-6-5.5.5-8 5" />
        </svg>
      ),
      title: 'Shivani Teakwood Artifacts',
      desc: 'An exceptional, high-quality substitute for rare Sandalwood. Shivani Teakwood offers a remarkably similar aesthetic and rich color profile, making it the perfect sustainable alternative for large-scale carvings. Its robust nature and beautiful finish make it ideal for crafting timeless, premium wooden idols and decorative artifacts.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      ),
      title: 'Wall Hangings (Inlay Art)',
      desc: 'A 100% unique art form exclusive to Mysore. We handcraft stunning portraits, landscapes, wildlife sceneries, and customized artwork using only the natural colors of different woods—absolutely no artificial paints. Each wall hanging is a one-of-a-kind masterpiece dictated entirely by the natural shades of Mother Nature.'
    }
  ];

  useEffect(() => {
    let animationId;
    const scrollMarquee = () => {
      if (marqueeRef.current && !isPaused) {
        marqueeRef.current.scrollLeft += 1;
        // Reset scroll position when reaching the end of the first duplicate set
        if (marqueeRef.current.scrollLeft >= marqueeRef.current.scrollWidth / 2) {
          marqueeRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scrollMarquee);
    };

    animationId = requestAnimationFrame(scrollMarquee);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="about-section">
      {/* Minimalist Typography Header */}
      <style>
        {`
          @keyframes dropIn {
            0% { transform: translateY(-80px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-drop-1 {
            display: inline-block;
            opacity: 0;
            animation: dropIn 1s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
            animation-delay: 0.1s;
          }
          .animate-drop-2 {
            display: inline-block;
            opacity: 0;
            animation: dropIn 1s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
            animation-delay: 0.4s;
          }
        `}
      </style>
      <div style={{ textAlign: 'center', padding: '30px 20px 0px', maxWidth: '1000px', margin: '0 auto' }}>
        <Reveal delay={100}>
          <p style={{ fontSize: '14px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '24px', fontWeight: '600' }}>
            Established in Mysore
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(60px, 12vw, 140px)', color: 'var(--text-primary)', marginBottom: '30px', lineHeight: '1.05', letterSpacing: '-0.02em' }}>
            <span className="animate-drop-1">Mysore</span><br />
            <span className="animate-drop-2" style={{ fontStyle: 'italic', color: 'var(--accent-brass)' }}>Handicrafts</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
            The premier destination for authentic Sandalwood carvings, Rosewood inlay furniture, and timeless wooden masterpieces.
          </p>
        </Reveal>
      </div>
      {/* Story Section */}
      <div className="about-story">
        <div className="section-headline">
          <p className="headline-sub">Our Story</p>
          <h2 className="headline-main">A Legacy of Craftsmanship</h2>
        </div>
        <div className="about-story-content">
          <Reveal delay={100} className="about-story-text">
            <p>
              Mysore Handicrafts and our physical store, Preetham Handicrafts, operate as a unified enterprise under single family ownership, carrying forward a timeless legacy. With a rich legacy spanning over <strong>80 years in the wooden handicraft industry</strong>, <strong>Mysore Handicrafts</strong> stands as a premier destination for traditional Indian artistry. Originally founded by <strong>Late Sri. Venkat Rao</strong> under the name <em>Sharadha Fine Arts</em>, our esteemed workshop is now proudly managed by the <strong>third generation</strong> of our artisan family. We have evolved through the decades—transitioning from historical antique artworks to our modern mastery of sustainable, premium woods—while maintaining an unwavering commitment to quality and customer satisfaction.
            </p>
            <p>
              Today, we operate globally as leading <strong>manufacturers, retailers, wholesalers, and exporters of wooden handcrafted articles</strong>. Our modern collection specializes in the finest authentic materials, dealing exclusively in exquisite <strong>Sandalwood carvings</strong>, <strong>premium Rosewood furniture</strong>, and timeless <strong>Shivani Teakwood artifacts</strong>. Whether catering to domestic households or the international wholesale market, we deliver the pinnacle of Mysore's carving heritage.
            </p>
            <p>
              Beyond our showroom collections, we are celebrated for monumental architectural masterpieces. We proudly accept custom orders and customization, catering to exact customer requirements. This includes the masterful crafting of massive <strong>intricate wooden doors for temples</strong> and magnificent <strong>ceremonial wooden chariots</strong>, which are proudly installed in prestigious temples across India and abroad.
            </p>
            <p>
              Whether you are an end user seeking a fragrant sandalwood idol for your home, or an international buyer sourcing bulk rosewood decor, Mysore Handicrafts guarantees a legacy of authentic craftsmanship and highly satisfying service.
            </p>
          </Reveal>
          <Reveal delay={300} className="about-story-image">
            <img
              src={aboutStoryImg}
              alt="Sandalwood Carving Artistry"
              className="about-story-img"
            />
          </Reveal>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="about-stats-strip">
        {[
          { value: '4.9★', label: 'Customer Rating' },
          { value: '29+', label: 'Verified Reviews' },
          { value: '6', label: 'Product Categories' },
          { value: '100+', label: 'Artisan Partners' }
        ].map((stat, i) => (
          <AnimatedCounter key={i} value={stat.value} label={stat.label} />
        ))}
      </div>

      {/* What We Offer */}
      <div className="about-categories">
        <div className="section-headline">
          <p className="headline-sub">What We Offer</p>
          <h2 className="headline-main">Our Specialties</h2>
        </div>
        <div className="hover-reveal-grid">
          {specialtiesList.map((cat, i) => (
            <ScrollRevealCard key={i} cat={cat} />
          ))}
        </div>
      </div>

      {/* Reviews Marquee */}
      <style>
        {`
          .marquee-container {
            overflow-x: auto;
            white-space: nowrap;
            width: 100%;
            position: relative;
            padding: 20px 0 60px;
            /* Premium faded edge effect */
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* IE and Edge */
            scroll-behavior: auto;
          }
          .marquee-container::-webkit-scrollbar {
            display: none;
          }
          .marquee-track {
            display: flex;
            gap: 30px;
            width: max-content;
          }
          .marquee-card {
            flex: 0 0 auto;
            width: 500px; /* Precisely forces approx 2 reviews on standard desktop layout */
            white-space: normal;
            padding: 35px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 260px;
          }
          @media (max-width: 1024px) {
             .marquee-card { width: 400px; }
          }
          @media (max-width: 768px) {
            .marquee-card { width: 320px; padding: 25px; }
          }
        `}
      </style>
      <div className="about-reviews">
        <div className="section-headline">
          <p className="headline-sub">What Customers Say</p>
          <h2 className="headline-main">Trusted by Art Lovers</h2>
        </div>

        <div
          className="marquee-container"
          ref={marqueeRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="marquee-track">
            {/* Combined First & Duplicate Set mapped dynamically */}
            {[
              ...[
                { name: 'V N', date: '3 months ago', rating: '★★★★★', review: "Excellent work and Customer Service. The product was home delivered and it has been made upto the expectation and the requiment given. Highly recommended for anyone wanting to have customised high quality handicraft work." },
                { name: 'Simon Cuerden', date: '4 months ago', rating: '★★★★★', review: "Preetham Handicrafts is hidden gem in the heart of Mysore. Preetham, the owner, is very friendly and honest. He has a nice collection of handicrafts. If you're looking for a nice souvenir of your trip, you'll definitely find it here." },
                { name: 'Shwetha Anand', date: '5 months ago', rating: '★★★★★', review: "Purchased a medium sized mandir for my home and the craftsmanship was absolutely stunning. The support I received from Preetham for shipping and handling, including safe packaging was exceptional." },
                { name: 'Pratiksha Churya A', date: '7 months ago', rating: '★★★★★', review: "We've been loyal customers of Preetham Handicrafts in Mysore for many years, and they never fail to impress. Their beautifully detailed wood and inlay work reflects true Mysore artistry. A must-visit for anyone looking for authentic, high-quality handicrafts!" },
                { name: 'Suman kamath', date: '7 months ago', rating: '★★★★★', review: "We've been visiting Preetham Handicrafts in Mysore for more than a decade — their craftsmanship is absolutely beautiful and the prices are very reasonable. A truly trustworthy and talented family-run store." },
                { name: 'Sudhir Biswal', date: '6 months ago', rating: '★★★★★', review: "Preetham Sir, Thank you for this amazing temple. It was an amazing experience to work with you. I strongly recommend him." },
                { name: 'Sony Krishna Swamy', date: '10 years ago', rating: '★★★★★', review: "The best Mysore Rosewood and other crafts here. Mr Preetham explains all processes involving the craft in detail. They have been doing this for generations, and keep the best craftsmen of Mysore." },
                { name: 'Anirudh Ravishankar', date: 'a year ago', rating: '★★★★★', review: "Good collection at affordable prices. The man handling the shop is very sweet and helpful. Packaging and quality are excellent." }
              ],
              ...[
                { name: 'V N', date: '3 months ago', rating: '★★★★★', review: "Excellent work and Customer Service. The product was home delivered and it has been made upto the expectation and the requiment given. Highly recommended for anyone wanting to have customised high quality handicraft work." },
                { name: 'Simon Cuerden', date: '4 months ago', rating: '★★★★★', review: "Preetham Handicrafts is hidden gem in the heart of Mysore. Preetham, the owner, is very friendly and honest. He has a nice collection of handicrafts. If you're looking for a nice souvenir of your trip, you'll definitely find it here." },
                { name: 'Shwetha Anand', date: '5 months ago', rating: '★★★★★', review: "Purchased a medium sized mandir for my home and the craftsmanship was absolutely stunning. The support I received from Preetham for shipping and handling, including safe packaging was exceptional." },
                { name: 'Pratiksha Churya A', date: '7 months ago', rating: '★★★★★', review: "We've been loyal customers of Preetham Handicrafts in Mysore for many years, and they never fail to impress. Their beautifully detailed wood and inlay work reflects true Mysore artistry. A must-visit for anyone looking for authentic, high-quality handicrafts!" },
                { name: 'Suman kamath', date: '7 months ago', rating: '★★★★★', review: "We've been visiting Preetham Handicrafts in Mysore for more than a decade — their craftsmanship is absolutely beautiful and the prices are very reasonable. A truly trustworthy and talented family-run store." },
                { name: 'Sudhir Biswal', date: '6 months ago', rating: '★★★★★', review: "Preetham Sir, Thank you for this amazing temple. It was an amazing experience to work with you. I strongly recommend him." },
                { name: 'Sony Krishna Swamy', date: '10 years ago', rating: '★★★★★', review: "The best Mysore Rosewood and other crafts here. Mr Preetham explains all processes involving the craft in detail. They have been doing this for generations, and keep the best craftsmen of Mysore." },
                { name: 'Anirudh Ravishankar', date: 'a year ago', rating: '★★★★★', review: "Good collection at affordable prices. The man handling the shop is very sweet and helpful. Packaging and quality are excellent." }
              ]
            ].map((review, i) => (
              <div key={i} className="about-review-card glass-panel marquee-card">
                <div className="about-review-rating" style={{ color: '#fbbc04', fontSize: '20px', marginBottom: '16px', letterSpacing: '2px' }}>{review.rating}</div>
                <p className="about-review-text" style={{ fontSize: '16px', lineHeight: '1.6', flexGrow: 1, color: 'var(--text-secondary)' }}>"{review.review}"</p>
                <div className="about-review-author" style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-brass)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                      {review.name.charAt(0)}
                    </div>
                    <span className="about-review-name" style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{review.name}</span>
                  </div>
                  <span className="about-review-date" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
