/* ════════ FEATURE 76 · FOOTER HORIZON ════════
   A soft horizon glow sits behind the footer and drifts upward as you reach
   the bottom — a gentle scrubbed parallax that gives the page a "landing". */
(() => {
  if (window.__mvHorizon) return; window.__mvHorizon = 1;
  const footer = document.querySelector('.footer');
  if (!footer || !window.gsap) return;

  window.mvInject && window.mvInject('mv-horizon-css', `
    .footer{ position:relative; overflow:hidden; }
    .footer > *{ position:relative; z-index:1; }
    .mv-horizon{ position:absolute; left:-10%; right:-10%; bottom:-40%; height:90%; z-index:0; pointer-events:none;
      background:radial-gradient(60% 100% at 50% 100%, rgba(255,106,0,.22), transparent 70%); }
  `);
  const h = document.createElement('div'); h.className = 'mv-horizon';
  footer.insertBefore(h, footer.firstChild);

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.fromTo(h, { yPercent: 40 }, { yPercent: -10, ease: 'none',
    scrollTrigger: { trigger: footer, start: 'top bottom', end: 'bottom bottom', scrub: true } });
})();
