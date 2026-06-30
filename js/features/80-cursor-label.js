/* ════════ FEATURE 80 · CURSOR LABEL ════════
   A small action word trails the cursor, naming what a hover will do —
   "View", "Drag", "Go" — eased into place with GSAP. Pointer devices only. */
(() => {
  if (window.__mvCurLabel) return; window.__mvCurLabel = 1;
  if (!window.gsap || matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-curlabel-css', `
    .mv-curlabel{ position:fixed; top:0; left:0; z-index:9998; pointer-events:none; transform:translate(-50%,-50%);
      margin-top:30px; padding:4px 10px; border-radius:30px; background:var(--orange,#ff6a00); color:#1a0c00;
      font-family:var(--mvmono,monospace); font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
      opacity:0; white-space:nowrap; }
  `);
  const el = document.createElement('div'); el.className = 'mv-curlabel'; document.body.appendChild(el);
  const x = gsap.quickTo(el, 'x', { duration: .25, ease: 'power3' });
  const y = gsap.quickTo(el, 'y', { duration: .25, ease: 'power3' });
  addEventListener('pointermove', e => { x(e.clientX); y(e.clientY); }, { passive: true });

  const RULES = [
    ['.hero__photo, .lid__img, #revealImg, #machineImg', 'View'],
    ['.mvcmp__handle, .mvlaunch__knob, .lid__stage, #mvHvStage', 'Drag'],
    ['.mvflip__chip, .mv-dbtn', 'Tap'],
    ['a, button, [data-cursor="hover"], [data-magnetic]', 'Go']
  ];
  const labelFor = (t) => { for (const [sel, txt] of RULES) if (t.closest(sel)) return txt; return null; };
  let cur = null;
  addEventListener('pointerover', e => {
    const txt = labelFor(e.target);
    if (txt === cur) return; cur = txt;
    if (txt) { el.textContent = txt; gsap.to(el, { opacity: 1, duration: .2 }); }
    else gsap.to(el, { opacity: 0, duration: .2 });
  });
})();
