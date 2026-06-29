/* ════════ FEATURE 73 · CARD SPOTLIGHT ════════
   A warm highlight follows the cursor across content cards, lighting the one
   you're pointing at — eased with GSAP. Pairs with the existing card tilt. */
(() => {
  if (window.__mvCardSpot) return; window.__mvCardSpot = 1;
  if (!window.gsap || matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-cardspot-css', `
    .mv-spotable{ position:relative; }
    .mv-cardlight{ position:absolute; width:180px; height:180px; margin:-90px 0 0 -90px; border-radius:50%;
      background:radial-gradient(circle, rgba(255,138,43,.32), transparent 60%); pointer-events:none;
      opacity:0; z-index:0; mix-blend-mode:soft-light; }
  `);

  const wire = (card) => {
    if (card.dataset.spot) return; card.dataset.spot = '1';
    if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
    card.classList.add('mv-spotable');
    const g = document.createElement('span'); g.className = 'mv-cardlight'; card.appendChild(g);
    const x = gsap.quickTo(g, 'x', { duration: .45, ease: 'power3' });
    const y = gsap.quickTo(g, 'y', { duration: .45, ease: 'power3' });
    card.addEventListener('pointerenter', () => gsap.to(g, { opacity: 1, duration: .3 }));
    card.addEventListener('pointerleave', () => gsap.to(g, { opacity: 0, duration: .3 }));
    card.addEventListener('pointermove', e => { const r = card.getBoundingClientRect(); x(e.clientX - r.left); y(e.clientY - r.top); });
  };
  const run = () => document.querySelectorAll('.product, .post, .shot, .gp, .mvflip__item').forEach(wire);
  if (document.readyState === 'complete') setTimeout(run, 100);
  else addEventListener('load', () => setTimeout(run, 100));
})();
