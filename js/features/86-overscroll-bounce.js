/* ════════ FEATURE 86 · REV LIMITER ════════
   Push against the very top or bottom of the page and the edge flares
   orange like a rev limiter hitting the wall — a quick GSAP glow pulse. */
(() => {
  if (window.__mvLimit) return; window.__mvLimit = 1;
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-limit-css', `
    .mv-limit{ position:fixed; left:0; right:0; height:90px; z-index:160; pointer-events:none; opacity:0; }
    .mv-limit--top{ top:0; background:linear-gradient(to bottom, rgba(255,106,0,.55), transparent); }
    .mv-limit--bot{ bottom:0; background:linear-gradient(to top, rgba(255,106,0,.55), transparent); }
  `);
  const top = document.createElement('div'); top.className = 'mv-limit mv-limit--top';
  const bot = document.createElement('div'); bot.className = 'mv-limit mv-limit--bot';
  document.body.append(top, bot);

  let cool = 0;
  const flare = (el) => {
    const now = performance.now(); if (now < cool) return; cool = now + 600;
    gsap.fromTo(el, { opacity: 0, scaleY: .6, transformOrigin: el === top ? 'top' : 'bottom' },
      { opacity: 1, scaleY: 1, duration: .14, yoyo: true, repeat: 1, ease: 'power2.out' });
  };
  addEventListener('wheel', e => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (e.deltaY < 0 && scrollY <= 0) flare(top);
    else if (e.deltaY > 0 && scrollY >= max - 1) flare(bot);
  }, { passive: true });
})();
