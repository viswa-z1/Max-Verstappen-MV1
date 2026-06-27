/* ════════ FEATURE 53 · CRUISE CONTROL ════════
   Hands-off touring — toggle auto-scroll and the page eases down the track
   on its own. Any manual scroll, key or click disengages it. */
(() => {
  if (window.__mvCruise) return; window.__mvCruise = 1;
  if (!window.mvDock || !window.gsap || !window.ScrollToPlugin) return;

  const btn = window.mvDockBtn('CRUISE', 'Cruise control', '⛗');
  window.mvDock().appendChild(btn);

  let tween = null;
  const stop = () => { if (tween) { tween.kill(); tween = null; } btn.classList.remove('on'); };
  const start = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const remaining = max - scrollY;
    if (remaining < 40) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    btn.classList.add('on');
    tween = gsap.to(window, { scrollTo: { y: max }, duration: remaining / 90, ease: 'none', onComplete: stop });
  };
  btn.addEventListener('click', () => tween ? stop() : start());
  // disengage on manual intent
  ['wheel', 'touchstart', 'keydown'].forEach(ev => addEventListener(ev, () => { if (tween) stop(); }, { passive: true }));
})();
