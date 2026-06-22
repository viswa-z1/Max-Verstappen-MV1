/* ════════ FEATURE 35 · 3D SCROLL TILT ════════
   Content blocks pivot in 3D as they travel through the viewport — tilted
   back as they rise from the bottom, flat at centre, tilted forward as they
   leave the top. Per-element perspective keeps the fixed HUD untouched.
   Disabled for reduced motion. */
(() => {
  if (window.__mvTilt3d) return; window.__mvTilt3d = 1;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !window.gsap) return;

  // whole blocks (not their animated children) — these aren't transformed elsewhere
  const SELECTORS = [
    '.lid', '.store__grid', '.social__grid', '.partners__grid',
    '.cal__list', '.mvtl__list', '.mvrad', '.machine__overlay'
  ];
  const TILT = 8;

  const apply = () => {
    SELECTORS.forEach(sel => document.querySelectorAll(sel).forEach(el => {
      if (el.dataset.tilt3d) return; el.dataset.tilt3d = '1';
      gsap.fromTo(el,
        { rotateX: TILT, transformPerspective: 1100, transformOrigin: '50% 50%' },
        { rotateX: -TILT, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    }));
    window.ScrollTrigger && ScrollTrigger.refresh();
  };

  // run after other modules have injected their sections (timeline, radar)
  if (document.readyState === 'complete') setTimeout(apply, 60);
  else window.addEventListener('load', () => setTimeout(apply, 60));
})();
