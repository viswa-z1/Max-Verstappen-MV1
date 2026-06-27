/* ════════ FEATURE 58 · PACE CAR ════════
   Every so often a little car streaks across the bottom of the screen with
   a speed-blur — a quiet ambient flyby (GSAP). Off for reduced motion. */
(() => {
  if (window.__mvPace) return; window.__mvPace = 1;
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-pace-css', `
    .mv-pace{ position:fixed; bottom:8px; left:0; z-index:115; pointer-events:none; width:96px; height:34px; opacity:0; }
    .mv-pace svg{ width:100%; height:100%; filter:drop-shadow(0 4px 8px rgba(0,0,0,.5)); }
  `);
  const el = document.createElement('div');
  el.className = 'mv-pace';
  el.innerHTML = `<svg viewBox="0 0 120 42" aria-hidden="true">
    <rect x="6" y="26" width="108" height="3" fill="var(--orange,#ff6a00)" opacity=".5"/>
    <path d="M10 28 L26 28 L34 16 L74 14 Q92 14 100 24 L110 26 L110 30 L10 30 Z" fill="var(--orange,#ff6a00)"/>
    <path d="M40 17 L70 16 L74 24 L36 24 Z" fill="#0a0c16"/>
    <circle cx="36" cy="30" r="7" fill="#111"/><circle cx="92" cy="30" r="7" fill="#111"/>
    <circle cx="36" cy="30" r="3" fill="#555"/><circle cx="92" cy="30" r="3" fill="#555"/></svg>`;
  document.body.appendChild(el);

  const run = () => {
    gsap.set(el, { x: -120, opacity: 1, scaleX: 1 });
    gsap.to(el, { x: innerWidth + 140, duration: gsap.utils.random(1.6, 2.6), ease: 'power1.in',
      onComplete: () => gsap.set(el, { opacity: 0 }) });
  };
  const schedule = () => { gsap.delayedCall(gsap.utils.random(16, 34), () => { run(); schedule(); }); };
  gsap.delayedCall(8, () => { run(); schedule(); });
})();
