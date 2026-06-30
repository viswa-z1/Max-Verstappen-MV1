/* ════════ FEATURE 81 · BROADCAST MODE ════════
   A retro TV-broadcast filter — faint scanlines and a slow flicker over the
   whole page, like a vintage race feed. Toggle from the dock; persists. */
(() => {
  if (window.__mvScan) return; window.__mvScan = 1;
  if (!window.mvDock) return;

  window.mvInject('mv-scan-css', `
    .mv-scan{ position:fixed; inset:0; z-index:9984; pointer-events:none; opacity:0; transition:opacity .4s;
      background:repeating-linear-gradient(to bottom, rgba(0,0,0,.18) 0, rgba(0,0,0,.18) 1px, transparent 2px, transparent 3px);
      mix-blend-mode:multiply; }
    .mv-scan::after{ content:''; position:absolute; inset:0; background:rgba(255,138,43,.04); animation:mvFlicker 3s steps(2) infinite; }
    body.mv-broadcast .mv-scan{ opacity:1; }
    @keyframes mvFlicker{ 0%,100%{opacity:.4} 50%{opacity:.9} }
  `);
  const layer = document.createElement('div'); layer.className = 'mv-scan'; document.body.appendChild(layer);

  const btn = window.mvDockBtn('CRT', 'Broadcast mode', '📺');
  window.mvDock().appendChild(btn);
  const set = (on, save = true) => {
    document.body.classList.toggle('mv-broadcast', on); btn.classList.toggle('on', on);
    if (save) localStorage.setItem('mv-broadcast', on ? '1' : '0');
  };
  btn.addEventListener('click', () => set(!document.body.classList.contains('mv-broadcast')));
  set(localStorage.getItem('mv-broadcast') === '1', false);
})();
