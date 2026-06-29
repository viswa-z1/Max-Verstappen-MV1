/* ════════ FEATURE 68 · DOCK TOOLTIPS ════════
   Smooth labels for the instrument dock — a tooltip eases in beside each
   button on hover instead of the browser's default title popup. */
(() => {
  if (window.__mvTip) return; window.__mvTip = 1;
  if (!window.gsap || matchMedia('(hover: none)').matches) return;

  window.mvInject && window.mvInject('mv-tip-css', `
    .mv-tip{ position:fixed; z-index:9989; pointer-events:none; padding:6px 11px; border-radius:6px;
      background:rgba(10,12,20,.95); border:1px solid rgba(255,255,255,.16); color:#f3f4f8;
      font-family:var(--mvmono,monospace); font-size:11px; letter-spacing:.08em; white-space:nowrap;
      box-shadow:0 8px 24px rgba(0,0,0,.5); opacity:0; }
    .mv-tip b{ color:var(--orange,#ff6a00); }
  `);
  const tip = document.createElement('div'); tip.className = 'mv-tip'; document.body.appendChild(tip);

  const bind = () => document.querySelectorAll('#mv-dock .mv-dbtn').forEach(btn => {
    if (btn.dataset.tip) return; btn.dataset.tip = '1';
    const label = btn.getAttribute('title') || btn.querySelector('.mv-dbtn__l')?.textContent || '';
    btn.removeAttribute('title');                       // suppress native tooltip
    btn.addEventListener('pointerenter', () => {
      tip.innerHTML = label;
      const r = btn.getBoundingClientRect();
      gsap.set(tip, { top: r.top + r.height / 2, left: r.right + 12, yPercent: -50 });
      gsap.fromTo(tip, { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: .25, ease: 'power3.out' });
    });
    btn.addEventListener('pointerleave', () => gsap.to(tip, { opacity: 0, duration: .15 }));
  });
  if (document.readyState === 'complete') setTimeout(bind, 80);
  else addEventListener('load', () => setTimeout(bind, 80));
})();
