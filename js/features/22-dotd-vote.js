/* ════════ FEATURE 22 · DRIVER OF THE DAY ════════
   Cast a vote and see the share update live. Your pick is remembered; the
   running tally lives in localStorage so it persists between visits. */
(() => {
  if (window.__mvVote) return; window.__mvVote = 1;
  if (!window.mvDock || !window.mvPanel) return;

  const OPTIONS = [
    { id: 'ver', n: 'Verstappen', c: 'var(--orange,#ff6a00)', base: 642 },
    { id: 'nor', n: 'Norris', c: '#ff8000', base: 318 },
    { id: 'lec', n: 'Leclerc', c: '#e8112d', base: 274 },
    { id: 'rus', n: 'Russell', c: '#27f4d2', base: 159 }
  ];

  window.mvInject('mv-vote-css', `
    .mv-vote__o{ width:100%; text-align:left; cursor:pointer; background:transparent; border:0; padding:0; margin-bottom:11px; }
    .mv-vote__top{ display:flex; justify-content:space-between; font-size:11px; color:#c9ccd8; margin-bottom:4px; }
    .mv-vote__top b{ color:#f3f4f8; } .mv-vote__o.mine .mv-vote__top b{ color:var(--orange,#ff6a00); }
    .mv-vote__bar{ height:7px; border-radius:4px; background:rgba(255,255,255,.08); overflow:hidden; }
    .mv-vote__bar i{ display:block; height:100%; width:0; border-radius:4px; transition:width .6s cubic-bezier(.16,1,.3,1); }
    .mv-vote__o:hover .mv-vote__bar{ outline:1px solid rgba(255,255,255,.18); }
    .mv-vote__foot{ font-size:9px; color:#8b8fa3; letter-spacing:.08em; margin-top:2px; }
  `);

  const store = JSON.parse(localStorage.getItem('mv-dotd') || '{}');
  const mine = localStorage.getItem('mv-dotd-mine') || '';
  const count = id => OPTIONS.find(o => o.id === id).base + (store[id] || 0);

  const panel = document.createElement('div');
  panel.innerHTML = `<div class="mv-dp__h">Driver of the day</div>` + OPTIONS.map(o => `
    <button class="mv-vote__o ${mine === o.id ? 'mine' : ''}" data-id="${o.id}">
      <div class="mv-vote__top"><b>${o.n}</b><span data-pct="${o.id}">—</span></div>
      <div class="mv-vote__bar"><i data-bar="${o.id}" style="background:${o.c}"></i></div>
    </button>`).join('') + `<div class="mv-vote__foot" id="mvVoteFoot">Tap a driver to vote.</div>`;
  document.body.appendChild(panel);

  const btn = window.mvDockBtn('DOTD', 'Driver of the day', '★');
  window.mvDock().appendChild(btn);
  window.mvPanel(btn, panel);

  const render = () => {
    const total = OPTIONS.reduce((a, o) => a + count(o.id), 0) || 1;
    OPTIONS.forEach(o => {
      const pct = Math.round((count(o.id) / total) * 100);
      panel.querySelector(`[data-pct="${o.id}"]`).textContent = pct + '%';
      panel.querySelector(`[data-bar="${o.id}"]`).style.width = pct + '%';
    });
    panel.querySelector('#mvVoteFoot').textContent = mineNow
      ? `You voted ${OPTIONS.find(o => o.id === mineNow).n}. Tap to change.`
      : 'Tap a driver to vote.';
  };
  let mineNow = mine;
  panel.querySelectorAll('.mv-vote__o').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.id;
    if (mineNow === id) return;
    if (mineNow) store[mineNow] = Math.max((store[mineNow] || 0) - 1, 0);
    store[id] = (store[id] || 0) + 1; mineNow = id;
    localStorage.setItem('mv-dotd', JSON.stringify(store));
    localStorage.setItem('mv-dotd-mine', id);
    panel.querySelectorAll('.mv-vote__o').forEach(x => x.classList.toggle('mine', x.dataset.id === id));
    render();
  }));
  // fill on first open
  let shown = false;
  btn.addEventListener('click', () => { if (panel.classList.contains('open') && !shown) { shown = true; requestAnimationFrame(render); } });
})();
