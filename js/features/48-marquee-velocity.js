/* ════════ FEATURE 48 · MARQUEE VELOCITY ════════
   The ticker speeds up (and leans) with how fast you scroll, then settles
   back to a cruise — driving the existing marquee tween's timeScale. */
(() => {
  if (window.__mvMq) return; window.__mvMq = 1;
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const track = document.getElementById('marquee');
  const marquee = document.querySelector('.marquee');
  if (!track) return;

  // grab the infinite tween main.js created on the track
  const start = () => {
    const tweens = gsap.getTweensOf(track);
    const tw = tweens.find(t => t.repeat && t.repeat() === -1) || tweens[0];
    if (!tw) { setTimeout(start, 300); return; }

    const skew = gsap.quickTo(marquee, 'skewX', { duration: .4, ease: 'power3' });
    let lastY = scrollY, vel = 0;
    addEventListener('scroll', () => { vel = gsap.utils.clamp(-60, 60, scrollY - lastY); lastY = scrollY; }, { passive: true });
    gsap.ticker.add(() => {
      vel += (0 - vel) * 0.08;
      const boost = 1 + Math.min(Math.abs(vel) / 8, 6);   // up to 7× speed
      tw.timeScale((vel < 0 ? -1 : 1) * boost);           // also reverses with scroll-up
      skew(gsap.utils.clamp(-6, 6, -vel * 0.12));
    });
  };
  start();
})();
