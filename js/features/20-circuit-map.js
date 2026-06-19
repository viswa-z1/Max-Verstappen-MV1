/* ════════ FEATURE 20 · CIRCUIT MAP ════════
   A stylised lap animation. Pick a circuit and watch a marker run the
   racing line. Reduced motion parks the marker on the start line. */
(() => {
  if (window.__mvMap) return; window.__mvMap = 1;
  if (!window.mvDock || !window.mvPanel) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const CIRCUITS = {
    Zandvoort: 'M40 150 C30 90 80 60 120 80 C150 95 150 60 185 55 C230 48 235 110 200 120 C170 128 200 160 160 175 C120 188 60 185 40 150 Z',
    Monza: 'M30 60 L210 60 C230 60 230 95 205 100 L80 110 C60 113 60 140 95 145 L210 150 C232 152 230 180 205 180 L40 180 C28 180 28 60 30 60 Z',
    Spa: 'M40 170 C30 120 70 130 80 100 C90 70 50 55 90 45 C140 33 150 90 180 95 C220 100 230 60 225 110 C222 150 180 140 170 165 C160 188 80 195 40 170 Z'
  };

  window.mvInject('mv-map-css', `
    .mv-map__pick{ display:flex; gap:5px; margin-bottom:10px; }
    .mv-map__pick button{ flex:1; padding:6px 0; border-radius:5px; cursor:pointer; font-family:var(--mvmono);
      font-size:9.5px; letter-spacing:.06em; border:1px solid rgba(255,255,255,.15); background:transparent; color:#c9ccd8; transition:.2s; }
    .mv-map__pick button.on{ border-color:var(--orange,#ff6a00); color:var(--orange,#ff6a00); }
    .mv-map svg{ width:100%; height:auto; display:block; }
    .mv-map__name{ margin-top:8px; font-size:10px; color:#8b8fa3; letter-spacing:.1em; text-transform:uppercase; }
  `);

  const panel = document.createElement('div');
  panel.innerHTML = `<div class="mv-dp__h">Circuit map</div>
    <div class="mv-map__pick" id="mvMapPick"></div>
    <div class="mv-map"><svg viewBox="0 0 250 220">
      <path id="mvMapBase" fill="none" stroke="#2a3050" stroke-width="7" stroke-linejoin="round"/>
      <circle id="mvMapDot" r="6" fill="#fff" stroke="var(--orange,#ff6a00)" stroke-width="3"/>
    </svg></div>
    <div class="mv-map__name" id="mvMapName"></div>`;
  document.body.appendChild(panel);

  const btn = window.mvDockBtn('MAP', 'Circuit map', '⌬');
  window.mvDock().appendChild(btn);
  window.mvPanel(btn, panel);

  const base = panel.querySelector('#mvMapBase'), dot = panel.querySelector('#mvMapDot');
  const pick = panel.querySelector('#mvMapPick'), nameEl = panel.querySelector('#mvMapName');
  pick.innerHTML = Object.keys(CIRCUITS).map(k => `<button data-c="${k}">${k}</button>`).join('');

  let raf, len = 0, prog = 0, current;
  const load = name => {
    current = name; base.setAttribute('d', CIRCUITS[name]);
    pick.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.c === name));
    nameEl.textContent = name + ' · racing line';
    len = base.getTotalLength(); prog = 0;
  };
  const move = () => {
    const p = base.getPointAtLength(prog * len);
    dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y);
  };
  (function loop() {
    if (panel.classList.contains('open') && !reduce) { prog = (prog + 0.0025) % 1; move(); }
    raf = requestAnimationFrame(loop);
  })();
  pick.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { load(b.dataset.c); move(); } });
  load('Zandvoort'); requestAnimationFrame(move);
})();
