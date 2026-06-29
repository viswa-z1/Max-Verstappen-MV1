/* ════════ FEATURE 74 · MAGNETIC DOCK ════════
   The instrument buttons lean gently toward the cursor as it passes, then
   spring back — a soft magnetic pull (GSAP quickTo). */
(() => {
  if (window.__mvMagDock) return; window.__mvMagDock = 1;
  if (!window.gsap || matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const wire = (btn) => {
    if (btn.dataset.mag) return; btn.dataset.mag = '1';
    const x = gsap.quickTo(btn, 'x', { duration: .4, ease: 'power3' });
    const y = gsap.quickTo(btn, 'y', { duration: .4, ease: 'power3' });
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.35);
      y((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    btn.addEventListener('pointerleave', () => { gsap.to(btn, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,0.4)' }); });
  };
  const run = () => document.querySelectorAll('#mv-dock .mv-dbtn').forEach(wire);
  if (document.readyState === 'complete') setTimeout(run, 120);
  else addEventListener('load', () => setTimeout(run, 120));
})();
