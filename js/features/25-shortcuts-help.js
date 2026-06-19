/* ════════ FEATURE 25 · SHORTCUTS HELP ════════
   Press ? (or the dock button) for a cheat sheet of every keyboard control
   and hidden interaction on the page. */
(() => {
  if (window.__mvHelp) return; window.__mvHelp = 1;

  const ROWS = [
    ['/', 'Open the command palette'],
    ['⌘ / Ctrl + K', 'Open the command palette'],
    ['?', 'Show this shortcuts sheet'],
    ['↑ ↑ ↓ ↓ ← → ← → B A', 'Activate DRS boost'],
    ['Esc', 'Close any open panel'],
    ['Click a photo', 'Inspect it full-screen'],
    ['Scroll', 'Drives the lap counter, telemetry & dashboard']
  ];

  window.mvInject && window.mvInject('mv-help-css', `
    .mv-help{ position:fixed; inset:0; z-index:9992; display:none; align-items:center; justify-content:center;
      padding:5vmin; background:rgba(4,5,9,.7); backdrop-filter:blur(6px); }
    .mv-help.open{ display:flex; }
    .mv-help__box{ width:min(460px,92vw); background:rgba(12,14,22,.97); border:1px solid rgba(255,255,255,.14);
      border-radius:12px; padding:22px; font-family:var(--mvmono); box-shadow:0 30px 80px rgba(0,0,0,.6); }
    .mv-help__h{ font-family:'Anton',sans-serif; font-size:24px; letter-spacing:.04em; text-transform:uppercase; margin-bottom:4px; }
    .mv-help__sub{ font-size:10px; letter-spacing:.2em; color:var(--orange,#ff6a00); text-transform:uppercase; margin-bottom:16px; }
    .mv-help__r{ display:flex; justify-content:space-between; gap:16px; align-items:center; padding:9px 0; border-top:1px solid rgba(255,255,255,.08); }
    .mv-help__k{ font-size:11px; color:#f3f4f8; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12);
      border-radius:5px; padding:4px 8px; white-space:nowrap; }
    .mv-help__d{ font-size:12px; color:#8b8fa3; text-align:right; }
    .mv-help__x{ margin-top:16px; width:100%; padding:9px; border-radius:6px; cursor:pointer; border:1px solid rgba(255,255,255,.15);
      background:transparent; color:#f3f4f8; font-family:var(--mvmono); font-size:11px; letter-spacing:.12em; text-transform:uppercase; }
  `);

  const root = document.createElement('div');
  root.className = 'mv-help'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true');
  root.innerHTML = `<div class="mv-help__box">
    <div class="mv-help__h">Pit-wall controls</div>
    <div class="mv-help__sub">Keyboard &amp; hidden interactions</div>
    ${ROWS.map(([k, d]) => `<div class="mv-help__r"><span class="mv-help__k">${k}</span><span class="mv-help__d">${d}</span></div>`).join('')}
    <button class="mv-help__x" id="mvHelpX">Got it</button></div>`;
  document.body.appendChild(root);

  const open = () => root.classList.add('open');
  const close = () => root.classList.remove('open');
  root.querySelector('#mvHelpX').addEventListener('click', close);
  root.addEventListener('click', e => { if (e.target === root) close(); });
  addEventListener('keydown', e => {
    if (e.key === 'Escape') return close();
    if (e.key === '?' && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName || '')) { e.preventDefault(); root.classList.contains('open') ? close() : open(); }
  });

  if (window.mvDock) { const b = window.mvDockBtn('HELP', 'Shortcuts', '⌘'); window.mvDock().appendChild(b); b.addEventListener('click', open); }
})();
