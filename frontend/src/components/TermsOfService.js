import React from 'react';
import Reveal from './Reveal';

export default function TermsOfService() {
  return (
    <section className="legal-section" style={{ padding: '80px 20px 40px', maxWidth: '900px', margin: '0 auto' }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="headline-sub">Our Agreement</p>
          <h1 className="headline-main">Terms of Service</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '20px', fontSize: '18px' }}>
            Welcome to Mysore Handicrafts. These terms govern your engagement with our digital gallery and physical store.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="glass-panel" style={{ padding: '50px', borderRadius: '24px', border: '1px solid var(--accent-brass)' }}>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--accent-gold)', marginBottom: '15px', fontSize: '22px', fontFamily: 'var(--font-serif)' }}>Authenticity Guarantee</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Every piece crafted by our third-generation artisans is guaranteed authentic. Our Sandalwood is government-certified and our Rosewood is strictly sourced according to traditional standards.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--accent-gold)', marginBottom: '15px', fontSize: '22px', fontFamily: 'var(--font-serif)' }}>Custom Orders</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Customizations, including temple doors and large chariots, are subject to detailed consultation. A deposit is required upon commissioning, reflecting the intense labor and rare materials involved.
            </p>
          </div>

          <div>
            <h3 style={{ color: 'var(--accent-gold)', marginBottom: '15px', fontSize: '22px', fontFamily: 'var(--font-serif)' }}>Inquiries & Reservations</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              As a digital showcase gallery, all products displayed online are available for viewing and purchase directly at our physical store in Mysore. We encourage you to contact us via WhatsApp to reserve pieces or inquire about availability before visiting.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

