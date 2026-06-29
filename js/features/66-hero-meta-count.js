/* ════════ FEATURE 66 · HERO META COUNT-UP ════════
   The hero stat figures tick up smoothly the first time the hero is in view
   (the number-bearing ones), keeping their prefix/suffix. */
(() => {
  if (window.__mvMetaCount) return; window.__mvMetaCount = 1;
  if (!window.gsap) return;
  const nums = document.querySelectorAll('.hero__meta b');
  if (!nums.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  ScrollTrigger.create({
    trigger: '.hero__meta', start: 'top 95%', once: true,
    onEnter: () => nums.forEach((el, i) => {
      const m = el.textContent.match(/^(\D*)(\d+)(\D*)$/);
      if (!m) return;                                   // e.g. "NED" — leave it
      const [, pre, n, suf] = m, target = +n, o = { v: 0 };
      gsap.to(o, { v: target, duration: 1.4, delay: i * 0.12, ease: 'power2.out',
        onUpdate: () => { el.textContent = pre + Math.round(o.v) + suf; } });
    })
  });
})();
