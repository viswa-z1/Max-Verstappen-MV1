/* ════════ FEATURE 61 · SPEED NEEDLE ════════
   A small fixed dial whose needle sweeps with how fast you scroll, like a
   rev counter — GSAP quickTo on the needle rotation. Hidden on mobile. */
(() => {
  if (window.__mvNeedle) return; window.__mvNeedle = 1;
  if (!window.gsap || matchMedia('(max-width: 980px)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.mvInject && window.mvInject('mv-needle-css', `
    .mv-needle{ position:fixed; right:18px; bottom:84px; z-index:140; width:96px; height:60px;
      background:rgba(10,12,20,.82); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.12);
      border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,.4); padding:8px 8px 4px; }
    .mv-needle svg{ width:100%; height:auto; display:block; overflow:visible; }
    .mv-needle__lbl{ text-align:center; font-family:var(--mvmono,monospace); font-size:7.5px; letter-spacing:.2em;
      text-transform:uppercase; color:#8b8fa3; margin-top:1px; }
  `);
  const el = document.createElement('div');
  el.className = 'mv-needle';
  el.innerHTML = `<svg viewBox="0 0 100 56">
      <path d="M8 52 A44 44 0 0 1 92 52" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="5" stroke-linecap="round"/>
      <path d="M8 52 A44 44 0 0 1 50 9" fill="none" stroke="#2ee06a" stroke-width="5" stroke-linecap="round"/>
      <path d="M62 13 A44 44 0 0 1 92 52" fill="none" stroke="#ff3df5" stroke-width="5" stroke-linecap="round"/>
      <line id="mvNeedleN" x1="50" y1="52" x2="50" y2="16" stroke="var(--orange,#ff6a00)" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="50" cy="52" r="4" fill="var(--orange,#ff6a00)"/>
    </svg><div class="mv-needle__lbl">Pace</div>`;
  document.body.appendChild(el);

  const needle = el.querySelector('#mvNeedleN');
  const rot = gsap.quickTo(needle, 'rotation', { duration: .5, ease: 'power3', transformOrigin: '50% 52px' });
  let lastY = scrollY, vel = 0;
  addEventListener('scroll', () => { vel = Math.min(Math.abs(scrollY - lastY), 60); lastY = scrollY; }, { passive: true });
  gsap.ticker.add(() => { vel += (0 - vel) * 0.08; rot(gsap.utils.mapRange(0, 60, -90, 90, vel)); });
})();
