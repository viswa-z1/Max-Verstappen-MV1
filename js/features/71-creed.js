/* ════════ FEATURE 71 · THE CREED ════════
   A short creed where each word lifts and rotates into place on scroll —
   kinetic 3D typography. Injected before the footer. */
(() => {
  if (window.__mvCreed) return; window.__mvCreed = 1;
  const footer = document.querySelector('.footer');
  if (!footer || !window.gsap) return;

  const WORDS = ['NO', 'LIFT.', 'NO', 'LIMITS.', 'NO', 'LOOKING', 'BACK.'];

  window.mvInject && window.mvInject('mv-creed-css', `
    .mvcreed{ position:relative; z-index:5; background:var(--bg); border-top:1px solid var(--line);
      padding:clamp(6rem,16vh,12rem) clamp(1.2rem,5vw,5rem); text-align:center; perspective:800px; }
    .mvcreed__line{ font-family:'Anton',sans-serif; font-size:clamp(2.4rem,8vw,6.5rem); line-height:1;
      text-transform:uppercase; display:flex; flex-wrap:wrap; gap:.25em; justify-content:center; }
    .mvcreed__w{ display:inline-block; transform-style:preserve-3d; }
    .mvcreed__w:nth-child(odd){ color:var(--orange,#ff6a00); }
  `);

  const sec = document.createElement('section');
  sec.className = 'mvcreed'; sec.id = 'creed';
  sec.innerHTML = `<div class="mvcreed__line">${WORDS.map(w => `<span class="mvcreed__w">${w}</span>`).join('')}</div>`;
  footer.parentNode.insertBefore(sec, footer);

  const words = sec.querySelectorAll('.mvcreed__w');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.from(words, {
    yPercent: 120, rotateX: -90, opacity: 0, transformOrigin: '50% 100% -40px',
    ease: 'back.out(1.6)', duration: 0.9, stagger: 0.08,
    scrollTrigger: { trigger: sec, start: 'top 75%' }
  });
  ScrollTrigger.refresh();
})();
