/* ════════ FEATURE 15 · LAP COUNTER ════════
   Turns scroll depth into race progress — a small "LAP n / 58" board fixed
   top-centre, with a thin progress thread. */
(() => {
  if (window.__mvLapC) return; window.__mvLapC = 1;
  const TOTAL = 58;

  window.mvInject && window.mvInject('mv-lapc-css', `
    .mv-lapc{ position:fixed; top:74px; left:50%; transform:translateX(-50%); z-index:140;
      display:flex; flex-direction:column; align-items:center; gap:4px; padding:7px 16px;
      background:rgba(10,12,20,.82); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.12);
      border-radius:8px; font-family:var(--mvmono); box-shadow:0 10px 30px rgba(0,0,0,.4); }
    .mv-lapc__n{ font-size:13px; letter-spacing:.06em; color:#f3f4f8; font-variant-numeric:tabular-nums; }
    .mv-lapc__n b{ color:var(--orange,#ff6a00); }
    .mv-lapc__n.flag b{ color:#fff; }
    .mv-lapc__track{ width:120px; height:3px; background:rgba(255,255,255,.1); border-radius:3px; overflow:hidden; }
    .mv-lapc__track i{ display:block; height:100%; width:0; background:var(--orange,#ff6a00); }
    @media (max-width:760px){ .mv-lapc{ top:62px; transform:translateX(-50%) scale(.9); } }
  `);

  const el = document.createElement('div');
  el.className = 'mv-lapc';
  el.innerHTML = `<div class="mv-lapc__n">LAP <b id="mvLapN">1</b> / ${TOTAL}</div><div class="mv-lapc__track"><i id="mvLapI"></i></div>`;
  document.body.appendChild(el);
  const nEl = el.querySelector('#mvLapN'), iEl = el.querySelector('#mvLapI'), nWrap = el.querySelector('.mv-lapc__n');

  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const frac = max > 0 ? Math.min(scrollY / max, 1) : 0;
    const lap = Math.max(1, Math.round(frac * TOTAL));
    nEl.textContent = lap === TOTAL ? 'FINISH' : lap;
    nWrap.classList.toggle('flag', lap === TOTAL);
    iEl.style.width = (frac * 100) + '%';
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update); update();
})();
