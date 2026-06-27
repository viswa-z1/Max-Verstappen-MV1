/* ════════ FEATURE 63 · CHEQUERED FLAG WAVE ════════
   A chequered flag ripples above the footer call-to-action — an SVG grid
   with a GSAP wave running through its squares. */
(() => {
  if (window.__mvFlag) return; window.__mvFlag = 1;
  const cta = document.querySelector('.footer__cta');
  if (!cta || !window.gsap) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.mvInject && window.mvInject('mv-flag-css', `
    .mv-flag{ width:120px; height:auto; margin:0 auto 1.4rem; display:block; }
    .mv-flag rect.d{ fill:#f3f4f8; } .mv-flag rect.l{ fill:#0a0c16; }
  `);

  const cols = 8, rows = 5, s = 14;
  let cells = '';
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++)
    cells += `<rect class="${(x + y) % 2 ? 'd' : 'l'}" data-c="${x}" x="${x * s}" y="${y * s}" width="${s}" height="${s}"/>`;
  const svg = document.createElement('div');
  svg.innerHTML = `<svg class="mv-flag" viewBox="0 0 ${cols * s} ${rows * s}" aria-hidden="true">${cells}</svg>`;
  const flag = svg.firstElementChild;
  cta.insertBefore(flag, cta.firstChild);

  if (!reduce) {
    gsap.set(flag, { transformPerspective: 400 });
    gsap.to(flag.querySelectorAll('rect'), {
      y: '+=3', duration: .9, ease: 'sine.inOut', yoyo: true, repeat: -1,
      stagger: { each: 0.04, from: 'start', axis: 'x', grid: [rows, cols] }
    });
  }
})();
