/* ════════ FEATURE 18 · PIT-STOP REACTION ════════
   The five-light start sequence. Lights go out at a random moment — tap as
   fast as you can. Jump the start and it's a penalty. Best time persists. */
(() => {
  if (window.__mvPit) return; window.__mvPit = 1;
  if (!window.mvDock || !window.mvPanel) return;

  window.mvInject('mv-pit-css', `
    .mv-pit__lights{ display:flex; gap:6px; justify-content:center; margin:6px 0 12px; }
    .mv-pit__lights span{ width:30px; height:30px; border-radius:50%; background:#1a0000; border:1px solid #2a0a0a; }
    .mv-pit__lights span.on{ background:radial-gradient(circle at 40% 35%,#ff6a4d,#e10600 60%,#7a0400); box-shadow:0 0 14px rgba(225,6,0,.8); }
    .mv-pit__res{ text-align:center; font-size:13px; color:#f3f4f8; min-height:18px; margin-bottom:10px; font-variant-numeric:tabular-nums; }
    .mv-pit__res b{ color:var(--orange,#ff6a00); }
    .mv-pit__go{ width:100%; padding:11px; border-radius:7px; cursor:pointer; border:1px solid rgba(255,255,255,.16);
      background:transparent; color:#f3f4f8; font-family:var(--mvmono); font-size:12px; letter-spacing:.12em;
      text-transform:uppercase; transition:.2s; }
    .mv-pit__go.ready{ background:#2ee06a; color:#04140a; border-color:#2ee06a; }
    .mv-pit__go:hover{ border-color:var(--orange,#ff6a00); }
    .mv-pit__best{ margin-top:9px; text-align:center; font-size:10px; color:#8b8fa3; letter-spacing:.1em; }
  `);

  const panel = document.createElement('div');
  panel.innerHTML = `<div class="mv-dp__h">Pit-stop reaction</div>
    <div class="mv-pit__lights">${'<span></span>'.repeat(5)}</div>
    <div class="mv-pit__res" id="mvPitRes">Press start, wait for lights out.</div>
    <button class="mv-pit__go" id="mvPitGo">Start</button>
    <div class="mv-pit__best" id="mvPitBest"></div>`;
  document.body.appendChild(panel);

  const btn = window.mvDockBtn('PIT', 'Pit-stop reaction', '◔');
  window.mvDock().appendChild(btn);
  window.mvPanel(btn, panel);

  const lights = [...panel.querySelectorAll('.mv-pit__lights span')];
  const res = panel.querySelector('#mvPitRes'), go = panel.querySelector('#mvPitGo'), bestEl = panel.querySelector('#mvPitBest');
  let state = 'idle', t0 = 0, timers = [];
  let best = +localStorage.getItem('mv-pit-best') || 0;
  const showBest = () => bestEl.textContent = best ? `Best: ${best} ms` : '';
  showBest();

  const clear = () => { timers.forEach(clearTimeout); timers = []; lights.forEach(l => l.classList.remove('on')); };

  go.addEventListener('click', () => {
    if (state === 'idle' || state === 'done' || state === 'jump') {
      clear(); state = 'arming'; go.textContent = 'Wait…'; go.classList.remove('ready'); res.textContent = 'Lights on…';
      lights.forEach((l, i) => timers.push(setTimeout(() => l.classList.add('on'), 350 + i * 550)));
      const outAt = 350 + 5 * 550 + 600 + Math.random() * 2200;
      timers.push(setTimeout(() => {
        lights.forEach(l => l.classList.remove('on')); state = 'go'; t0 = performance.now();
        go.textContent = 'Tap now!'; go.classList.add('ready'); res.textContent = 'GO!';
        window.mvRev && window.mvRev();
      }, outAt));
    } else if (state === 'arming') {
      clear(); state = 'jump'; res.innerHTML = '<b>Jump start!</b> Too early.'; go.textContent = 'Try again'; go.classList.remove('ready');
    } else if (state === 'go') {
      const ms = Math.round(performance.now() - t0); state = 'done';
      const pb = best && ms < best;
      res.innerHTML = `Reaction: <b>${ms} ms</b>${pb ? ' · new best!' : ''}`;
      if (!best || ms < best) { best = ms; localStorage.setItem('mv-pit-best', best); }
      showBest(); go.textContent = 'Go again'; go.classList.remove('ready');
    }
  });
})();
