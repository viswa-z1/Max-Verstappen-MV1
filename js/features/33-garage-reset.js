/* ════════ FEATURE 33 · RESET GARAGE ════════
   Clears every saved preference this site stores (livery, session, votes,
   best times, high-contrast) and reloads to a clean slate. Asks first. */
(() => {
  if (window.__mvReset) return; window.__mvReset = 1;
  if (!window.mvDock) return;

  const btn = window.mvDockBtn('RESET', 'Reset garage', '⟳');
  window.mvDock().appendChild(btn);
  btn.addEventListener('click', () => {
    const ok = confirm('Reset the garage? This clears your livery, votes, best lap, reaction time and other saved settings on this device.');
    if (!ok) return;
    Object.keys(localStorage).filter(k => k.startsWith('mv-')).forEach(k => localStorage.removeItem(k));
    location.reload();
  });
})();
