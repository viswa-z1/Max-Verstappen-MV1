/* ════════ FEATURE 45 · STACKING CARDS ════════
   A pinned stack where each card scales and dims as the next slides over it
   — a GSAP ScrollTrigger pin + scrub sequence. */
(() => {
  if (window.__mvStack) return; window.__mvStack = 1;
  const footer = document.querySelector('.footer');
  if (!footer || !window.gsap) return;

  const CARDS = [
    ['01', 'The first win', 'A debut victory in Red Bull colours — youngest winner in the sport.', '#ff6a00'],
    ['02', 'Wet-weather masterclass', 'When the rain falls, the gap to the field only grows.', '#1d77c0'],
    ['03', 'The title decider', 'A last-lap pass to seal a maiden world championship.', '#e21133'],
    ['04', 'Record season', 'A year of dominance that rewrote the record books.', '#2c44b0']
  ];

  window.mvInject && window.mvInject('mv-stack-css', `
    .mvstack{ position:relative; z-index:5; background:var(--ink); border-top:1px solid var(--line);
      padding:clamp(4rem,9vh,7rem) clamp(1.2rem,5vw,5rem) 0; }
    .mvstack__head{ max-width:900px; margin:0 auto clamp(1.5rem,4vh,2.5rem); }
    .mvstack__wrap{ position:relative; max-width:880px; margin:0 auto; }
    .mvstack__card{ position:relative; min-height:46vh; border-radius:14px; padding:clamp(1.8rem,4vw,3rem);
      display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden;
      border:1px solid rgba(255,255,255,.1); background:linear-gradient(160deg,var(--card-2),var(--card));
      box-shadow:0 30px 70px rgba(0,0,0,.5); will-change:transform; }
    .mvstack__card::before{ content:''; position:absolute; inset:0; opacity:.16;
      background:radial-gradient(80% 70% at 80% 0%, var(--c), transparent 60%); }
    .mvstack__no{ position:relative; font-family:'Anton',sans-serif; font-size:clamp(3rem,7vw,5rem); color:var(--c); line-height:1; }
    .mvstack__t{ position:relative; font-family:var(--font-display); font-size:clamp(1.6rem,3.4vw,2.6rem);
      text-transform:uppercase; margin-top:.4rem; }
    .mvstack__d{ position:relative; color:var(--muted); margin-top:.6rem; max-width:46ch; font-size:1.05rem; }
  `);

  const sec = document.createElement('section');
  sec.className = 'mvstack'; sec.id = 'drives';
  sec.innerHTML = `
    <div class="mvstack__head">
      <p class="section-label"><span class="dot"></span> Defining drives</p>
      <h2 class="section-title">MADE OF <em>MOMENTS</em></h2>
    </div>
    <div class="mvstack__wrap">${CARDS.map(([no, t, d, c]) =>
      `<div class="mvstack__card" style="--c:${c}"><span class="mvstack__no">${no}</span>
        <span class="mvstack__t">${t}</span><span class="mvstack__d">${d}</span></div>`).join('')}</div>
    <div style="height:30vh"></div>`;
  footer.parentNode.insertBefore(sec, footer);

  const cards = gsap.utils.toArray(sec.querySelectorAll('.mvstack__card'));
  cards.forEach((card, i) => {
    gsap.set(card, { marginTop: i ? '-46vh' : 0 });          // overlap them into a stack
    ScrollTrigger.create({
      trigger: card, start: 'top 64px', end: '+=' + (innerHeight * 0.7),
      pin: i < cards.length - 1, pinSpacing: false, scrub: true,
      animation: i < cards.length - 1
        ? gsap.to(card, { scale: 0.92, opacity: 0.5, filter: 'brightness(.6)', ease: 'none' })
        : null
    });
  });
  ScrollTrigger.refresh();
})();
