/* ════════ FEATURE 16 · DAY / NIGHT SESSION ════════
   Switch the page between a day race and a night race. Night drops a cool
   twilight wash over the whole page (HUD stays readable). Choice persists. */
(() => {
  if (window.__mvSession) return; window.__mvSession = 1;
  if (!window.mvDock) return;

  window.mvInject('mv-session-css', `
    .mv-night{ position:fixed; inset:0; z-index:90; pointer-events:none; opacity:0; transition:opacity .8s ease;
      background:
        radial-gradient(80% 60% at 50% -10%, rgba(40,70,160,.30), transparent 60%),
        linear-gradient(to bottom, rgba(6,10,30,.45), rgba(2,4,12,.62)); }
    .mv-night.on{ opacity:1; }
  `);

  const overlay = document.createElement('div');
  overlay.className = 'mv-night';
  document.body.appendChild(overlay);

  const btn = window.mvDockBtn('DAY', 'Day / night session', '☀');
  window.mvDock().appendChild(btn);

  const set = (night, save = true) => {
    overlay.classList.toggle('on', night);
    btn.querySelector('.mv-dbtn__i').textContent = night ? '☾' : '☀';
    btn.querySelector('.mv-dbtn__l').textContent = night ? 'NGT' : 'DAY';
    btn.classList.toggle('on', night);
    if (save) localStorage.setItem('mv-session', night ? 'night' : 'day');
  };
  btn.addEventListener('click', () => set(!overlay.classList.contains('on')));
  set(localStorage.getItem('mv-session') === 'night', false);
})();
