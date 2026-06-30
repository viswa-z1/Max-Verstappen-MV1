/* ════════ FEATURE 79 · CALM MODE ════════
   One switch to quiet the page — fades out the ambient layers (auroras,
   spotlight, pace car, speed lines) for a calmer, more readable view.
   Persists, and respects users who already prefer reduced motion. */
(() => {
  if (window.__mvCalm) return; window.__mvCalm = 1;
  if (!window.mvDock) return;

  window.mvInject('mv-calm-css', `
    body.mv-calm .mv-heroaur, body.mv-calm .mv-aurora, body.mv-calm .mv-spot,
    body.mv-calm .mv-pace, body.mv-calm .mv-streaks, body.mv-calm .lid__halo,
    body.mv-calm .mv-needle{ opacity:0 !important; transition:opacity .5s ease; }
  `);

  const btn = window.mvDockBtn('CALM', 'Calm mode', '☾');
  window.mvDock().appendChild(btn);
  const set = (on, save = true) => {
    document.body.classList.toggle('mv-calm', on);
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-pressed', on);
    if (save) localStorage.setItem('mv-calm', on ? '1' : '0');
  };
  btn.addEventListener('click', () => set(!document.body.classList.contains('mv-calm')));

  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  set(localStorage.getItem('mv-calm') === '1' || (prefersReduced && localStorage.getItem('mv-calm') === null), false);
})();
