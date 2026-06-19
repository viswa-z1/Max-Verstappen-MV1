/* ════════ FEATURE 17 · DASHBOARD CLUSTER ════════
   A steering-wheel style readout — gear, speed and an RPM shift-light bar
   that respond to how fast you scroll. Opens from the dock. */
(() => {
  if (window.__mvDash) return; window.__mvDash = 1;
  if (!window.mvDock || !window.mvPanel) return;

  window.mvInject('mv-dash-css', `
    .mv-dash__top{ display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:10px; }
    .mv-dash__gear{ font-family:'Anton',sans-serif; font-size:46px; line-height:.8; color:#f3f4f8; }
    .mv-dash__spd{ text-align:right; }
    .mv-dash__spd b{ font-family:'Anton',sans-serif; font-size:26px; color:var(--orange,#ff6a00); font-variant-numeric:tabular-nums; }
    .mv-dash__spd span{ display:block; font-size:8px; letter-spacing:.2em; color:#8b8fa3; text-transform:uppercase; }
    .mv-rpm{ display:flex; gap:2px; }
    .mv-rpm i{ flex:1; height:9px; border-radius:1px; background:rgba(255,255,255,.1); transition:background .08s; }
    .mv-dash__hint{ margin-top:9px; font-size:9px; color:#8b8fa3; letter-spacing:.06em; }
  `);

  const N = 18;
  const panel = document.createElement('div');
  panel.innerHTML = `<div class="mv-dp__h">Dashboard · scroll to rev</div>
    <div class="mv-dash__top">
      <div class="mv-dash__gear" id="mvGear">N</div>
      <div class="mv-dash__spd"><b id="mvSpd">0</b><span>km/h</span></div>
    </div>
    <div class="mv-rpm" id="mvRpm">${Array.from({ length: N }, () => '<i></i>').join('')}</div>
    <div class="mv-dash__hint">Gear &amp; revs follow your scroll speed.</div>`;
  document.body.appendChild(panel);

  const btn = window.mvDockBtn('DASH', 'Dashboard cluster', '⊙');
  window.mvDock().appendChild(btn);
  window.mvPanel(btn, panel);

  const gearEl = panel.querySelector('#mvGear'), spdEl = panel.querySelector('#mvSpd');
  const bars = [...panel.querySelectorAll('#mvRpm i')];
  let lastY = scrollY, lastT = performance.now(), vel = 0;
  addEventListener('scroll', () => {
    const now = performance.now(), dt = Math.max(now - lastT, 16);
    vel = Math.abs(scrollY - lastY) / dt; lastY = scrollY; lastT = now;
  }, { passive: true });

  (function loop() {
    if (panel.classList.contains('open')) {
      vel *= 0.9;
      const speed = Math.min(Math.round(vel * 95), 350);
      const rpmFrac = Math.min(vel / 3.6, 1);
      spdEl.textContent = speed;
      gearEl.textContent = speed < 5 ? 'N' : Math.min(Math.ceil(speed / 44), 8);
      const lit = Math.round(rpmFrac * N);
      bars.forEach((b, i) => b.style.background = i < lit
        ? (i > N * 0.82 ? '#ff3df5' : i > N * 0.6 ? '#ff2e2e' : i > N * 0.35 ? '#ffd23d' : '#2ee06a')
        : 'rgba(255,255,255,.1)');
    }
    requestAnimationFrame(loop);
  })();
})();
