/* ════════ FEATURE 03 · HOT-LAP TIMER ════════
   Real stopwatch with three sector splits. Sectors flash green for a
   personal best, magenta for the fastest ever — true F1 timing colours.
   Best lap persists in localStorage. */
(() => {
  if (window.__mvLap) return; window.__mvLap = 1;
  if (!window.mvDock) return;

  window.mvInject('mv-lap-css', `
    .mv-lap{ position:fixed; left:84px; bottom:18px; z-index:301; width:230px; display:none;
      padding:14px; background:rgba(10,12,20,.92); backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,.12); border-radius:10px; font-family:var(--mvmono);
      box-shadow:0 18px 50px rgba(0,0,0,.5); }
    .mv-lap.open{ display:block; }
    .mv-lap__h{ font-size:9px; letter-spacing:.22em; color:#8b8fa3; text-transform:uppercase; }
    .mv-lap__t{ font-size:34px; font-weight:700; letter-spacing:.02em; margin:4px 0 10px; font-variant-numeric:tabular-nums; }
    .mv-lap__secs{ display:grid; grid-template-columns:repeat(3,1fr); gap:6px; margin-bottom:10px; }
    .mv-sec{ text-align:center; padding:7px 0; border-radius:5px; background:rgba(255,255,255,.05);
      border:1px solid rgba(255,255,255,.08); font-size:11px; font-variant-numeric:tabular-nums; color:#c9ccd8; }
    .mv-sec.best{ background:rgba(46,224,106,.18); border-color:#2ee06a; color:#2ee06a; }
    .mv-sec.fastest{ background:rgba(255,61,245,.2); border-color:#ff3df5; color:#ff3df5; }
    .mv-lap__btns{ display:flex; gap:6px; }
    .mv-lap__btns button{ flex:1; padding:8px 0; border-radius:5px; cursor:pointer;
      font-family:var(--mvmono); font-size:11px; letter-spacing:.08em; text-transform:uppercase;
      border:1px solid rgba(255,255,255,.15); background:transparent; color:#f3f4f8; transition:.2s; }
    .mv-lap__btns button:hover{ border-color:var(--orange,#ff6a00); color:var(--orange,#ff6a00); }
    .mv-lap__best{ margin-top:8px; font-size:10px; color:#8b8fa3; letter-spacing:.1em; }
    @media (max-width:760px){ .mv-lap{ left:auto; right:10px; bottom:120px; } }
  `);

  const panel = document.createElement('div');
  panel.className = 'mv-lap';
  panel.innerHTML = `
    <div class="mv-lap__h">Hot lap · live timing</div>
    <div class="mv-lap__t" id="mvLapT">0:00.000</div>
    <div class="mv-lap__secs">
      <div class="mv-sec" id="mvS1">S1 —</div><div class="mv-sec" id="mvS2">S2 —</div><div class="mv-sec" id="mvS3">S3 —</div>
    </div>
    <div class="mv-lap__btns">
      <button id="mvLapGo">Start</button>
      <button id="mvLapSec">Sector</button>
      <button id="mvLapRst">Reset</button>
    </div>
    <div class="mv-lap__best" id="mvLapBest">Best lap: —</div>`;
  document.body.appendChild(panel);

  const btn = window.mvDockBtn('LAP', 'Hot-lap timer', '⏱');
  window.mvDock().appendChild(btn);
  btn.addEventListener('click', () => { panel.classList.toggle('open'); btn.classList.toggle('on'); });

  const fmt = ms => { const m = Math.floor(ms / 60000), s = Math.floor(ms % 60000 / 1000), x = Math.floor(ms % 1000); return `${m}:${String(s).padStart(2,'0')}.${String(x).padStart(3,'0')}`; };
  const tEl = panel.querySelector('#mvLapT');
  const secEls = [panel.querySelector('#mvS1'), panel.querySelector('#mvS2'), panel.querySelector('#mvS3')];
  const bestEl = panel.querySelector('#mvLapBest');
  let raf, t0, running = false, splits = [], sector = 0;
  let best = JSON.parse(localStorage.getItem('mv-best') || 'null'); // {lap, secs:[..]}
  if (best) bestEl.textContent = 'Best lap: ' + fmt(best.lap);

  const tick = () => { tEl.textContent = fmt(performance.now() - t0); raf = requestAnimationFrame(tick); };

  panel.querySelector('#mvLapGo').addEventListener('click', () => {
    if (running) return; reset(); t0 = performance.now(); running = true; tick(); window.mvRev && window.mvRev();
  });
  panel.querySelector('#mvLapSec').addEventListener('click', () => {
    if (!running || sector > 2) return;
    const now = performance.now() - t0;
    const prev = splits.length ? splits[splits.length - 1] : 0;
    const dur = now - prev; splits.push(now);
    const cell = secEls[sector];
    cell.textContent = `S${sector + 1} ${(dur / 1000).toFixed(3)}`;
    const pb = best && best.secs && best.secs[sector];
    if (!pb || dur < pb) cell.classList.add(best ? 'fastest' : 'best');
    else cell.classList.add('best');
    sector++;
    if (sector > 2) finish(now);
  });
  panel.querySelector('#mvLapRst').addEventListener('click', reset);

  function finish(lap) {
    running = false; cancelAnimationFrame(raf);
    const secs = splits.map((s, i) => s - (i ? splits[i - 1] : 0));
    if (!best || lap < best.lap) { best = { lap, secs }; localStorage.setItem('mv-best', JSON.stringify(best)); }
    bestEl.textContent = 'Best lap: ' + fmt(best.lap);
  }
  function reset() {
    cancelAnimationFrame(raf); running = false; splits = []; sector = 0;
    tEl.textContent = '0:00.000';
    secEls.forEach((c, i) => { c.textContent = `S${i + 1} —`; c.classList.remove('best', 'fastest'); });
  }
})();
