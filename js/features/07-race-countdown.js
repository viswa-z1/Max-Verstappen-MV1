/* ════════ FEATURE 07 · LIGHTS-OUT COUNTDOWN ════════
   A compact pill that counts down to the next Grand Prix on the calendar
   and names the race. Updates every second. */
(() => {
  if (window.__mvCount) return; window.__mvCount = 1;

  // 2026 fixtures (UTC). Edit freely.
  const RACES = [
    ['Austrian GP', '2026-06-28T13:00:00Z'],
    ['British GP', '2026-07-05T14:00:00Z'],
    ['Hungarian GP', '2026-07-26T13:00:00Z'],
    ['Dutch GP', '2026-08-30T13:00:00Z'],
    ['Italian GP', '2026-09-06T13:00:00Z'],
    ['Abu Dhabi GP', '2026-12-06T13:00:00Z']
  ].map(([n, d]) => ({ n, t: new Date(d).getTime() }));

  window.mvInject && window.mvInject('mv-count-css', `
    .mv-count{ position:fixed; top:74px; right:18px; z-index:140; font-family:var(--mvmono);
      display:flex; flex-direction:column; gap:4px; padding:9px 13px; min-width:184px;
      background:rgba(10,12,20,.82); backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,.12); border-radius:8px;
      box-shadow:0 10px 30px rgba(0,0,0,.4); }
    .mv-count__h{ display:flex; align-items:center; gap:6px; font-size:8.5px; letter-spacing:.18em;
      color:#8b8fa3; text-transform:uppercase; }
    .mv-count__h b{ color:var(--orange,#ff6a00); font-weight:700; }
    .mv-count__led{ width:6px; height:6px; border-radius:50%; background:var(--orange,#ff6a00);
      box-shadow:0 0 8px var(--orange,#ff6a00); animation:mvBlink 1.4s infinite; }
    @keyframes mvBlink{ 0%,100%{opacity:1} 50%{opacity:.25} }
    .mv-count__t{ font-size:18px; font-weight:700; letter-spacing:.04em; font-variant-numeric:tabular-nums; }
    .mv-count__u{ display:flex; gap:11px; font-size:8px; color:#8b8fa3; letter-spacing:.16em; text-transform:uppercase; }
    @media (max-width:760px){ .mv-count{ top:64px; right:10px; transform:scale(.9); transform-origin:top right; } }
  `);

  const el = document.createElement('div');
  el.className = 'mv-count';
  el.innerHTML = `
    <div class="mv-count__h"><span class="mv-count__led"></span> Lights out · <b id="mvCName">—</b></div>
    <div class="mv-count__t" id="mvCT">--:--:--:--</div>
    <div class="mv-count__u"><span style="width:2.2ch">Days</span><span style="width:2.2ch">Hrs</span><span style="width:2.2ch">Min</span><span style="width:2.2ch">Sec</span></div>`;
  document.body.appendChild(el);
  const nameEl = el.querySelector('#mvCName'), tEl = el.querySelector('#mvCT');
  const p2 = n => String(n).padStart(2, '0');

  const update = () => {
    const now = Date.now();
    const next = RACES.find(r => r.t > now);
    if (!next) { nameEl.textContent = 'Season done'; tEl.textContent = '00:00:00:00'; return; }
    nameEl.textContent = next.n;
    let s = Math.floor((next.t - now) / 1000);
    const d = Math.floor(s / 86400); s -= d * 86400;
    const h = Math.floor(s / 3600); s -= h * 3600;
    const m = Math.floor(s / 60); s -= m * 60;
    tEl.textContent = `${p2(d)}:${p2(h)}:${p2(m)}:${p2(s)}`;
  };
  update(); setInterval(update, 1000);
})();
