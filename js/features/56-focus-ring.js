/* ════════ FEATURE 56 · FOCUS-FLY RING ════════
   When you navigate by keyboard, an orange ring glides to whatever element
   has focus — a clearer, animated focus indicator. */
(() => {
  if (window.__mvFocus) return; window.__mvFocus = 1;
  if (!window.gsap) return;

  window.mvInject && window.mvInject('mv-focus-css', `
    .mv-focusring{ position:fixed; z-index:9987; pointer-events:none; border:2px solid var(--orange,#ff6a00);
      border-radius:8px; box-shadow:0 0 14px rgba(255,106,0,.5); opacity:0; }
  `);
  const ring = document.createElement('div'); ring.className = 'mv-focusring'; document.body.appendChild(ring);

  let usingKeys = false;
  addEventListener('keydown', e => { if (e.key === 'Tab') usingKeys = true; });
  addEventListener('pointerdown', () => { usingKeys = false; gsap.to(ring, { opacity: 0, duration: .2 }); });

  addEventListener('focusin', e => {
    const el = e.target;
    if (!usingKeys || !el || el === document.body) return;
    const r = el.getBoundingClientRect();
    if (!r.width) return;
    gsap.to(ring, { x: r.left - 4, y: r.top - 4, width: r.width + 8, height: r.height + 8,
      opacity: 1, duration: .3, ease: 'power3.out' });
  });
})();
