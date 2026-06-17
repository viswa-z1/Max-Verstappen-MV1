/* ════════ FEATURE 10 · PIT-WALL COMMAND PALETTE ════════
   Press "/" or Ctrl/Cmd+K to open a quick switch: jump to any section or
   fire an action. Arrow keys to move, Enter to run, Esc to close. */
(() => {
  if (window.__mvPal) return; window.__mvPal = 1;

  const goto = id => {
    const t = document.getElementById(id); if (!t) return;
    if (window.gsap && window.ScrollToPlugin) gsap.to(window, { duration: 1, ease: 'power3.inOut', scrollTo: { y: t, offsetY: 0 } });
    else t.scrollIntoView({ behavior: 'smooth' });
  };
  const CMDS = [
    { label: 'Go to Start', hint: 'Section', run: () => goto('hero') },
    { label: 'Go to The Champion', hint: 'Section', run: () => goto('reveal') },
    { label: 'Go to Moments reel', hint: 'Section', run: () => goto('gallery') },
    { label: 'Go to On Track', hint: 'Section', run: () => goto('track') },
    { label: 'Go to The Machine', hint: 'Section', run: () => goto('machine') },
    { label: 'Go to Helmets', hint: 'Section', run: () => goto('helmets') },
    { label: 'Go to Schedule', hint: 'Section', run: () => goto('calendar') },
    { label: 'Go to Store', hint: 'Section', run: () => goto('store') },
    { label: 'Go to Feed', hint: 'Section', run: () => goto('social') },
    { label: 'Toggle engine audio', hint: 'Action', run: () => document.querySelector('.mv-dbtn[title="Engine audio"]')?.click() },
    { label: 'Open hot-lap timer', hint: 'Action', run: () => document.querySelector('.mv-dbtn[title="Hot-lap timer"]')?.click() },
    { label: 'Open tyre strategy', hint: 'Action', run: () => document.querySelector('.mv-dbtn[title="Tyre strategy"]')?.click() }
  ];

  window.mvInject && window.mvInject('mv-pal-css', `
    .mv-pal{ position:fixed; inset:0; z-index:9995; display:none; align-items:flex-start; justify-content:center;
      padding-top:14vh; background:rgba(4,5,9,.6); backdrop-filter:blur(6px); }
    .mv-pal.open{ display:flex; }
    .mv-pal__box{ width:min(560px,92vw); background:rgba(12,14,22,.97); border:1px solid rgba(255,255,255,.14);
      border-radius:12px; overflow:hidden; box-shadow:0 30px 80px rgba(0,0,0,.6); font-family:var(--mvmono); }
    .mv-pal__in{ width:100%; padding:16px 18px; background:transparent; border:0; outline:0; color:#f3f4f8;
      font-size:15px; font-family:var(--mvmono); border-bottom:1px solid rgba(255,255,255,.1); }
    .mv-pal__in::placeholder{ color:#6a6e80; }
    .mv-pal__list{ max-height:46vh; overflow:auto; }
    .mv-pal__it{ display:flex; align-items:center; justify-content:space-between; padding:12px 18px; cursor:pointer; }
    .mv-pal__it[aria-selected="true"]{ background:rgba(255,106,0,.14); box-shadow:inset 3px 0 0 var(--orange,#ff6a00); }
    .mv-pal__it span:first-child{ color:#f3f4f8; font-size:13px; }
    .mv-pal__it span:last-child{ color:#8b8fa3; font-size:9px; letter-spacing:.16em; text-transform:uppercase; }
    .mv-pal__hint{ padding:9px 18px; font-size:9px; letter-spacing:.12em; color:#6a6e80; text-transform:uppercase;
      border-top:1px solid rgba(255,255,255,.08); }
  `);

  const root = document.createElement('div');
  root.className = 'mv-pal';
  root.innerHTML = `<div class="mv-pal__box">
    <input class="mv-pal__in" placeholder="Type a section or command…" aria-label="Command palette" />
    <div class="mv-pal__list" id="mvPalList"></div>
    <div class="mv-pal__hint">↑↓ move · ↵ run · esc close</div></div>`;
  document.body.appendChild(root);
  const input = root.querySelector('.mv-pal__in'), list = root.querySelector('#mvPalList');
  let view = [], sel = 0;

  const render = (q = '') => {
    view = CMDS.filter(c => c.label.toLowerCase().includes(q.toLowerCase()));
    sel = 0;
    list.innerHTML = view.map((c, i) =>
      `<div class="mv-pal__it" data-i="${i}" aria-selected="${i === 0}"><span>${c.label}</span><span>${c.hint}</span></div>`).join('')
      || `<div class="mv-pal__it"><span style="color:#6a6e80">No match</span></div>`;
  };
  const move = d => {
    if (!view.length) return; sel = (sel + d + view.length) % view.length;
    [...list.children].forEach((el, i) => el.setAttribute('aria-selected', i === sel));
    list.children[sel]?.scrollIntoView({ block: 'nearest' });
  };
  const open = () => { root.classList.add('open'); input.value = ''; render(); setTimeout(() => input.focus(), 30); };
  const close = () => root.classList.remove('open');
  const exec = () => { const c = view[sel]; close(); c && c.run(); };

  addEventListener('keydown', e => {
    const open_ = root.classList.contains('open');
    if (!open_ && (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'))) {
      if (document.activeElement && /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
      e.preventDefault(); open();
    } else if (open_) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); exec(); }
    }
  });
  input.addEventListener('input', () => render(input.value));
  list.addEventListener('click', e => { const it = e.target.closest('.mv-pal__it'); if (it && it.dataset.i) { sel = +it.dataset.i; exec(); } });
  root.addEventListener('click', e => { if (e.target === root) close(); });
})();
