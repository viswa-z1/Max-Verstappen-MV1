/* ════════ FEATURE 72 · BUTTON GLOW-FOLLOW ════════
   The primary buttons get a soft highlight that tracks the cursor across
   their surface — eased with GSAP for a smooth, liquid feel. */
(() => {
  if (window.__mvBtnGlow) return; window.__mvBtnGlow = 1;
  if (!window.gsap || matchMedia('(hover: none)').matches) return;

  window.mvInject && window.mvInject('mv-btnglow-css', `
    .mv-glowable{ position:relative; overflow:hidden; }
    .mv-glow{ position:absolute; width:120px; height:120px; margin:-60px 0 0 -60px; border-radius:50%;
      background:radial-gradient(circle, rgba(255,255,255,.5), transparent 65%); pointer-events:none;
      opacity:0; mix-blend-mode:soft-light; z-index:0; }
    .mv-glowable > span{ position:relative; z-index:1; }
  `);

  const wire = (btn) => {
    if (btn.dataset.glow) return; btn.dataset.glow = '1';
    btn.classList.add('mv-glowable');
    const g = document.createElement('span'); g.className = 'mv-glow'; btn.appendChild(g);
    const x = gsap.quickTo(g, 'x', { duration: .4, ease: 'power3' });
    const y = gsap.quickTo(g, 'y', { duration: .4, ease: 'power3' });
    btn.addEventListener('pointerenter', () => gsap.to(g, { opacity: 1, duration: .3 }));
    btn.addEventListener('pointerleave', () => gsap.to(g, { opacity: 0, duration: .3 }));
    btn.addEventListener('pointermove', e => { const r = btn.getBoundingClientRect(); x(e.clientX - r.left); y(e.clientY - r.top); });
  };
  const run = () => document.querySelectorAll('.btn--primary, .nav__cta, .lid__btn').forEach(wire);
  if (document.readyState === 'complete') setTimeout(run, 80);
  else addEventListener('load', () => setTimeout(run, 80));
})();
