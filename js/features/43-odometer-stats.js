/* ════════ FEATURE 43 · ODOMETER STATS ════════
   A "by the numbers" strip where each figure rolls up on reels like a
   trip meter when it scrolls into view (GSAP staggered digit reels). */
(() => {
  if (window.__mvOdo) return; window.__mvOdo = 1;
  const footer = document.querySelector('.footer');
  if (!footer || !window.gsap) return;

  const STATS = [
    [630, 'Career points', '+'], [63, 'Race wins', ''], [44, 'Pole positions', ''], [33, 'Fastest laps', '']
  ];

  window.mvInject && window.mvInject('mv-odo-css', `
    .mvodo{ position:relative; z-index:5; background:var(--ink); border-top:1px solid var(--line);
      padding:clamp(4rem,9vh,7rem) clamp(1.2rem,5vw,5rem); }
    .mvodo__grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line);
      border:1px solid var(--line); max-width:1000px; margin:0 auto; }
    .mvodo__cell{ background:var(--bg); padding:clamp(1.6rem,4vw,2.6rem) 1.2rem; text-align:center; }
    .mvodo__reel{ display:inline-flex; height:1em; overflow:hidden; font-family:'Anton',sans-serif;
      font-size:clamp(2.4rem,6vw,4.6rem); line-height:1; color:var(--white); vertical-align:bottom; }
    .mvodo__suf{ color:var(--orange,#ff6a00); }
    .mvodo__col{ width:.62ch; }
    .mvodo__strip{ display:block; line-height:1; will-change:transform; }
    .mvodo__lbl{ margin-top:.7rem; color:var(--muted); font-size:.78rem; letter-spacing:.14em; text-transform:uppercase; }
    @media (max-width:680px){ .mvodo__grid{ grid-template-columns:repeat(2,1fr); } }
  `);

  const reel = (n) => String(n).split('').map(d =>
    `<span class="mvodo__col"><span class="mvodo__strip">${'0123456789'.split('').map(x => x).join('<br>')}</span></span>`
  ).join('');

  const sec = document.createElement('section');
  sec.className = 'mvodo'; sec.id = 'numbers';
  sec.innerHTML = `
    <p class="section-label" style="justify-content:center"><span class="dot"></span> By the numbers</p>
    <div class="mvodo__grid">${STATS.map(([n, l, s]) => `
      <div class="mvodo__cell">
        <span class="mvodo__reel" data-n="${n}">${reel(n)}</span><span class="mvodo__reel mvodo__suf">${s}</span>
        <div class="mvodo__lbl">${l}</div>
      </div>`).join('')}</div>`;
  footer.parentNode.insertBefore(sec, footer);

  // roll each digit column to its target on enter
  ScrollTrigger.create({
    trigger: '.mvodo__grid', start: 'top 82%', once: true,
    onEnter: () => {
      sec.querySelectorAll('.mvodo__reel[data-n]').forEach(r => {
        const digits = r.dataset.n.split('').map(Number);
        r.querySelectorAll('.mvodo__col').forEach((col, i) => {
          gsap.fromTo(col.querySelector('.mvodo__strip'),
            { yPercent: 0 },
            { yPercent: -(digits[i] * 10), duration: 1.6 + i * 0.25, ease: 'power3.out' });
        });
      });
    }
  });
  ScrollTrigger.refresh();
})();
