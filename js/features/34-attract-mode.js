/* ════════ FEATURE 34 · ATTRACT MODE ════════
   After a stretch of no interaction, the page dims to a quiet standby card
   inviting you back in. Any input dismisses it. Skipped for reduced motion. */
(() => {
  if (window.__mvAttract) return; window.__mvAttract = 1;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const IDLE = 45000;
  window.mvInject && window.mvInject('mv-attract-css', `
    .mv-attract{ position:fixed; inset:0; z-index:9988; display:flex; flex-direction:column;
      align-items:center; justify-content:center; gap:14px; text-align:center; cursor:pointer;
      background:rgba(4,5,9,.78); backdrop-filter:blur(7px); opacity:0; pointer-events:none;
      transition:opacity .8s ease; }
    .mv-attract.show{ opacity:1; pointer-events:auto; }
    .mv-attract__mark{ font-family:'Anton',sans-serif; font-size:clamp(3rem,10vw,7rem); letter-spacing:.04em;
      color:#f3f4f8; }
    .mv-attract__mark span{ color:var(--orange,#ff6a00); }
    .mv-attract__sub{ font-family:var(--mvmono); font-size:11px; letter-spacing:.32em; text-transform:uppercase;
      color:#8b8fa3; animation:mvPulse 1.8s ease-in-out infinite; }
    @keyframes mvPulse{ 0%,100%{opacity:.4} 50%{opacity:1} }
  `);

  const el = document.createElement('div');
  el.className = 'mv-attract'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="mv-attract__mark">MV<span>1</span></div>
    <div class="mv-attract__sub">Standby · tap to continue the drive</div>`;
  document.body.appendChild(el);

  let timer, shown = false;
  const hide = () => { if (shown) { shown = false; el.classList.remove('show'); } };
  const arm = () => {
    clearTimeout(timer);
    if (shown) hide();
    timer = setTimeout(() => {
      // don't ambush an open dialog/panel
      if (document.querySelector('.mv-pal.open, .mv-help.open, .mv-hv.open, .mv-lb.open')) return arm();
      shown = true; el.classList.add('show');
    }, IDLE);
  };
  ['pointermove', 'pointerdown', 'keydown', 'scroll', 'wheel', 'touchstart'].forEach(ev =>
    addEventListener(ev, arm, { passive: true }));
  el.addEventListener('click', arm);
  arm();
})();
