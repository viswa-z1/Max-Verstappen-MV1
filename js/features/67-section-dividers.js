/* ════════ FEATURE 67 · RACING-STRIPE DIVIDERS ════════
   A thin orange stripe draws itself across the top of each major section as
   it scrolls into view — a smooth scrubbed width reveal. */
(() => {
  if (window.__mvDivider) return; window.__mvDivider = 1;
  if (!window.gsap) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-divider-css', `
    .mv-divider{ position:relative; height:2px; width:100%; transform-origin:left center; transform:scaleX(0);
      background:linear-gradient(90deg, var(--orange,#ff6a00), transparent); z-index:6; }
  `);

  const targets = ['#quote', '#gallery', '#track', '#machine', '#helmets', '#calendar', '#store', '#social', '#numbers'];
  targets.forEach(sel => {
    const sec = document.querySelector(sel);
    if (!sec || sec.previousElementSibling?.classList?.contains('mv-divider')) return;
    const bar = document.createElement('div'); bar.className = 'mv-divider';
    sec.parentNode.insertBefore(bar, sec);
    gsap.to(bar, { scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: bar, start: 'top 92%', end: 'top 55%', scrub: 1 } });
  });
  ScrollTrigger.refresh();
})();
