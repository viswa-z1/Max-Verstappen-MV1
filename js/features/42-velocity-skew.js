/* ════════ FEATURE 42 · VELOCITY SKEW ════════
   Headings lean and stretch with scroll speed, then spring back to true
   when you stop — the classic GSAP scroll-velocity feel. */
(() => {
  if (window.__mvSkew) return; window.__mvSkew = 1;
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = gsap.utils.toArray('.section-title');
  if (!targets.length) return;
  const setters = targets.map(el => ({
    sy: gsap.quickSetter(el, 'skewY', 'deg'),
    sc: gsap.quickSetter(el, 'scaleY')
  }));

  let lastY = scrollY, vel = 0, raf;
  const loop = () => {
    vel += (0 - vel) * 0.12;                       // ease back to 0
    const v = gsap.utils.clamp(-8, 8, vel);
    setters.forEach(s => { s.sy(v * 0.6); s.sc(1 + Math.abs(v) * 0.012); });
    raf = requestAnimationFrame(loop);
  };
  addEventListener('scroll', () => {
    const now = scrollY; vel = gsap.utils.clamp(-40, 40, now - lastY); lastY = now;
  }, { passive: true });
  loop();
})();
