/* ════════ FEATURE 70 · TITLE SHINE ════════
   A soft light streak sweeps across each big heading once as it scrolls into
   view — a quick highlight pass laid over the text, so colours stay intact. */
(() => {
  if (window.__mvShine) return; window.__mvShine = 1;
  if (!window.gsap) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-shine-css', `
    .mv-shine-host{ position:relative; }
    .mv-shine-host > .mv-shine{ position:absolute; inset:0; pointer-events:none; overflow:hidden; }
    .mv-shine i{ position:absolute; top:-20%; left:0; width:35%; height:140%; transform:translateX(-160%) skewX(-18deg);
      background:linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent); mix-blend-mode:overlay; }
  `);

  gsap.utils.toArray('.section-title').forEach(el => {
    if (el.dataset.shine) return; el.dataset.shine = '1';
    el.classList.add('mv-shine-host');
    const wrap = document.createElement('span'); wrap.className = 'mv-shine';
    const streak = document.createElement('i'); wrap.appendChild(streak); el.appendChild(wrap);
    ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true,
      onEnter: () => gsap.fromTo(streak, { xPercent: -160 }, { xPercent: 460, duration: 1.1, ease: 'power2.inOut', delay: .2 }) });
  });
})();
