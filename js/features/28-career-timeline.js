/* ════════ FEATURE 28 · CAREER TIMELINE ════════
   A scroll-revealed milestone ladder, injected before the footer. Facts
   only, kept short. The line draws down as each year reveals. */
(() => {
  if (window.__mvTl) return; window.__mvTl = 1;
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const ITEMS = [
    ['2015', 'F1 debut', 'Becomes the youngest driver ever to start a Grand Prix.'],
    ['2016', 'First win', 'Wins on his Red Bull debut in Spain — youngest race winner in history.'],
    ['2021', 'First world title', 'Takes the drivers’ championship after a season-long fight.'],
    ['2022', 'Back-to-back', 'Defends the crown with a record haul of wins in a season.'],
    ['2023', 'Record breaker', 'Rewrites the record books with the most wins in a single year.'],
    ['2024', 'Four in a row', 'Joins the short list of four-time world champions.']
  ];

  window.mvInject && window.mvInject('mv-tl-css', `
    .mvtl{ position:relative; z-index:5; background:var(--bg); padding:clamp(5rem,12vh,9rem) clamp(1.2rem,5vw,5rem); }
    .mvtl__head{ margin-bottom:clamp(2.5rem,6vh,4rem); }
    .mvtl__list{ position:relative; max-width:760px; margin-left:auto; margin-right:auto; }
    .mvtl__line{ position:absolute; left:84px; top:0; bottom:0; width:2px; background:rgba(255,255,255,.1); }
    .mvtl__line i{ position:absolute; left:0; top:0; width:100%; height:0; background:var(--orange,#ff6a00); box-shadow:0 0 12px var(--orange,#ff6a00); }
    .mvtl__row{ position:relative; display:grid; grid-template-columns:84px 1fr; gap:28px; padding:18px 0;
      opacity:0; transform:translateY(28px); }
    .mvtl__yr{ font-family:'Anton',sans-serif; font-size:clamp(1.4rem,3vw,2.1rem); color:var(--orange,#ff6a00); line-height:1; }
    .mvtl__dot{ position:absolute; left:78px; top:24px; width:14px; height:14px; border-radius:50%;
      background:var(--bg); border:2px solid var(--orange,#ff6a00); }
    .mvtl__t{ font-family:var(--font-display); font-size:1.3rem; text-transform:uppercase; letter-spacing:.02em; }
    .mvtl__d{ color:var(--muted); margin-top:4px; font-size:1rem; max-width:48ch; }
    @media (max-width:560px){ .mvtl__line,.mvtl__dot{ left:54px; } .mvtl__row{ grid-template-columns:54px 1fr; gap:16px; } }
  `);

  const sec = document.createElement('section');
  sec.className = 'mvtl'; sec.id = 'timeline';
  sec.innerHTML = `
    <div class="mvtl__head">
      <p class="section-label"><span class="dot"></span> The Climb</p>
      <h2 class="section-title">CAREER <em>MILESTONES</em></h2>
    </div>
    <div class="mvtl__list">
      <div class="mvtl__line"><i id="mvTlFill"></i></div>
      ${ITEMS.map(([y, t, d]) => `<div class="mvtl__row"><div class="mvtl__yr">${y}</div>
        <div><div class="mvtl__t">${t}</div><div class="mvtl__d">${d}</div></div>
        <span class="mvtl__dot"></span></div>`).join('')}
    </div>`;
  footer.parentNode.insertBefore(sec, footer);

  const rows = [...sec.querySelectorAll('.mvtl__row')];
  if (window.gsap) {
    rows.forEach(r => gsap.to(r, { opacity: 1, y: 0, duration: .7, ease: 'power3.out',
      scrollTrigger: { trigger: r, start: 'top 86%' } }));
    gsap.to('#mvTlFill', { height: '100%', ease: 'none',
      scrollTrigger: { trigger: '.mvtl__list', start: 'top 70%', end: 'bottom 80%', scrub: true } });
    window.ScrollTrigger && ScrollTrigger.refresh();
  } else { rows.forEach(r => { r.style.opacity = 1; r.style.transform = 'none'; }); }
})();
