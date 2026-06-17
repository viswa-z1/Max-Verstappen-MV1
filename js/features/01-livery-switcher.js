/* ════════ FEATURE 01 · LIVERY SWITCHER ════════
   Recolour the site's accent to a team livery. Pit-wall dock control.
   Choice persists in localStorage. */
(() => {
  if (window.__mvLivery) return; window.__mvLivery = 1;

  const LIVERIES = [
    { id: 'mv',  name: 'Verstappen', a: '#ff6a00', b: '#ff8a2b' },
    { id: 'rbr', name: 'Red Bull',   a: '#3651e0', b: '#5b73ff' },
    { id: 'fer', name: 'Ferrari',    a: '#e8112d', b: '#ff3b54' },
    { id: 'mcl', name: 'McLaren',    a: '#ff8000', b: '#ffa033' },
    { id: 'mer', name: 'Mercedes',   a: '#00d2be', b: '#3fe8d8' }
  ];

  injectStyle('mv-livery-css', `
    .mv-pop{ position:fixed; left:18px; bottom:74px; z-index:301; display:none;
      flex-direction:column; gap:6px; padding:10px; min-width:190px;
      background:rgba(10,12,20,.92); backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,.12); border-radius:8px;
      box-shadow:0 18px 50px rgba(0,0,0,.5); font-family:var(--mvmono); }
    .mv-pop.open{ display:flex; }
    .mv-pop__h{ font-size:9px; letter-spacing:.22em; color:#8b8fa3; text-transform:uppercase; margin:2px 4px 4px; }
    .mv-liv{ display:flex; align-items:center; gap:10px; padding:7px 8px; border-radius:6px;
      background:transparent; border:0; cursor:pointer; color:#f3f4f8; text-align:left;
      font-family:var(--mvmono); font-size:12px; letter-spacing:.04em; transition:background .2s; }
    .mv-liv:hover{ background:rgba(255,255,255,.07); }
    .mv-liv__dot{ width:14px; height:14px; border-radius:50%; box-shadow:0 0 10px currentColor; flex:0 0 auto; }
    .mv-liv[aria-pressed="true"]{ background:rgba(255,255,255,.1); }
    .mv-liv[aria-pressed="true"]::after{ content:'●'; margin-left:auto; color:var(--orange); }
  `);

  const dock = mvDock();
  const btn = mvDockBtn('LIV', 'Livery', '◈');
  const pop = document.createElement('div');
  pop.className = 'mv-pop';
  pop.innerHTML = `<div class="mv-pop__h">Select team livery</div>` +
    LIVERIES.map(l => `<button class="mv-liv" data-id="${l.id}">
      <span class="mv-liv__dot" style="color:${l.a};background:${l.a}"></span>${l.name}</button>`).join('');
  document.body.appendChild(pop);
  dock.appendChild(btn);

  const apply = (id, save = true) => {
    const l = LIVERIES.find(x => x.id === id) || LIVERIES[0];
    const r = document.documentElement.style;
    r.setProperty('--orange', l.a);
    r.setProperty('--orange-bright', l.b);
    pop.querySelectorAll('.mv-liv').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === l.id));
    if (save) localStorage.setItem('mv-livery', l.id);
  };

  btn.addEventListener('click', e => { e.stopPropagation(); pop.classList.toggle('open'); });
  pop.addEventListener('click', e => {
    const b = e.target.closest('.mv-liv'); if (!b) return;
    apply(b.dataset.id); pop.classList.remove('open');
  });
  document.addEventListener('click', e => { if (!pop.contains(e.target) && e.target !== btn) pop.classList.remove('open'); });

  apply(localStorage.getItem('mv-livery') || 'mv', false);

  /* ── shared pit-wall dock helpers (idempotent across features) ── */
  function mvDock() {
    let d = document.getElementById('mv-dock');
    if (!d) {
      d = document.createElement('div'); d.id = 'mv-dock';
      document.body.appendChild(d);
      injectStyle('mv-dock-css', `
        :root{ --mvmono: ui-monospace,'SF Mono',Menlo,Consolas,monospace; }
        #mv-dock{ position:fixed; left:18px; bottom:18px; z-index:300; display:flex; flex-direction:column; gap:8px; }
        .mv-dbtn{ width:50px; height:50px; display:flex; flex-direction:column; align-items:center;
          justify-content:center; gap:2px; cursor:pointer; color:#f3f4f8;
          background:rgba(10,12,20,.85); backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,.12); border-radius:8px; font-family:var(--mvmono);
          transition:border-color .2s, background .2s, transform .2s; position:relative; }
        .mv-dbtn::before{ content:''; position:absolute; top:6px; left:50%; transform:translateX(-50%);
          width:14px; height:2px; border-radius:2px; background:var(--orange,#ff6a00); opacity:.5; }
        .mv-dbtn:hover{ border-color:var(--orange,#ff6a00); transform:translateY(-2px); }
        .mv-dbtn.on{ background:var(--orange,#ff6a00); color:#160a00; }
        .mv-dbtn__i{ font-size:15px; line-height:1; }
        .mv-dbtn__l{ font-size:8px; letter-spacing:.12em; }
        @media (max-width:760px){ #mv-dock{ transform:scale(.86); transform-origin:bottom left; } }
        @media (prefers-reduced-motion:reduce){ .mv-dbtn{ transition:none; } }
      `);
    }
    return d;
  }
  function mvDockBtn(code, label, icon) {
    const b = document.createElement('button');
    b.className = 'mv-dbtn'; b.title = label;
    b.innerHTML = `<span class="mv-dbtn__i">${icon}</span><span class="mv-dbtn__l">${code}</span>`;
    return b;
  }
  function injectStyle(id, css) {
    if (document.getElementById(id)) return;
    const s = document.createElement('style'); s.id = id; s.textContent = css; document.head.appendChild(s);
  }
  window.mvDock = mvDock; window.mvDockBtn = mvDockBtn; window.mvInject = injectStyle;
})();
