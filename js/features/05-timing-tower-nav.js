/* ════════ FEATURE 05 · TIMING-TOWER NAV ════════
   A vertical "timing tower" on the right edge that tracks your position
   through the page and jumps to any section. Hidden on small screens. */
(() => {
  if (window.__mvTower) return; window.__mvTower = 1;

  const SECTIONS = [
    ['hero', 'Start'], ['reveal', 'Champion'], ['gallery', 'Reel'],
    ['track', 'On Track'], ['machine', 'Machine'], ['helmets', 'Helmets'],
    ['calendar', 'Schedule'], ['store', 'Store'], ['social', 'Feed']
  ].filter(([id]) => document.getElementById(id));
  if (!SECTIONS.length) return;

  window.mvInject && window.mvInject('mv-tower-css', `
    .mv-tower{ position:fixed; right:16px; top:50%; transform:translateY(-50%); z-index:140;
      display:flex; flex-direction:column; gap:11px; font-family:var(--mvmono); }
    .mv-tw{ display:flex; align-items:center; justify-content:flex-end; gap:9px; cursor:pointer;
      background:none; border:0; color:#8b8fa3; padding:0; }
    .mv-tw__l{ font-size:9px; letter-spacing:.14em; text-transform:uppercase; opacity:0;
      transform:translateX(6px); transition:.25s; white-space:nowrap; }
    .mv-tw__d{ width:9px; height:9px; border:1px solid #555; transform:rotate(45deg); transition:.25s; flex:0 0 auto; }
    .mv-tw:hover .mv-tw__l{ opacity:1; transform:translateX(0); }
    .mv-tw:hover .mv-tw__d{ border-color:var(--orange,#ff6a00); }
    .mv-tw.active .mv-tw__d{ background:var(--orange,#ff6a00); border-color:var(--orange,#ff6a00);
      box-shadow:0 0 12px var(--orange,#ff6a00); }
    .mv-tw.active .mv-tw__l{ opacity:1; transform:translateX(0); color:#f3f4f8; }
    @media (max-width:980px){ .mv-tower{ display:none; } }
  `);

  const tower = document.createElement('nav');
  tower.className = 'mv-tower'; tower.setAttribute('aria-label', 'Section navigation');
  tower.innerHTML = SECTIONS.map(([id, label]) =>
    `<button class="mv-tw" data-id="${id}"><span class="mv-tw__l">${label}</span><span class="mv-tw__d"></span></button>`).join('');
  document.body.appendChild(tower);

  const btns = [...tower.querySelectorAll('.mv-tw')];
  btns.forEach(b => b.addEventListener('click', () => {
    const t = document.getElementById(b.dataset.id);
    if (window.gsap && gsap.plugins && window.ScrollToPlugin) gsap.to(window, { duration: 1, ease: 'power3.inOut', scrollTo: { y: t, offsetY: 0 } });
    else t.scrollIntoView({ behavior: 'smooth' });
  }));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        btns.forEach(b => b.classList.toggle('active', b.dataset.id === id));
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  SECTIONS.forEach(([id]) => io.observe(document.getElementById(id)));
})();
