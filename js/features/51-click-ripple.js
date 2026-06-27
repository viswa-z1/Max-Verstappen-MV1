/* ════════ FEATURE 51 · CLICK RIPPLE ════════
   Every click sends out a quick orange shockwave from the pointer — a small
   GSAP ring that scales up and fades. */
(() => {
  if (window.__mvRipple) return; window.__mvRipple = 1;
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-ripple-css', `
    .mv-ripple{ position:fixed; z-index:9985; pointer-events:none; width:18px; height:18px; margin:-9px 0 0 -9px;
      border:2px solid var(--orange,#ff6a00); border-radius:50%; }
  `);
  addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    const r = document.createElement('div');
    r.className = 'mv-ripple'; r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
    document.body.appendChild(r);
    gsap.fromTo(r, { scale: 0, opacity: 1 }, { scale: 4.5, opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => r.remove() });
  }, { passive: true });
})();
