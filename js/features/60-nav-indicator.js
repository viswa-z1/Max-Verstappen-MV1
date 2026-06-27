/* ════════ FEATURE 60 · NAV INDICATOR ════════
   A little marker glides under the nav link you hover, snapping back to the
   active section when you let go — GSAP quickTo. */
(() => {
  if (window.__mvNavInd) return; window.__mvNavInd = 1;
  if (!window.gsap) return;
  const nav = document.querySelector('.nav__links');
  if (!nav) return;
  const links = [...nav.querySelectorAll('a:not(.nav__cta)')];
  if (!links.length) return;

  window.mvInject && window.mvInject('mv-navind-css', `
    .nav__links{ position:relative; }
    .mv-navind{ position:absolute; bottom:-6px; left:0; height:2px; width:0; background:var(--orange,#ff6a00);
      box-shadow:0 0 8px var(--orange,#ff6a00); opacity:0; }
    .nav__links a:not(.nav__cta)::after{ display:none; }   /* replace the CSS underline */
  `);
  const ind = document.createElement('span'); ind.className = 'mv-navind'; nav.appendChild(ind);

  const xTo = gsap.quickTo(ind, 'x', { duration: .35, ease: 'power3' });
  const wTo = gsap.quickTo(ind, 'width', { duration: .35, ease: 'power3' });
  const moveTo = (a) => {
    const nr = nav.getBoundingClientRect(), r = a.getBoundingClientRect();
    gsap.to(ind, { opacity: 1, duration: .2 }); xTo(r.left - nr.left); wTo(r.width);
  };
  links.forEach(a => a.addEventListener('pointerenter', () => moveTo(a)));
  nav.addEventListener('pointerleave', () => {
    const active = links.find(a => document.querySelector(a.getAttribute('href'))
      && Math.abs(document.querySelector(a.getAttribute('href')).getBoundingClientRect().top) < innerHeight * 0.5);
    if (active) moveTo(active); else gsap.to(ind, { opacity: 0, duration: .2 });
  });
})();
