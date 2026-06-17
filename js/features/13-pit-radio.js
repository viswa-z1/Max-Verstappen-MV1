/* ════════ FEATURE 13 · PIT RADIO ════════
   Occasional team-radio style messages slide in from the bottom — a small
   bit of atmosphere. Click to dismiss; respects reduced motion. */
(() => {
  if (window.__mvRadio) return; window.__mvRadio = 1;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MSGS = [
    'Box this lap, box, box.',
    'Gap to car ahead: two seconds.',
    'DRS enabled — use it.',
    'Tyres are looking good, keep pushing.',
    'You are P1. Maintain the pace.',
    'Mode push. Mode push.',
    'Great job, that was a strong lap.',
    'Watch the front-left, manage it home.'
  ];

  window.mvInject && window.mvInject('mv-radio-css', `
    .mv-radio{ position:fixed; left:50%; bottom:24px; transform:translate(-50%,140%); z-index:305;
      display:flex; align-items:center; gap:11px; max-width:min(440px,90vw); padding:11px 16px;
      background:rgba(10,12,20,.92); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.14);
      border-left:3px solid var(--orange,#ff6a00); border-radius:8px; cursor:pointer;
      box-shadow:0 18px 50px rgba(0,0,0,.5); font-family:var(--mvmono); transition:transform .5s cubic-bezier(.16,1,.3,1); }
    .mv-radio.show{ transform:translate(-50%,0); }
    .mv-radio__ic{ font-size:16px; }
    .mv-radio__b{ min-width:0; }
    .mv-radio__tag{ font-size:8px; letter-spacing:.2em; color:var(--orange,#ff6a00); text-transform:uppercase; }
    .mv-radio__txt{ font-size:12.5px; color:#f3f4f8; letter-spacing:.01em; }
    .mv-radio__wave{ display:flex; gap:2px; margin-left:auto; align-items:center; }
    .mv-radio__wave i{ width:2px; height:10px; background:var(--orange,#ff6a00); border-radius:2px; animation:mvWave 1s infinite ease-in-out; }
    .mv-radio__wave i:nth-child(2){ animation-delay:.15s } .mv-radio__wave i:nth-child(3){ animation-delay:.3s } .mv-radio__wave i:nth-child(4){ animation-delay:.45s }
    @keyframes mvWave{ 0%,100%{ height:4px } 50%{ height:14px } }
    @media (max-width:760px){ .mv-radio{ bottom:80px; } }
  `);

  const el = document.createElement('div');
  el.className = 'mv-radio'; el.setAttribute('role', 'status');
  el.innerHTML = `<span class="mv-radio__ic">📻</span><div class="mv-radio__b">
    <div class="mv-radio__tag">Team radio</div><div class="mv-radio__txt"></div></div>
    <div class="mv-radio__wave"><i></i><i></i><i></i><i></i></div>`;
  document.body.appendChild(el);
  const txt = el.querySelector('.mv-radio__txt');
  let hideTimer, idx = 0;

  const show = () => {
    txt.textContent = MSGS[idx % MSGS.length]; idx++;
    el.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => el.classList.remove('show'), 5200);
  };
  el.addEventListener('click', () => el.classList.remove('show'));

  // first message after a beat, then on a relaxed interval
  if (!reduce) {
    setTimeout(show, 9000);
    setInterval(show, 26000);
  }
})();
