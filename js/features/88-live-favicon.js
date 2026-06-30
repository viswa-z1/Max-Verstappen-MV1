/* ════════ FEATURE 88 · LIVE FAVICON ════════
   A tiny animated tab icon — the MV1 number on a pulsing orange dot, drawn
   to a canvas and refreshed a few times a second while the tab is visible. */
(() => {
  if (window.__mvFav) return; window.__mvFav = 1;

  const link = document.querySelector("link[rel~='icon']") || (() => {
    const l = document.createElement('link'); l.rel = 'icon'; document.head.appendChild(l); return l;
  })();
  const cv = document.createElement('canvas'); cv.width = cv.height = 64;
  const ctx = cv.getContext('2d');
  const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--orange').trim() || '#ff6a00';

  let t = 0, timer;
  const draw = () => {
    t += 0.18;
    const pulse = 26 + Math.sin(t) * 4;
    ctx.clearRect(0, 0, 64, 64);
    ctx.fillStyle = '#06070f'; ctx.fillRect(0, 0, 64, 64);
    ctx.beginPath(); ctx.arc(32, 32, pulse, 0, 7); ctx.fillStyle = accent(); ctx.fill();
    ctx.fillStyle = '#160a00'; ctx.font = '900 34px Anton, Arial, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('1', 32, 35);
    link.href = cv.toDataURL('image/png');
  };
  const run = () => { clearInterval(timer); if (!document.hidden) timer = setInterval(draw, 280); };
  document.addEventListener('visibilitychange', run);
  run();
})();
