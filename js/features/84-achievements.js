/* ════════ FEATURE 84 · MILESTONE BADGES ════════
   Scroll far enough and a small badge slides in to mark the progress —
   out of the pits, halfway, final sector, chequered flag. Once each visit. */
(() => {
  if (window.__mvAch) return; window.__mvAch = 1;
  if (!window.gsap) return;

  const MILES = [
    [0.15, '🏁', 'Out of the pits'],
    [0.5, '⏱', 'Halfway — strong pace'],
    [0.8, '🔥', 'Into the final sector'],
    [0.99, '🏆', 'Chequered flag!']
  ];

  window.mvInject && window.mvInject('mv-ach-css', `
    .mv-ach{ position:fixed; right:18px; top:50%; transform:translate(120%,-50%); z-index:305; display:flex; align-items:center;
      gap:10px; max-width:260px; padding:11px 14px; background:rgba(10,12,20,.94); backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,.14); border-left:3px solid var(--orange,#ff6a00); border-radius:8px;
      box-shadow:0 18px 50px rgba(0,0,0,.5); font-family:var(--mvmono,monospace); }
    .mv-ach__ic{ font-size:20px; } .mv-ach__t{ font-size:8px; letter-spacing:.2em; color:var(--orange,#ff6a00); text-transform:uppercase; }
    .mv-ach__m{ font-size:12.5px; color:#f3f4f8; }
    @media (max-width:760px){ .mv-ach{ right:10px; top:auto; bottom:90px; transform:translate(120%,0); } }
  `);
  const el = document.createElement('div');
  el.className = 'mv-ach'; el.setAttribute('role', 'status');
  el.innerHTML = `<span class="mv-ach__ic"></span><div><div class="mv-ach__t">Milestone</div><div class="mv-ach__m"></div></div>`;
  document.body.appendChild(el);

  const done = new Set(); let busy = false;
  const show = (ic, m) => {
    busy = true;
    el.querySelector('.mv-ach__ic').textContent = ic; el.querySelector('.mv-ach__m').textContent = m;
    gsap.timeline({ onComplete: () => busy = false })
      .to(el, { x: 0, xPercent: 0, duration: .5, ease: 'power3.out' })
      .to(el, { xPercent: 120, duration: .5, ease: 'power3.in' }, '+=2.4');
  };
  addEventListener('scroll', () => {
    if (busy) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    for (let i = 0; i < MILES.length; i++) {
      if (p >= MILES[i][0] && !done.has(i)) { done.add(i); show(MILES[i][1], MILES[i][2]); break; }
    }
  }, { passive: true });
})();
