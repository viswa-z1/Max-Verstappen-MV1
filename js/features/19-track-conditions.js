/* ════════ FEATURE 19 · TRACK CONDITIONS ════════
   A race-control style read on the session: air and track temperature,
   humidity, rain chance and grip. Press refresh for a new reading. */
(() => {
  if (window.__mvWx) return; window.__mvWx = 1;
  if (!window.mvDock || !window.mvPanel) return;

  window.mvInject('mv-wx-css', `
    .mv-wx__cond{ display:flex; align-items:center; gap:10px; margin-bottom:12px; }
    .mv-wx__ic{ font-size:30px; }
    .mv-wx__cl{ font-size:13px; color:#f3f4f8; } .mv-wx__cs{ font-size:9px; color:#8b8fa3; letter-spacing:.14em; text-transform:uppercase; }
    .mv-wx__rows{ display:grid; gap:8px; }
    .mv-wx__r{ display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#c9ccd8; }
    .mv-wx__r b{ color:#f3f4f8; font-variant-numeric:tabular-nums; }
    .mv-wx__grip{ height:5px; border-radius:3px; background:rgba(255,255,255,.1); overflow:hidden; flex:1; margin-left:12px; }
    .mv-wx__grip i{ display:block; height:100%; width:0; background:linear-gradient(90deg,#ff2e2e,#ffd23d,#2ee06a); transition:width .6s; }
    .mv-wx__rf{ width:100%; margin-top:11px; padding:8px; border-radius:6px; cursor:pointer; border:1px solid rgba(255,255,255,.15);
      background:transparent; color:#8b8fa3; font-family:var(--mvmono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; }
    .mv-wx__rf:hover{ border-color:var(--orange,#ff6a00); color:var(--orange,#ff6a00); }
  `);

  const COND = [
    { ic: '☀', cl: 'Dry & sunny', grip: 92 },
    { ic: '⛅', cl: 'Overcast', grip: 80 },
    { ic: '🌦', cl: 'Light drizzle', grip: 58 },
    { ic: '🌧', cl: 'Wet — full wets', grip: 34 }
  ];

  const panel = document.createElement('div');
  panel.innerHTML = `<div class="mv-dp__h">Track conditions</div>
    <div class="mv-wx__cond"><span class="mv-wx__ic" id="mvWxIc">☀</span>
      <div><div class="mv-wx__cl" id="mvWxCl">—</div><div class="mv-wx__cs">Race control</div></div></div>
    <div class="mv-wx__rows">
      <div class="mv-wx__r"><span>Air temp</span><b id="mvWxAir">—</b></div>
      <div class="mv-wx__r"><span>Track temp</span><b id="mvWxTrk">—</b></div>
      <div class="mv-wx__r"><span>Humidity</span><b id="mvWxHum">—</b></div>
      <div class="mv-wx__r"><span>Rain chance</span><b id="mvWxRain">—</b></div>
      <div class="mv-wx__r"><span>Grip</span><span class="mv-wx__grip"><i id="mvWxGrip"></i></span></div>
    </div>
    <button class="mv-wx__rf" id="mvWxRf">New reading</button>`;
  document.body.appendChild(panel);

  const btn = window.mvDockBtn('WX', 'Track conditions', '◍');
  window.mvDock().appendChild(btn);
  window.mvPanel(btn, panel);

  const rnd = (a, b) => Math.round(a + Math.random() * (b - a));
  const read = () => {
    const c = COND[rnd(0, COND.length - 1)];
    const air = rnd(16, 31), rain = c.grip < 60 ? rnd(55, 95) : rnd(0, 30);
    panel.querySelector('#mvWxIc').textContent = c.ic;
    panel.querySelector('#mvWxCl').textContent = c.cl;
    panel.querySelector('#mvWxAir').textContent = air + '°C';
    panel.querySelector('#mvWxTrk').textContent = (air + rnd(6, 18)) + '°C';
    panel.querySelector('#mvWxHum').textContent = rnd(35, 85) + '%';
    panel.querySelector('#mvWxRain').textContent = rain + '%';
    panel.querySelector('#mvWxGrip').style.width = c.grip + '%';
  };
  panel.querySelector('#mvWxRf').addEventListener('click', read);
  read();
})();
