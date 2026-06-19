/* ════════ FEATURE 14 · CHAMPIONSHIP STANDINGS ════════
   Drivers' championship snapshot with animated points bars. Opens from
   the dock. Also upgrades the dock into a wrapping instrument rail and
   defines the shared single-open panel behaviour for later modules. */
(() => {
  if (window.__mvStand) return; window.__mvStand = 1;
  if (!window.mvDock) return;

  // dock → wrapping rail, and one-panel-at-a-time behaviour for dock panels
  window.mvInject('mv-dockrail-css', `
    #mv-dock{ display:grid; grid-template-columns:repeat(2,auto); gap:8px; max-height:none; }
    .mv-dock-panel{ position:fixed; left:84px; bottom:18px; z-index:301; display:none; width:248px;
      padding:14px; background:rgba(10,12,20,.93); backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,.12); border-radius:10px; font-family:var(--mvmono);
      box-shadow:0 18px 50px rgba(0,0,0,.5); }
    .mv-dock-panel.open{ display:block; }
    .mv-dp__h{ font-size:9px; letter-spacing:.2em; color:#8b8fa3; text-transform:uppercase; margin-bottom:10px; }
    @media (max-width:760px){ .mv-dock-panel{ left:auto; right:10px; bottom:120px; } }
  `);
  if (!window.mvPanel) window.mvPanel = (btn, panel) => {
    btn.classList.add('mv-pbtn'); panel.classList.add('mv-dock-panel');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const willOpen = !panel.classList.contains('open');
      document.querySelectorAll('.mv-dock-panel.open').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('.mv-pbtn.on').forEach(b => b.classList.remove('on'));
      if (willOpen) { panel.classList.add('open'); btn.classList.add('on'); }
    });
    document.addEventListener('click', e => { if (!panel.contains(e.target) && e.target !== btn) { panel.classList.remove('open'); btn.classList.remove('on'); } });
  };

  window.mvInject('mv-stand-css', `
    .mv-st__row{ display:grid; grid-template-columns:16px 1fr auto; gap:8px; align-items:center; margin-bottom:9px; }
    .mv-st__pos{ font-size:11px; color:#8b8fa3; }
    .mv-st__d{ font-size:11px; color:#f3f4f8; }
    .mv-st__bar{ grid-column:2 / 4; height:5px; border-radius:3px; background:rgba(255,255,255,.08); overflow:hidden; }
    .mv-st__bar i{ display:block; height:100%; width:0; border-radius:3px; transition:width 1s cubic-bezier(.16,1,.3,1); }
    .mv-st__pts{ font-size:11px; color:#c9ccd8; font-variant-numeric:tabular-nums; }
    .mv-st__row.me .mv-st__d{ color:var(--orange,#ff6a00); font-weight:700; }
  `);

  const D = [
    { d: 'M. Verstappen', p: 310, c: 'var(--orange,#ff6a00)', me: 1 },
    { d: 'L. Norris', p: 265, c: '#ff8000' },
    { d: 'C. Leclerc', p: 248, c: '#e8112d' },
    { d: 'O. Piastri', p: 231, c: '#ff8000' },
    { d: 'G. Russell', p: 198, c: '#27f4d2' },
    { d: 'C. Sainz', p: 170, c: '#e8112d' }
  ];
  const max = D[0].p;

  const panel = document.createElement('div');
  panel.innerHTML = `<div class="mv-dp__h">Drivers' championship</div>` + D.map((x, i) => `
    <div class="mv-st__row ${x.me ? 'me' : ''}">
      <span class="mv-st__pos">${i + 1}</span><span class="mv-st__d">${x.d}</span><span class="mv-st__pts">${x.p}</span>
      <div class="mv-st__bar"><i data-w="${(x.p / max) * 100}" style="background:${x.c}"></i></div>
    </div>`).join('');
  document.body.appendChild(panel);

  const btn = window.mvDockBtn('PTS', 'Championship standings', '≣');
  window.mvDock().appendChild(btn);
  window.mvPanel(btn, panel);
  // fill bars when first opened
  let filled = false;
  btn.addEventListener('click', () => {
    if (filled || !panel.classList.contains('open')) return; filled = true;
    requestAnimationFrame(() => panel.querySelectorAll('.mv-st__bar i').forEach(i => i.style.width = i.dataset.w + '%'));
  });
})();
