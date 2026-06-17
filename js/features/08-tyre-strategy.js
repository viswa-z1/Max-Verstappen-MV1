/* ════════ FEATURE 08 · TYRE STRATEGY ════════
   Build a pit strategy from real compounds (soft / medium / hard) and see
   the stint bar and an estimated race delta update live. */
(() => {
  if (window.__mvTyre) return; window.__mvTyre = 1;
  if (!window.mvDock) return;

  const COMPOUNDS = {
    S: { name: 'Soft', col: '#ff2e2e', pace: 0.0, life: 18 },
    M: { name: 'Medium', col: '#ffd23d', pace: 0.6, life: 30 },
    H: { name: 'Hard', col: '#e9e9ee', pace: 1.2, life: 42 }
  };
  const LAPS = 58, PIT_LOSS = 22; // seconds per stop

  window.mvInject('mv-tyre-css', `
    .mv-tyre{ position:fixed; left:84px; bottom:18px; z-index:301; width:250px; display:none;
      padding:14px; background:rgba(10,12,20,.92); backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,.12); border-radius:10px; font-family:var(--mvmono);
      box-shadow:0 18px 50px rgba(0,0,0,.5); }
    .mv-tyre.open{ display:block; }
    .mv-tyre__h{ font-size:9px; letter-spacing:.2em; color:#8b8fa3; text-transform:uppercase; margin-bottom:9px; }
    .mv-tyre__add{ display:flex; gap:6px; margin-bottom:10px; }
    .mv-tc{ flex:1; padding:8px 0; border-radius:6px; cursor:pointer; border:1px solid rgba(255,255,255,.14);
      background:transparent; color:#f3f4f8; font-family:var(--mvmono); font-size:11px; font-weight:700; transition:.2s; }
    .mv-tc:hover{ transform:translateY(-2px); }
    .mv-tc[data-c="S"]{ border-color:#ff2e2e; } .mv-tc[data-c="M"]{ border-color:#ffd23d; } .mv-tc[data-c="H"]{ border-color:#e9e9ee; }
    .mv-tyre__bar{ display:flex; height:18px; border-radius:4px; overflow:hidden; background:rgba(255,255,255,.06); margin-bottom:8px; }
    .mv-tyre__bar i{ display:block; height:100%; }
    .mv-tyre__row{ display:flex; justify-content:space-between; font-size:11px; color:#c9ccd8; }
    .mv-tyre__row b{ color:var(--orange,#ff6a00); }
    .mv-tyre__reset{ width:100%; margin-top:9px; padding:7px; border-radius:6px; cursor:pointer;
      border:1px solid rgba(255,255,255,.15); background:transparent; color:#8b8fa3;
      font-family:var(--mvmono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; }
    @media (max-width:760px){ .mv-tyre{ left:auto; right:10px; bottom:120px; } }
  `);

  const panel = document.createElement('div');
  panel.className = 'mv-tyre';
  panel.innerHTML = `
    <div class="mv-tyre__h">Tyre strategy · ${LAPS} laps</div>
    <div class="mv-tyre__add">
      <button class="mv-tc" data-c="S">S</button>
      <button class="mv-tc" data-c="M">M</button>
      <button class="mv-tc" data-c="H">H</button>
    </div>
    <div class="mv-tyre__bar" id="mvTyBar"></div>
    <div class="mv-tyre__row"><span>Stops</span><b id="mvTyStops">0</b></div>
    <div class="mv-tyre__row"><span>Est. delta</span><b id="mvTyDelta">—</b></div>
    <button class="mv-tyre__reset" id="mvTyReset">Clear strategy</button>`;
  document.body.appendChild(panel);

  const btn = window.mvDockBtn('TYR', 'Tyre strategy', '◉');
  window.mvDock().appendChild(btn);
  btn.addEventListener('click', () => { panel.classList.toggle('open'); btn.classList.toggle('on'); });

  let stints = [];
  const bar = panel.querySelector('#mvTyBar');
  const render = () => {
    const totalLife = stints.reduce((a, c) => a + COMPOUNDS[c].life, 0) || 1;
    bar.innerHTML = stints.map(c => {
      const w = (COMPOUNDS[c].life / totalLife) * 100;
      return `<i style="width:${w}%;background:${COMPOUNDS[c].col}"></i>`;
    }).join('');
    panel.querySelector('#mvTyStops').textContent = Math.max(stints.length - 1, 0);
    // crude delta: base pace cost per stint compound + pit losses, vs ideal all-soft 1-stop
    if (stints.length < 2) { panel.querySelector('#mvTyDelta').textContent = stints.length ? 'Need ≥2 stints' : '—'; return; }
    const covered = totalLife;
    const paceCost = stints.reduce((a, c) => a + COMPOUNDS[c].pace * (LAPS / stints.length), 0);
    const pits = (stints.length - 1) * PIT_LOSS;
    const ok = covered >= LAPS;
    const delta = paceCost + pits;
    panel.querySelector('#mvTyDelta').textContent = (ok ? '+' : '⚠ short · +') + delta.toFixed(1) + 's';
  };
  panel.querySelectorAll('.mv-tc').forEach(b => b.addEventListener('click', () => {
    if (stints.length < 5) { stints.push(b.dataset.c); render(); }
  }));
  panel.querySelector('#mvTyReset').addEventListener('click', () => { stints = []; render(); });
  render();
})();
