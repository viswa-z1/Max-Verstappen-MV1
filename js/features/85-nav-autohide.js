/* ════════ FEATURE 85 · NAV AUTO-HIDE ════════
   The header slips out of the way when you scroll down and glides back the
   moment you scroll up — a smooth GSAP slide. */
(() => {
  if (window.__mvNavHide) return; window.__mvNavHide = 1;
  if (!window.gsap) return;
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastY = scrollY, hidden = false;
  const set = (hide) => {
    if (hide === hidden) return; hidden = hide;
    gsap.to(nav, { yPercent: hide ? -130 : 0, duration: .45, ease: 'power3.out' });
  };
  addEventListener('scroll', () => {
    const y = scrollY, dy = y - lastY;
    if (Math.abs(dy) > 6) { set(dy > 0 && y > 240); lastY = y; }
  }, { passive: true });
})();
