/* ════════ FEATURE 23 · FAN CARD ════════
   Generate a shareable supporter card on a canvas (in the current livery
   colour) and download it as a PNG. */
(() => {
  if (window.__mvCard) return; window.__mvCard = 1;
  if (!window.mvDock || !window.mvPanel) return;

  window.mvInject('mv-card-css', `
    .mv-card canvas{ width:100%; height:auto; border-radius:8px; display:block; border:1px solid rgba(255,255,255,.1); }
    .mv-card__in{ width:100%; margin:10px 0 8px; padding:9px 11px; border-radius:6px; background:rgba(255,255,255,.05);
      border:1px solid rgba(255,255,255,.14); color:#f3f4f8; font-family:var(--mvmono); font-size:12px; outline:none; }
    .mv-card__in:focus{ border-color:var(--orange,#ff6a00); }
    .mv-card__dl{ width:100%; padding:9px; border-radius:6px; cursor:pointer; border:0; background:var(--orange,#ff6a00);
      color:#160a00; font-family:var(--mvmono); font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; }
  `);

  const panel = document.createElement('div');
  panel.innerHTML = `<div class="mv-dp__h">Your fan card</div>
    <div class="mv-card"><canvas id="mvCardC" width="640" height="360"></canvas></div>
    <input class="mv-card__in" id="mvCardName" maxlength="22" placeholder="Your name" value="Orange Army" />
    <button class="mv-card__dl" id="mvCardDl">Download card</button>`;
  document.body.appendChild(panel);

  const btn = window.mvDockBtn('CARD', 'Fan card', '▣');
  window.mvDock().appendChild(btn);
  window.mvPanel(btn, panel);

  const cv = panel.querySelector('#mvCardC'), ctx = cv.getContext('2d'), nameIn = panel.querySelector('#mvCardName');
  const draw = () => {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim() || '#ff6a00';
    const W = cv.width, H = cv.height;
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#0b1026'); g.addColorStop(1, '#06070f');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = accent; ctx.fillRect(0, 0, 12, H);
    // ghost number
    ctx.font = '900 320px Anton, Arial'; ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.textAlign = 'right';
    ctx.fillText('1', W - 10, H - 36);
    ctx.textAlign = 'left';
    ctx.fillStyle = accent; ctx.font = '700 16px ui-monospace, monospace';
    ctx.fillText('MV1 · OFFICIAL SUPPORTER', 40, 64);
    ctx.fillStyle = '#fff'; ctx.font = '900 78px Anton, Arial';
    ctx.fillText('MAX', 38, 168); ctx.fillStyle = accent; ctx.fillText('VERSTAPPEN', 38, 240);
    ctx.fillStyle = '#c9ccd8'; ctx.font = '18px ui-monospace, monospace';
    ctx.fillText((nameIn.value || 'Orange Army').toUpperCase(), 40, 300);
    ctx.fillStyle = '#8b8fa3'; ctx.font = '12px ui-monospace, monospace';
    ctx.fillText('FLAT OUT · #1 · NED', 40, 326);
  };
  nameIn.addEventListener('input', draw);
  panel.querySelector('#mvCardDl').addEventListener('click', () => {
    draw(); const a = document.createElement('a');
    a.download = 'mv1-fan-card.png'; a.href = cv.toDataURL('image/png'); a.click();
  });
  // fonts may load after script; redraw shortly and on open
  setTimeout(draw, 400);
  btn.addEventListener('click', () => { if (panel.classList.contains('open')) draw(); });
  draw();
})();
