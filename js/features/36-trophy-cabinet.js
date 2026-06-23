/* ════════ FEATURE 36 · TROPHY CABINET ════════
   A championship cabinet — four trophies that rise into view on scroll,
   with a count-up of the title tally. Injected before the footer. */
(() => {
  if (window.__mvTrophy) return; window.__mvTrophy = 1;
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const TITLES = [
    ['2021', 'Maiden crown'], ['2022', 'Dominant defence'],
    ['2023', 'Record season'], ['2024', 'Four in a row']
  ];
  const trophy = `<svg class="mvtr__cup" viewBox="0 0 64 84" aria-hidden="true">
    <defs><linearGradient id="mvGold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe39a"/><stop offset=".5" stop-color="#f5b942"/><stop offset="1" stop-color="#b9791b"/>
    </linearGradient></defs>
    <path d="M16 8h32v6c0 14-7 22-16 22S16 28 16 14z" fill="url(#mvGold)"/>
    <path d="M16 12c-8 0-12-2-12-8h6c0 3 3 4 6 4zM48 12c8 0 12-2 12-8h-6c0 3-3 4-6 4z" fill="url(#mvGold)"/>
    <rect x="29" y="36" width="6" height="14" fill="url(#mvGold)"/>
    <path d="M20 50h24l-3 10H23z" fill="url(#mvGold)"/>
    <rect x="16" y="60" width="32" height="6" rx="2" fill="#2a2010"/>
  </svg>`;

  window.mvInject && window.mvInject('mv-trophy-css', `
    .mvtr{ position:relative; z-index:5; background:var(--ink); border-top:1px solid var(--line);
      padding:clamp(5rem,12vh,9rem) clamp(1.2rem,5vw,5rem); text-align:center; }
    .mvtr__count{ font-family:'Anton',sans-serif; font-size:clamp(4rem,14vw,11rem); line-height:.85; }
    .mvtr__count em{ color:var(--orange,#ff6a00); font-style:normal; }
    .mvtr__sub{ color:var(--muted); letter-spacing:.2em; text-transform:uppercase; font-size:.85rem; margin-top:.4rem; }
    .mvtr__grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; max-width:780px; margin:clamp(2.5rem,6vh,4rem) auto 0; }
    .mvtr__card{ background:linear-gradient(160deg,var(--card-2),var(--card)); border:1px solid var(--line);
      border-radius:10px; padding:1.6rem .8rem 1.2rem; opacity:0; transform:translateY(40px); }
    .mvtr__cup{ width:clamp(46px,7vw,64px); height:auto; filter:drop-shadow(0 8px 16px rgba(245,185,66,.3)); }
    .mvtr__yr{ font-family:'Anton',sans-serif; font-size:1.4rem; margin-top:.7rem; }
    .mvtr__lbl{ color:var(--muted); font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; margin-top:.2rem; }
    @media (max-width:620px){ .mvtr__grid{ grid-template-columns:repeat(2,1fr); } }
  `);

  const sec = document.createElement('section');
  sec.className = 'mvtr'; sec.id = 'trophies';
  sec.innerHTML = `
    <p class="section-label" style="justify-content:center"><span class="dot"></span> The Cabinet</p>
    <div class="mvtr__count"><em id="mvTrN">0</em>× WORLD CHAMPION</div>
    <p class="mvtr__sub">Drivers' titles · and counting</p>
    <div class="mvtr__grid">${TITLES.map(([y, l]) =>
      `<div class="mvtr__card">${trophy}<div class="mvtr__yr">${y}</div><div class="mvtr__lbl">${l}</div></div>`).join('')}</div>`;
  footer.parentNode.insertBefore(sec, footer);

  const cards = [...sec.querySelectorAll('.mvtr__card')];
  const numEl = sec.querySelector('#mvTrN');
  if (window.gsap) {
    cards.forEach((c, i) => gsap.to(c, { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)',
      scrollTrigger: { trigger: '.mvtr__grid', start: 'top 82%' }, delay: i * .12 }));
    ScrollTrigger.create({ trigger: '.mvtr__count', start: 'top 85%', once: true, onEnter: () => {
      const o = { v: 0 }; gsap.to(o, { v: TITLES.length, duration: 1.2, ease: 'power2.out', onUpdate: () => numEl.textContent = Math.round(o.v) });
    }});
    ScrollTrigger.refresh();
  } else { cards.forEach(c => { c.style.opacity = 1; c.style.transform = 'none'; }); numEl.textContent = TITLES.length; }
})();
