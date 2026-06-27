/* ════════ FEATURE 62 · PHOTO MODE ════════
   Fade away every overlay and HUD element for a clean, screenshot-ready
   view — toggle from the dock or press P. A small hint lets you exit. */
(() => {
  if (window.__mvPhoto) return; window.__mvPhoto = 1;
  if (!window.mvDock || !window.gsap) return;

  const HUD = '#mv-dock, .mv-count, .mv-tel, .mv-lapc, .mv-tower, .mv-ers, .mv-box, .scroll-progress, .cursor, .cursor-dot, .mv-needle, .mv-radio, .mv-spot';
  window.mvInject('mv-photo-css', `
    .mv-photo-exit{ position:fixed; left:50%; bottom:20px; transform:translateX(-50%); z-index:9988;
      font-family:var(--mvmono,monospace); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:#fff;
      background:rgba(10,12,20,.85); border:1px solid rgba(255,255,255,.18); border-radius:30px; padding:8px 16px;
      cursor:pointer; opacity:0; pointer-events:none; }
    body.mv-photo .mv-photo-exit{ opacity:1; pointer-events:auto; }
  `);
  const btn = window.mvDockBtn('PHOTO', 'Photo mode', '◳');
  window.mvDock().appendChild(btn);
  const exit = document.createElement('div'); exit.className = 'mv-photo-exit'; exit.textContent = 'Exit photo mode (P)';
  document.body.appendChild(exit);

  let on = false;
  const set = (v) => {
    on = v; document.body.classList.toggle('mv-photo', on);
    gsap.to(HUD, { autoAlpha: on ? 0 : 1, duration: .4, ease: 'power2.out' });
  };
  btn.addEventListener('click', () => set(!on));
  exit.addEventListener('click', () => set(false));
  addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'p' && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName || '')) { e.preventDefault(); set(!on); }
  });
})();
