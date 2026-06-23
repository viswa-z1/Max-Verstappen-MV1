/* ════════ FEATURE 40 · YOUR STINT ════════
   A little session readout: how long you've been on track, how far you've
   scrolled (as laps), how deep you've gone, and your top scroll speed. */
(() => {
  if (window.__mvStint) return; window.__mvStint = 1;
  if (!window.mvDock || !window.mvPanel) return;

  window.mvInject('mv-stint-css', `
    .mv-stint__row{ display:flex; justify-content:space-between; align-items:baseline; padding:8px 0;
      border-top:1px solid rgba(255,255,255,.07); font-size:12px; color:#c9ccd8; }
    .mv-stint__row:first-of-type{ border-top:0; }
    .mv-stint__row b{ font-family:var(--mvmono); color:#f3f4f8; font-size:14px; font-variant-numeric:tabular-nums; }
    .mv-stint__row b em{ color:var(--orange,#ff6a00); font-style:normal; font-size:10px; margin-left:2px; }
  `);

  const panel = document.createElement('div');
  panel.innerHTML = `<div class="mv-dp__h">Your stint</div>
    <div class="mv-stint__row"><span>Time on track</span><b id="mvStTime">0:00</b></div>
    <div class="mv-stint__row"><span>Distance</span><b id="mvStDist">0<em>LAPS</em></b></div>
    <div class="mv-stint__row"><span>Track covered</span><b id="mvStDepth">0<em>%</em></b></div>
    <div class="mv-stint__row"><span>Top speed</span><b id="mvStSpd">0<em>KM/H</em></b></div>`;
  document.body.appendChild(panel);

  const btn = window.mvDockBtn('STINT', 'Your stint', '▦');
  window.mvDock().appendChild(btn);
  window.mvPanel(btn, panel);

  const start = Date.now();
  let scrolled = 0, lastY = scrollY, maxDepth = 0, topSpeed = 0, lastT = performance.now();
  addEventListener('scroll', () => {
    const now = performance.now(), dy = Math.abs(scrollY - lastY), dt = Math.max(now - lastT, 16);
    scrolled += dy; lastY = scrollY; lastT = now;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (max > 0) maxDepth = Math.max(maxDepth, Math.min(100, (scrollY / max) * 100));
    topSpeed = Math.max(topSpeed, Math.min((dy / dt) * 95, 360));
  }, { passive: true });

  const tEl = panel.querySelector('#mvStTime'), dEl = panel.querySelector('#mvStDist'),
        depEl = panel.querySelector('#mvStDepth'), sEl = panel.querySelector('#mvStSpd');
  setInterval(() => {
    if (!panel.classList.contains('open')) return;
    const s = Math.floor((Date.now() - start) / 1000);
    tEl.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    dEl.innerHTML = (scrolled / Math.max(innerHeight, 1)).toFixed(1) + '<em>LAPS</em>';
    depEl.innerHTML = Math.round(maxDepth) + '<em>%</em>';
    sEl.innerHTML = Math.round(topSpeed) + '<em>KM/H</em>';
  }, 500);
})();
