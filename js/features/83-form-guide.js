/* ════════ FEATURE 83 · FORM GUIDE ════════
   A "last five rounds" strip — finishing-position chips rise into place on
   scroll, taller bars for better results. Injected before the footer. */
(() => {
  if (window.__mvForm) return; window.__mvForm = 1;
  const footer = document.querySelector('.footer');
  if (!footer || !window.gsap) return;

  // P-finish per recent round (1 = win). Illustrative.
  const ROUNDS = [['Austria', 1], ['Britain', 2], ['Hungary', 1], ['Netherlands', 1], ['Italy', 3]];

  window.mvInject && window.mvInject('mv-form-css', `
    .mvform{ position:relative; z-index:5; background:var(--ink); border-top:1px solid var(--line);
      padding:clamp(4rem,9vh,7rem) clamp(1.2rem,5vw,5rem); }
    .mvform__head{ margin-bottom:clamp(1.6rem,4vh,2.4rem); }
    .mvform__grid{ display:grid; grid-template-columns:repeat(5,1fr); gap:1rem; max-width:720px; align-items:end; }
    .mvform__col{ text-align:center; }
    .mvform__bar{ height:140px; display:flex; align-items:flex-end; }
    .mvform__bar i{ display:block; width:100%; border-radius:6px 6px 0 0; transform-origin:bottom; transform:scaleY(0);
      background:linear-gradient(var(--orange,#ff6a00), #7a1f00); }
    .mvform__pos{ font-family:'Anton',sans-serif; font-size:1.4rem; margin-top:.5rem; }
    .mvform__pos em{ color:var(--orange,#ff6a00); font-style:normal; }
    .mvform__gp{ color:var(--muted); font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; }
    @media (max-width:560px){ .mvform__bar{ height:100px; } }
  `);

  const max = 4; // bar height scales by (max - pos + 1)
  const sec = document.createElement('section');
  sec.className = 'mvform'; sec.id = 'form';
  sec.innerHTML = `
    <div class="mvform__head">
      <p class="section-label"><span class="dot"></span> Form guide</p>
      <h2 class="section-title">LAST FIVE <em>ROUNDS</em></h2>
    </div>
    <div class="mvform__grid">${ROUNDS.map(([gp, p]) => `
      <div class="mvform__col">
        <div class="mvform__bar"><i data-h="${Math.max((max - p + 1) / max, .25)}"></i></div>
        <div class="mvform__pos">P<em>${p}</em></div>
        <div class="mvform__gp">${gp}</div>
      </div>`).join('')}</div>`;
  footer.parentNode.insertBefore(sec, footer);

  gsap.to(sec.querySelectorAll('.mvform__bar i'), {
    scaleY: (i, el) => +el.dataset.h, ease: 'power3.out', duration: 0.9, stagger: 0.1,
    scrollTrigger: { trigger: '.mvform__grid', start: 'top 82%' }
  });
  ScrollTrigger.refresh();
})();
