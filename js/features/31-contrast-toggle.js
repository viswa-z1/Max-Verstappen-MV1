/* ════════ FEATURE 31 · HIGH CONTRAST ════════
   An accessibility switch that lifts muted text, strengthens borders and
   removes low-opacity background texture for easier reading. Persists. */
(() => {
  if (window.__mvHc) return; window.__mvHc = 1;
  if (!window.mvDock) return;

  window.mvInject('mv-hc-css', `
    body.mv-hc{ --muted:#d2d4de; --steel:#aeb2c4; --line:rgba(255,255,255,.28); }
    body.mv-hc .section-label,body.mv-hc .gp__circuit,body.mv-hc .shot figcaption span,
    body.mv-hc .hero__tag,body.mv-hc .footer__legal{ color:#d2d4de !important; }
    body.mv-hc .nav.scrolled{ background:#06070f; }
    body.mv-hc :focus-visible{ outline:3px solid var(--orange,#ff6a00); outline-offset:2px; }
  `);

  const btn = window.mvDockBtn('HC', 'High contrast', '◐');
  window.mvDock().appendChild(btn);
  const set = (on, save = true) => {
    document.body.classList.toggle('mv-hc', on);
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-pressed', on);
    if (save) localStorage.setItem('mv-hc', on ? '1' : '0');
  };
  btn.addEventListener('click', () => set(!document.body.classList.contains('mv-hc')));
  set(localStorage.getItem('mv-hc') === '1', false);
})();
