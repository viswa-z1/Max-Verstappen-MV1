/* ════════ FEATURE 30 · SKILL RADAR ════════
   A hexagonal performance radar, drawn on a canvas and animated in when it
   scrolls into view. Injected before the footer. */
(() => {
  if (window.__mvRadar) return; window.__mvRadar = 1;
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const AXES = [
    ['Pace', 0.98], ['Qualifying', 0.95], ['Racecraft', 0.97],
    ['Tyre mgmt', 0.9], ['Wet weather', 0.96], ['Consistency', 0.94]
  ];

  window.mvInject && window.mvInject('mv-radar-css', `
    .mvrad{ position:relative; z-index:5; background:var(--ink); border-top:1px solid var(--line);
      padding:clamp(5rem,12vh,9rem) clamp(1.2rem,5vw,5rem); display:grid; grid-template-columns:1fr 1fr;
      gap:clamp(2rem,5vw,4rem); align-items:center; }
    .mvrad__desc{ color:var(--muted); margin-top:1.4rem; max-width:42ch; font-size:1.1rem; }
    .mvrad__c{ width:100%; max-width:460px; height:auto; margin:0 auto; display:block; }
    @media (max-width:820px){ .mvrad{ grid-template-columns:1fr; } }
  `);

  const sec = document.createElement('section');
  sec.className = 'mvrad'; sec.id = 'radar';
  sec.innerHTML = `<div>
      <p class="section-label"><span class="dot"></span> The Profile</p>
      <h2 class="section-title">SKILL <em>RADAR</em></h2>
      <p class="mvrad__desc">A driver scouting read across the six traits that decide championships — measured out of one hundred.</p>
    </div>
    <canvas class="mvrad__c" id="mvRadarC" width="520" height="520"></canvas>`;
  footer.parentNode.insertBefore(sec, footer);

  const cv = sec.querySelector('#mvRadarC'), ctx = cv.getContext('2d');
  const cx = 260, cy = 260, R = 190, N = AXES.length;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pt = (i, r) => { const a = -Math.PI / 2 + i / N * Math.PI * 2; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };

  const draw = (p) => {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim() || '#ff6a00';
    ctx.clearRect(0, 0, 520, 520);
    // rings
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (let i = 0; i <= N; i++) { const [x, y] = pt(i % N, R * ring / 4); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 1; ctx.stroke();
    }
    // spokes + labels
    ctx.fillStyle = '#8b8fa3'; ctx.font = '13px ui-monospace, monospace'; ctx.textAlign = 'center';
    AXES.forEach(([label], i) => {
      const [sx, sy] = pt(i, R); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(sx, sy);
      ctx.strokeStyle = 'rgba(255,255,255,.06)'; ctx.stroke();
      const [lx, ly] = pt(i, R + 26); ctx.fillText(label, lx, ly + 4);
    });
    // value polygon
    ctx.beginPath();
    AXES.forEach(([, v], i) => { const [x, y] = pt(i, R * v * p); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.closePath();
    ctx.fillStyle = accent + '33'; ctx.fill();
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
    AXES.forEach(([, v], i) => { const [x, y] = pt(i, R * v * p); ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 7); ctx.fillStyle = accent; ctx.fill(); });
  };

  let started = false;
  const run = () => {
    if (started) return; started = true;
    if (reduce) return draw(1);
    let t = 0; (function a() { t = Math.min(t + 0.04, 1); draw(t < 1 ? 1 - Math.pow(1 - t, 3) : 1); if (t < 1) requestAnimationFrame(a); })();
  };
  if (window.ScrollTrigger) ScrollTrigger.create({ trigger: sec, start: 'top 75%', once: true, onEnter: run });
  else new IntersectionObserver((e, o) => e.forEach(x => { if (x.isIntersecting) { run(); o.disconnect(); } }), { threshold: .3 }).observe(sec);
  draw(0);
})();
