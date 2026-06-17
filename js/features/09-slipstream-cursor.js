/* ════════ FEATURE 09 · SLIPSTREAM CURSOR ════════
   A speed trail that streaks behind the pointer. Disabled on touch and
   when reduced motion is requested. */
(() => {
  if (window.__mvSlip) return; window.__mvSlip = 1;
  if (matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const c = document.createElement('canvas');
  Object.assign(c.style, { position: 'fixed', inset: 0, zIndex: 9990, pointerEvents: 'none' });
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const resize = () => { c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  resize(); addEventListener('resize', resize);

  let parts = [], mx = 0, my = 0, lx = 0, ly = 0;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    const speed = Math.hypot(mx - lx, my - ly);
    const n = Math.min(Math.floor(speed / 6), 4);
    for (let i = 0; i < n; i++) parts.push({ x: mx, y: my, vx: (mx - lx) * 0.12, vy: (my - ly) * 0.12, life: 1, r: Math.random() * 2.5 + 1 });
    lx = mx; ly = my;
  });

  (function loop() {
    ctx.clearRect(0, 0, c.width, c.height);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim() || '#ff6a00';
    parts = parts.filter(p => p.life > 0);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vx *= 0.92; p.vy *= 0.92; p.life -= 0.045;
      ctx.globalAlpha = p.life * 0.7; ctx.fillStyle = accent;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, 7); ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();
})();
