/* ════════ FEATURE 64 · AURORA DRIFT ════════
   A slow, living gradient glow drifts behind the footer call-to-action —
   two soft colour blobs eased around on an endless GSAP loop. */
(() => {
  if (window.__mvAurora) return; window.__mvAurora = 1;
  const cta = document.querySelector('.footer__cta');
  if (!cta || !window.gsap) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-aurora-css', `
    .footer__cta{ position:relative; overflow:hidden; }
    .footer__cta > *{ position:relative; z-index:1; }
    .mv-aurora{ position:absolute; inset:-30%; z-index:0; pointer-events:none; filter:blur(60px); opacity:.5; }
    .mv-aurora b{ position:absolute; width:46%; height:60%; border-radius:50%; display:block; }
    .mv-aurora .a{ background:radial-gradient(circle, var(--orange,#ff6a00), transparent 65%); left:8%; top:10%; }
    .mv-aurora .b{ background:radial-gradient(circle, #1b2a6b, transparent 65%); right:6%; bottom:6%; }
  `);
  const aur = document.createElement('div');
  aur.className = 'mv-aurora'; aur.innerHTML = '<b class="a"></b><b class="b"></b>';
  cta.insertBefore(aur, cta.firstChild);

  gsap.to(aur.querySelector('.a'), { xPercent: 30, yPercent: 24, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.to(aur.querySelector('.b'), { xPercent: -26, yPercent: -20, duration: 11, ease: 'sine.inOut', repeat: -1, yoyo: true });
})();
