import React from 'react';
import Reveal from './Reveal';

export default function PrivacyPolicy() {
  return (
    <section className="legal-section" style={{ padding: '80px 20px 40px', maxWidth: '900px', margin: '0 auto' }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="headline-sub">Transparency & Trust</p>
          <h1 className="headline-main">Privacy Policy</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '20px', fontSize: '18px' }}>
            At Mysore Handicrafts, protecting your privacy is a core part of our commitment to you.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="glass-panel" style={{ padding: '50px', borderRadius: '24px', border: '1px solid var(--accent-brass)' }}>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--accent-gold)', marginBottom: '15px', fontSize: '22px', fontFamily: 'var(--font-serif)' }}>Information Collection</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              We only collect information necessary to process your custom orders, respond to your WhatsApp enquiries, and provide our world-class service. This may include your name and contact details.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--accent-gold)', marginBottom: '15px', fontSize: '22px', fontFamily: 'var(--font-serif)' }}>Information Usage</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Your details are used strictly for communication regarding your handcrafted acquisitions and in-store reservations. We do not sell or share your personal data with third parties.
            </p>
          </div>

          <div>
            <h3 style={{ color: 'var(--accent-gold)', marginBottom: '15px', fontSize: '22px', fontFamily: 'var(--font-serif)' }}>Data Security</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              As a legacy business built on trust over 80 years, we apply the same meticulous care to your data as we do to our woodwork, ensuring it is stored securely and handled with confidentiality.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

