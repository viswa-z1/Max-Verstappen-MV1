/* ════════ FEATURE 65 · SPEED LINES ════════
   Scroll fast and horizontal streaks flick across the screen edges for a
   burst of velocity — GSAP-spawned lines that fade as you settle. Off for
   reduced motion. */
(() => {
  if (window.__mvStreak) return; window.__mvStreak = 1;
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-streak-css', `
    .mv-streaks{ position:fixed; inset:0; z-index:118; pointer-events:none; overflow:hidden; }
    .mv-streaks i{ position:absolute; height:2px; border-radius:2px;
      background:linear-gradient(90deg, transparent, rgba(255,106,0,.8), transparent); }
  `);
  const wrap = document.createElement('div'); wrap.className = 'mv-streaks'; document.body.appendChild(wrap);

  let lastY = scrollY, cooldown = 0;
  addEventListener('scroll', () => {
    const v = Math.abs(scrollY - lastY); lastY = scrollY;
    const now = performance.now();
    if (v > 38 && now > cooldown) {
      cooldown = now + 70;
      const dir = Math.sign(scrollY - (lastY - (scrollY - lastY))) || 1;
      spawn(v, dir);
    }
  }, { passive: true });

  function spawn(v, dir) {
    const n = Math.min(Math.round(v / 30), 4);
    for (let i = 0; i < n; i++) {
      const line = document.createElement('i');
      const w = gsap.utils.random(80, 240);
      const fromRight = Math.random() > 0.5;
      line.style.width = w + 'px';
      line.style.top = gsap.utils.random(6, 94) + '%';
      line.style[fromRight ? 'right' : 'left'] = '-260px';
      wrap.appendChild(line);
      const travel = innerWidth + 320;
      gsap.to(line, { x: (fromRight ? -1 : 1) * travel, duration: gsap.utils.random(0.45, 0.8),
        ease: 'power2.in', onComplete: () => line.remove() });
    }
  }
})();
