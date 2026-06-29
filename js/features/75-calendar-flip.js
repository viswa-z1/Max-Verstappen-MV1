/* ════════ FEATURE 75 · CALENDAR FLIP-IN ════════
   The schedule rows flip up into place on a 3D hinge as they scroll into
   view, staggered down the list (GSAP ScrollTrigger). */
(() => {
  if (window.__mvCalFlip) return; window.__mvCalFlip = 1;
  if (!window.gsap) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const start = () => {
    const rows = document.querySelectorAll('#calList .cal__row');
    if (!rows.length) return;
    const list = document.getElementById('calList');
    if (list) gsap.set(list, { perspective: 900 });
    gsap.set(rows, { transformOrigin: '50% 0%' });
    gsap.from(rows, {
      rotateX: -85, opacity: 0, transformPerspective: 900, ease: 'power3.out',
      duration: 0.7, stagger: 0.08,
      scrollTrigger: { trigger: '#calList', start: 'top 80%' }
    });
    ScrollTrigger.refresh();
  };
  if (document.readyState === 'complete') setTimeout(start, 120);
  else addEventListener('load', () => setTimeout(start, 120));
})();
