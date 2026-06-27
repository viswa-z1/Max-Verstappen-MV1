/* ════════ FEATURE 52 · CURSOR SPOTLIGHT ════════
   A soft warm light trails the pointer across the page — subtle ambient
   glow, eased with GSAP. Off on touch / reduced motion. */
(() => {
  if (window.__mvSpot) return; window.__mvSpot = 1;
  if (!window.gsap || matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-spot-css', `
    .mv-spot{ position:fixed; top:0; left:0; width:520px; height:520px; margin:-260px 0 0 -260px; z-index:120;
      pointer-events:none; border-radius:50%; opacity:.5; mix-blend-mode:soft-light;
      background:radial-gradient(circle, rgba(255,138,43,.5), transparent 60%); }
  `);
  const el = document.createElement('div'); el.className = 'mv-spot'; document.body.appendChild(el);
  const x = gsap.quickTo(el, 'x', { duration: .7, ease: 'power3' });
  const y = gsap.quickTo(el, 'y', { duration: .7, ease: 'power3' });
  addEventListener('pointermove', e => { x(e.clientX); y(e.clientY); }, { passive: true });
})();
