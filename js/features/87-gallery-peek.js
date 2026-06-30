/* ════════ FEATURE 87 · REEL PEEK ════════
   Hovering a moment in the reel pushes its number in for a quick depth peek
   while the card lifts — a smooth GSAP scale/translate on enter and leave. */
(() => {
  if (window.__mvPeek) return; window.__mvPeek = 1;
  if (!window.gsap || matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const wire = (shot) => {
    if (shot.dataset.peek) return; shot.dataset.peek = '1';
    const img = shot.querySelector('.shot__img');
    const big = shot.querySelector('.shot__big');
    const cap = shot.querySelector('figcaption');
    shot.addEventListener('pointerenter', () => {
      gsap.to(img, { scale: 1.04, duration: .5, ease: 'power3.out' });
      if (big) gsap.to(big, { scale: 1.15, opacity: .35, duration: .5, ease: 'power3.out' });
      if (cap) gsap.to(cap, { x: 8, duration: .4, ease: 'power3.out' });
    });
    shot.addEventListener('pointerleave', () => {
      gsap.to([img, big].filter(Boolean), { scale: 1, opacity: (i, t) => t === big ? 1 : 1, duration: .5, ease: 'power3' });
      if (big) gsap.to(big, { opacity: 1, duration: .4 });
      if (cap) gsap.to(cap, { x: 0, duration: .4, ease: 'power3' });
    });
    gsap.set(img, { transformOrigin: '50% 50%' });
  };
  const run = () => document.querySelectorAll('.shot').forEach(wire);
  if (document.readyState === 'complete') setTimeout(run, 120);
  else addEventListener('load', () => setTimeout(run, 120));
})();
