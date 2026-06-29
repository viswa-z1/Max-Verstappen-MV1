/* ════════ FEATURE 77 · HERO AURORA ════════
   A slow-drifting colour wash lives behind the hero, giving the opening
   screen subtle ambient motion (GSAP loops). Off for reduced motion. */
(() => {
  if (window.__mvHeroAur) return; window.__mvHeroAur = 1;
  const hero = document.querySelector('.hero');
  if (!hero || !window.gsap) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-heroaur-css', `
    .mv-heroaur{ position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden; filter:blur(70px); opacity:.4; }
    .mv-heroaur b{ position:absolute; display:block; width:44%; height:60%; border-radius:50%; }
    .mv-heroaur .a{ background:radial-gradient(circle, rgba(255,106,0,.7), transparent 62%); left:48%; top:-10%; }
    .mv-heroaur .b{ background:radial-gradient(circle, rgba(27,42,107,.8), transparent 62%); left:18%; top:30%; }
  `);
  const aur = document.createElement('div');
  aur.className = 'mv-heroaur'; aur.innerHTML = '<b class="a"></b><b class="b"></b>';
  hero.insertBefore(aur, hero.firstChild);

  gsap.to(aur.querySelector('.a'), { xPercent: -18, yPercent: 26, duration: 12, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.to(aur.querySelector('.b'), { xPercent: 22, yPercent: -16, duration: 15, ease: 'sine.inOut', repeat: -1, yoyo: true });
})();
