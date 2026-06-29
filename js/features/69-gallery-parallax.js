/* ════════ FEATURE 69 · GALLERY DEPTH ════════
   The big numbers inside the horizontal reel drift within their frames as
   the gallery scrolls past — a subtle parallax that adds depth. */
(() => {
  if (window.__mvGalDepth) return; window.__mvGalDepth = 1;
  if (!window.gsap) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const start = () => {
    const track = document.getElementById('galTrack');
    const shots = document.querySelectorAll('.shot');
    if (!track || !shots.length) return;
    // reuse the horizontal scroll tween as the timeline driver
    const scrollTween = gsap.getTweensOf(track).find(t => t.scrollTrigger);
    shots.forEach(shot => {
      const big = shot.querySelector('.shot__big');
      if (!big) return;
      gsap.fromTo(big, { xPercent: -12 }, { xPercent: 12, ease: 'none',
        scrollTrigger: { trigger: shot, containerAnimation: scrollTween || undefined,
          start: 'left right', end: 'right left', scrub: true } });
    });
    ScrollTrigger.refresh();
  };
  if (document.readyState === 'complete') setTimeout(start, 120);
  else addEventListener('load', () => setTimeout(start, 120));
})();
