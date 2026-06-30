/* ════════ FEATURE 82 · WET MODE ════════
   Declare a wet race — rain streaks fall across the screen and the page
   dims a touch. Toggle from the dock. Canvas runs only while it's on. */
(() => {
  if (window.__mvWet) return; window.__mvWet = 1;
  if (!window.mvDock) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.mvInject('mv-wet-css', `
    .mv-wet{ position:fixed; inset:0; z-index:9983; pointer-events:none; opacity:0; transition:opacity .5s;
      background:linear-gradient(rgba(6,10,24,.18), rgba(6,10,24,.3)); }
    body.mv-wet-on .mv-wet{ opacity:1; }
    .mv-wet canvas{ width:100%; height:100%; display:block; }
  `);
  const layer = document.createElement('div'); layer.className = 'mv-wet';
  const cv = document.createElement('canvas'); layer.appendChild(cv); document.body.appendChild(layer);
  const ctx = cv.getContext('2d');
  const resize = () => { cv.width = innerWidth; cv.height = innerHeight; };
  resize(); addEventListener('resize', resize);

  let on = false, raf = 0, drops = [];
  const seed = () => drops = Array.from({ length: 140 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    len: 10 + Math.random() * 18, sp: 8 + Math.random() * 12
  }));
  const loop = () => {
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.strokeStyle = 'rgba(170,200,255,.35)'; ctx.lineWidth = 1.4;
    drops.forEach(d => {
      ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - 2, d.y + d.len); ctx.stroke();
      d.y += d.sp; d.x -= 1.5; if (d.y > innerHeight) { d.y = -20; d.x = Math.random() * innerWidth; }
    });
    raf = requestAnimationFrame(loop);
  };

  const btn = window.mvDockBtn('WET', 'Wet mode', '🌧');
  window.mvDock().appendChild(btn);
  btn.addEventListener('click', () => {
    on = !on; document.body.classList.toggle('mv-wet-on', on); btn.classList.toggle('on', on);
    if (on && !reduce) { seed(); cancelAnimationFrame(raf); loop(); }
    else { cancelAnimationFrame(raf); ctx.clearRect(0, 0, cv.width, cv.height); }
  });
})();
