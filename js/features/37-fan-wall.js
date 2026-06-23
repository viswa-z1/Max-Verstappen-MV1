/* ════════ FEATURE 37 · FAN WALL ════════
   A local guestbook — leave a message for the Orange Army. Stored in
   localStorage on this device. Injected before the footer. */
(() => {
  if (window.__mvWall) return; window.__mvWall = 1;
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const KEY = 'mv-fanwall';
  const SEED = [
    { n: 'Orange Army', m: 'Allez Max! 🧡', t: Date.now() - 86400000 },
    { n: 'Pieter', m: 'P1 again — simply unreal pace.', t: Date.now() - 43200000 },
    { n: 'Sam', m: 'Zandvoort 2026, the dunes are ready.', t: Date.now() - 3600000 }
  ];

  window.mvInject && window.mvInject('mv-wall-css', `
    .mvwall{ position:relative; z-index:5; background:var(--bg); border-top:1px solid var(--line);
      padding:clamp(5rem,12vh,9rem) clamp(1.2rem,5vw,5rem); }
    .mvwall__head{ margin-bottom:clamp(2rem,5vh,3rem); }
    .mvwall__form{ display:grid; grid-template-columns:200px 1fr auto; gap:.7rem; max-width:820px; margin-bottom:2rem; }
    .mvwall__form input,.mvwall__form textarea{ background:var(--card); border:1px solid var(--line); border-radius:6px;
      color:var(--white); padding:.8rem 1rem; font-family:inherit; font-size:1rem; resize:none; outline:none; }
    .mvwall__form input:focus,.mvwall__form textarea:focus{ border-color:var(--orange,#ff6a00); }
    .mvwall__post{ background:var(--orange,#ff6a00); color:#1a0c00; border:0; border-radius:6px; padding:.8rem 1.6rem;
      font-weight:700; letter-spacing:.06em; text-transform:uppercase; cursor:pointer; font-size:.9rem; }
    .mvwall__list{ display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:1rem; }
    .mvwall__msg{ background:linear-gradient(160deg,var(--card-2),var(--card)); border:1px solid var(--line);
      border-left:3px solid var(--orange,#ff6a00); border-radius:6px; padding:1.1rem 1.2rem; }
    .mvwall__msg p{ font-size:1rem; line-height:1.45; word-break:break-word; }
    .mvwall__meta{ margin-top:.6rem; font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); }
    @media (max-width:640px){ .mvwall__form{ grid-template-columns:1fr; } }
  `);

  const sec = document.createElement('section');
  sec.className = 'mvwall'; sec.id = 'fanwall';
  sec.innerHTML = `
    <div class="mvwall__head">
      <p class="section-label" data-fade><span class="dot"></span> Fan Wall</p>
      <h2 class="section-title" data-fade>LEAVE YOUR <em>MARK</em></h2>
    </div>
    <div class="mvwall__form">
      <input id="mvWallName" maxlength="24" placeholder="Your name" aria-label="Your name" />
      <input id="mvWallMsg" maxlength="140" placeholder="Say something to the grid…" aria-label="Your message" />
      <button class="mvwall__post" id="mvWallPost">Post</button>
    </div>
    <div class="mvwall__list" id="mvWallList"></div>`;
  footer.parentNode.insertBefore(sec, footer);

  let msgs;
  try { msgs = JSON.parse(localStorage.getItem(KEY)) || SEED; } catch (e) { msgs = SEED; }
  const list = sec.querySelector('#mvWallList');
  const nameI = sec.querySelector('#mvWallName'), msgI = sec.querySelector('#mvWallMsg');
  const ago = t => { const s = (Date.now() - t) / 1000; if (s < 60) return 'just now'; if (s < 3600) return Math.floor(s / 60) + 'm ago'; if (s < 86400) return Math.floor(s / 3600) + 'h ago'; return Math.floor(s / 86400) + 'd ago'; };

  const render = () => {
    list.innerHTML = '';
    msgs.slice(0, 24).forEach(x => {
      const card = document.createElement('div'); card.className = 'mvwall__msg';
      const p = document.createElement('p'); p.textContent = x.m;            // textContent = no HTML injection
      const meta = document.createElement('div'); meta.className = 'mvwall__meta';
      meta.textContent = (x.n || 'Anonymous') + ' · ' + ago(x.t);
      card.append(p, meta); list.appendChild(card);
    });
  };
  const post = () => {
    const m = msgI.value.trim(); if (!m) { msgI.focus(); return; }
    msgs.unshift({ n: nameI.value.trim().slice(0, 24), m: m.slice(0, 140), t: Date.now() });
    msgs = msgs.slice(0, 50);
    localStorage.setItem(KEY, JSON.stringify(msgs));
    msgI.value = ''; render();
  };
  sec.querySelector('#mvWallPost').addEventListener('click', post);
  msgI.addEventListener('keydown', e => { if (e.key === 'Enter') post(); });
  render();
})();
