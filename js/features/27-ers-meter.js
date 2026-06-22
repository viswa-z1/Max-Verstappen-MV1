/* ════════ FEATURE 27 · ERS DEPLOYMENT ════════
   A battery on the left edge. Scrolling deploys the hybrid (it drains);
   ease off and it harvests back. Goes magenta on overtake-level deploy,
   red when it's nearly flat. Hidden on small screens. */
(() => {
  if (window.__mvErs) return; window.__mvErs = 1;
  if (matchMedia('(max-width: 980px)').matches) return;

  const SEG = 14;
  window.mvInject && window.mvInject('mv-ers-css', `
    .mv-ers{ position:fixed; left:0; top:50%; transform:translateY(-50%); z-index:140;
      display:flex; flex-direction:column-reverse; align-items:center; gap:3px; padding:8px 7px;
      background:rgba(10,12,20,.82); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.12);
      border-left:0; border-radius:0 8px 8px 0; font-family:var(--mvmono); box-shadow:6px 0 24px rgba(0,0,0,.4); }
    .mv-ers__seg{ width:10px; height:11px; border-radius:2px; background:rgba(255,255,255,.08); transition:background .12s; }
    .mv-ers__lbl{ writing-mode:vertical-rl; transform:rotate(180deg); font-size:8px; letter-spacing:.24em;
      color:#8b8fa3; text-transform:uppercase; margin-top:4px; }
    .mv-ers__pct{ font-size:9px; color:#f3f4f8; font-variant-numeric:tabular-nums; }
  `);

  const el = document.createElement('div');
  el.className = 'mv-ers';
  el.innerHTML = `<span class="mv-ers__lbl">ERS</span><span class="mv-ers__pct" id="mvErsPct">100</span>` +
    Array.from({ length: SEG }, () => '<span class="mv-ers__seg"></span>').join('');
  document.body.appendChild(el);
  const segs = [...el.querySelectorAll('.mv-ers__seg')];
  const pctEl = el.querySelector('#mvErsPct');

  let charge = 100, lastY = scrollY, deploy = 0;
  addEventListener('scroll', () => { deploy += Math.abs(scrollY - lastY); lastY = scrollY; }, { passive: true });

  (function loop() {
    const drain = Math.min(deploy * 0.12, 9); deploy *= 0.4;
    charge = Math.max(0, Math.min(100, charge - drain + 0.55)); // harvest +0.55/frame
    const lit = Math.round((charge / 100) * SEG);
    const deploying = drain > 1.2;
    segs.forEach((s, i) => {
      s.style.background = i < lit
        ? (deploying ? '#ff3df5' : charge < 28 ? '#ff2e2e' : charge < 55 ? '#ffd23d' : '#2ee06a')
        : 'rgba(255,255,255,.08)';
    });
    pctEl.textContent = Math.round(charge);
    requestAnimationFrame(loop);
  })();
})();
