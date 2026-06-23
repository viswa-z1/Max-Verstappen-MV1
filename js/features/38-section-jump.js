/* ════════ FEATURE 38 · SECTION JUMP ════════
   Glide between major sections with the keyboard: J / ↓ for the next,
   K / ↑ for the previous. Shows a one-time hint. Ignores typing fields
   and open dialogs. */
(() => {
  if (window.__mvJump) return; window.__mvJump = 1;

  const ids = ['hero', 'reveal', 'gallery', 'track', 'machine', 'helmets', 'calendar',
    'store', 'partners', 'social', 'timeline', 'radar', 'trophies', 'fanwall'];

  const sections = () => ids.map(id => document.getElementById(id)).filter(Boolean);

  const go = (dir) => {
    const secs = sections(); if (!secs.length) return;
    const mid = scrollY + innerHeight * 0.35;
    let idx = 0;
    secs.forEach((s, i) => { if (s.offsetTop <= mid) idx = i; });
    const target = secs[Math.max(0, Math.min(secs.length - 1, idx + dir))];
    if (!target) return;
    if (window.gsap && window.ScrollToPlugin) gsap.to(window, { duration: .9, ease: 'power3.inOut', scrollTo: { y: target, offsetY: 0 } });
    else target.scrollIntoView({ behavior: 'smooth' });
    hint();
  };

  let hintShown = localStorage.getItem('mv-jump-hint') === '1', hintEl, hintT;
  window.mvInject && window.mvInject('mv-jump-css', `
    .mv-jhint{ position:fixed; left:50%; top:84px; transform:translate(-50%,-16px); z-index:160; opacity:0;
      padding:8px 14px; background:rgba(10,12,20,.92); border:1px solid rgba(255,255,255,.14); border-radius:7px;
      font-family:var(--mvmono,monospace); font-size:11px; letter-spacing:.08em; color:#f3f4f8;
      box-shadow:0 10px 30px rgba(0,0,0,.4); transition:opacity .3s, transform .3s; pointer-events:none; }
    .mv-jhint.show{ opacity:1; transform:translate(-50%,0); }
    .mv-jhint b{ color:var(--orange,#ff6a00); }
  `);
  const hint = () => {
    if (hintShown) return;
    if (!hintEl) { hintEl = document.createElement('div'); hintEl.className = 'mv-jhint';
      hintEl.innerHTML = 'Jumping sections · <b>J</b>/<b>K</b> or <b>↑</b>/<b>↓</b>'; document.body.appendChild(hintEl); }
    requestAnimationFrame(() => hintEl.classList.add('show'));
    clearTimeout(hintT); hintT = setTimeout(() => { hintEl.classList.remove('show'); hintShown = true; localStorage.setItem('mv-jump-hint', '1'); }, 2600);
  };

  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) return;
    if (document.querySelector('.mv-pal.open, .mv-help.open, .mv-hv.open, .mv-lb.open')) return;
    if (e.key === 'j' || e.key === 'J' || e.key === 'ArrowDown') { e.preventDefault(); go(1); }
    else if (e.key === 'k' || e.key === 'K' || e.key === 'ArrowUp') { e.preventDefault(); go(-1); }
  });
})();
