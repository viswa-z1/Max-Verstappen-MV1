/* ════════ FEATURE 06 · BOX-BOX TO TOP ════════
   A pit-board button that appears after you scroll past the first screen
   and returns you to the grid (top). */
(() => {
  if (window.__mvBox) return; window.__mvBox = 1;

  window.mvInject && window.mvInject('mv-box-css', `
    .mv-box{ position:fixed; right:18px; bottom:18px; z-index:300; display:flex; align-items:center; gap:9px;
      padding:11px 15px; cursor:pointer; font-family:var(--mvmono); color:#160a00;
      background:var(--orange,#ff6a00); border:0; border-radius:8px; font-weight:700;
      letter-spacing:.14em; text-transform:uppercase; font-size:12px;
      box-shadow:0 10px 30px rgba(255,106,0,.4); opacity:0; transform:translateY(20px);
      pointer-events:none; transition:opacity .35s, transform .35s; }
    .mv-box.show{ opacity:1; transform:translateY(0); pointer-events:auto; }
    .mv-box__a{ font-size:14px; line-height:1; }
    .mv-box:hover{ transform:translateY(-3px); }
    @media (prefers-reduced-motion:reduce){ .mv-box{ transition:opacity .2s; } }
  `);

  const btn = document.createElement('button');
  btn.className = 'mv-box'; btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<span class="mv-box__a">▲</span> Box`;
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    if (window.gsap && window.ScrollToPlugin) gsap.to(window, { duration: 1, ease: 'power3.inOut', scrollTo: 0 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const onScroll = () => btn.classList.toggle('show', window.scrollY > window.innerHeight * 0.9);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
