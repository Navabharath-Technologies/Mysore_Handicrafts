import React, { useEffect, useRef, useState } from 'react';
import './LoadingOverlay.css';

/* ── Easing helpers ───────────────────────────────────── */
const easeOutBounce = (t) => {
  const n1 = 7.5625, d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  return n1 * (t -= 2.625 / d1) * t + 0.984375;
};
const easeInOutQuart = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

const lerp = (a, b, t) => a + (b - a) * t;

/* ── Chair component definitions ────────────────────────
    Ordered from back-to-front layer order.
    Each piece's final center coordinates (finalX, finalY)
    are relative to the center of the 300x300 stage.     */
const PLANKS = [
  // 1. Left back leg (shadow tone)
  { id: 'lb', w: 12, h: 180, finalX: -58, finalY: -15,
    c1: '#7D5C42', c2: '#563D2B', sx: -220, sy: -600, sr: -720 },
  // 2. Right back leg (walnut tone)
  { id: 'rb', w: 12, h: 180, finalX: 58, finalY: -15,
    c1: '#8C6C52', c2: '#674B38', sx: 200, sy: -520, sr: 540 },
  // 3. Backrest top rail (horizontal)
  { id: 'bt', w: 128, h: 18, finalX: 0, finalY: -85,
    c1: '#9A7B5F', c2: '#755841', sx: -120, sy: -680, sr: 720 },
  // 4. Backrest mid rail (horizontal)
  { id: 'bm', w: 128, h: 14, finalX: 0, finalY: -50,
    c1: '#8C6C52', c2: '#674B38', sx: 140, sy: -760, sr: -810 },
  // 5. Back stretcher (lower horizontal support)
  { id: 'bs', w: 104, h: 10, finalX: 0, finalY: 55,
    c1: '#6E4E38', c2: '#4F3524', sx: -300, sy: -400, sr: 450 },
  // 6. Front stretcher (lowest horizontal support)
  { id: 'fs', w: 126, h: 10, finalX: 0, finalY: 75,
    c1: '#83634C', c2: '#5F4431', sx: 300, sy: -450, sr: -450 },
  // 7. Left front leg
  { id: 'lf', w: 12, h: 100, finalX: -69, finalY: 60,
    c1: '#7F5F47', c2: '#5B412E', sx: -160, sy: -700, sr: -540 },
  // 8. Right front leg
  { id: 'rf', w: 12, h: 100, finalX: 69, finalY: 60,
    c1: '#8E6E54', c2: '#694D39', sx: 210, sy: -580, sr: 630 },
  // 9. Seat support base
  { id: 'seat', w: 150, h: 14, finalX: 0, finalY: 10,
    c1: '#9B785D', c2: '#73523B', sx: 60, sy: -820, sr: -900 },
  // 10. Plush Cushion (Terra Cotta Leather/Fabric)
  { id: 'cushion', w: 140, h: 22, finalX: 0, finalY: -8,
    c1: '#C47A62', c2: '#A75239', sx: 0, sy: -900, sr: 180, isCushion: true },
];

const TOTAL_DURATION = 5200; // ms

/* ── Per-plank state calculator ───────────────────────── */
function calcState(p, idx, progress) {
  const FALL = 0.35, SPIN = 0.60, ASSEMBLE = 0.85;
  const delay = idx * 0.025; // max delay 9 * 0.025 = 0.225

  /* Phase 1 — fall from sky to centre */
  if (progress < FALL) {
    const raw = Math.max(0, (progress - delay) / (FALL - delay));
    const t = easeOutBounce(Math.min(1, raw));
    return {
      x: lerp(p.sx, 0, t),
      y: lerp(p.sy, 0, t),
      rot: lerp(p.sr, 0, t),
      opacity: Math.min(1, raw * 4),
      scale: lerp(0.3, 0.7, t),
    };
  }

  /* Phase 2 — orbit / spin at centre */
  if (progress < SPIN) {
    const t = (progress - FALL) / (SPIN - FALL);
    const angle = t * Math.PI * 4 + (idx / PLANKS.length) * Math.PI * 2;
    const radius = 55 + Math.sin(t * Math.PI) * 30;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rot: t * 1080 + idx * 51.4,
      opacity: 1,
      scale: 0.5 + Math.sin(t * Math.PI * 3) * 0.12,
    };
  }

  /* Phase 3 — fly to final chair positions */
  if (progress < ASSEMBLE) {
    const t = easeInOutQuart((progress - SPIN) / (ASSEMBLE - SPIN));
    // last spin position
    const ea = Math.PI * 4 + (idx / PLANKS.length) * Math.PI * 2;
    const er = 55;
    const fromX = Math.cos(ea) * er;
    const fromY = Math.sin(ea) * er;
    const fromRot = (1080 + idx * 51.4) % 360;
    return {
      x: lerp(fromX, p.finalX, t),
      y: lerp(fromY, p.finalY, t),
      rot: lerp(fromRot > 180 ? fromRot - 360 : fromRot, 0, t),
      opacity: 1,
      scale: lerp(0.5, 1, t),
    };
  }

  /* Phase 4 — hold in chair shape */
  return { x: p.finalX, y: p.finalY, rot: 0, opacity: 1, scale: 1 };
}

/* ── Component ────────────────────────────────────────── */
const LoadingOverlay = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const plankElsRef = useRef([]);
  const frameRef = useRef(null);
  const startRef = useRef(null);
  const onFinishRef = useRef(onFinish);
  const doneRef = useRef(false);

  useEffect(() => { onFinishRef.current = onFinish; }, [onFinish]);

  useEffect(() => {
    let fadeFired = false;

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / TOTAL_DURATION, 1);

      PLANKS.forEach((p, i) => {
        const el = plankElsRef.current[i];
        if (!el) return;
        const s = calcState(p, i, progress);
        el.style.transform =
          `translate(${s.x}px, ${s.y}px) rotate(${s.rot}deg) scale(${s.scale})`;
        el.style.opacity = s.opacity;
      });

      if (progress >= 0.88 && !fadeFired) {
        fadeFired = true;
        setFadeOut(true);
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setTimeout(() => onFinishRef.current?.(), 1400);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`loading-overlay${fadeOut ? ' lo-fade-out' : ''}`}>
      <div className="lo-inner-content">
        <div className="chair-stage">
          {PLANKS.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => (plankElsRef.current[i] = el)}
              className={`wood-plank${p.isCushion ? ' chair-cushion' : ''}`}
              style={{
                width: p.w,
                height: p.h,
                marginLeft: -p.w / 2,
                marginTop: -p.h / 2,
                background: `linear-gradient(${
                  p.h > p.w ? '180deg' : '90deg'
                }, ${p.c1}, ${p.c2} 40%, ${p.c1} 70%, ${p.c2})`,
              }}
            />
          ))}
        </div>
        <div className="lo-brand-container">
          <span className="lo-brand-name">AURELIA</span>
          <span className="lo-brand-dot"></span>
        </div>
        <p className="lo-subtitle">Crafting your experience…</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
