/* ════════ FEATURE 11 · TELEMETRY TRACE ════════
   Turns your scroll velocity into a live throttle/brake trace and a peak-G
   readout, like a data-engineer's strip chart. Hidden on small screens. */
(() => {
  if (window.__mvTel) return; window.__mvTel = 1;
  if (matchMedia('(max-width: 980px)').matches) return;

  window.mvInject && window.mvInject('mv-tel-css', `
    .mv-tel{ position:fixed; left:18px; top:74px; z-index:140; width:172px; padding:9px 11px;
      background:rgba(10,12,20,.82); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.12);
      border-radius:8px; font-family:var(--mvmono); box-shadow:0 10px 30px rgba(0,0,0,.4); }
    .mv-tel__h{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px; }
    .mv-tel__h span{ font-size:8.5px; letter-spacing:.18em; color:#8b8fa3; text-transform:uppercase; }
    .mv-tel__g{ font-size:15px; font-weight:700; color:var(--orange,#ff6a00); font-variant-numeric:tabular-nums; }
    .mv-tel canvas{ display:block; width:150px; height:42px; }
  `);

  const el = document.createElement('div');
  el.className = 'mv-tel';
  el.innerHTML = `<div class="mv-tel__h"><span>Telemetry · G-force</span><span class="mv-tel__g" id="mvTelG">0.0G</span></div><canvas id="mvTelC" width="300" height="84"></canvas>`;
  document.body.appendChild(el);

  const cv = el.querySelector('#mvTelC'), ctx = cv.getContext('2d'), gEl = el.querySelector('#mvTelG');
  const W = cv.width, H = cv.height, N = 70;
  const hist = new Array(N).fill(0);
  let lastY = scrollY, lastT = performance.now(), vel = 0;

  addEventListener('scroll', () => {
    const now = performance.now(), dt = Math.max(now - lastT, 16);
    vel = Math.abs(scrollY - lastY) / dt; lastY = scrollY; lastT = now;
  }, { passive: true });

  (function draw() {
    vel *= 0.9; // decay
    const g = Math.min(vel * 1.1, 6);
    hist.push(g); hist.shift();
    gEl.textContent = g.toFixed(1) + 'G';
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim() || '#ff6a00';
    ctx.clearRect(0, 0, W, H);
    // baseline grid
    ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H - 1); ctx.lineTo(W, H - 1); ctx.stroke();
    // trace
    ctx.beginPath();
    hist.forEach((v, i) => {
      const x = (i / (N - 1)) * W, y = H - (v / 6) * (H - 4) - 2;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
    ctx.fillStyle = accent + '22'; ctx.fill();
    requestAnimationFrame(draw);
  })();
})();
