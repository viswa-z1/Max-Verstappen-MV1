/* ════════ FEATURE 12 · PHOTO LIGHTBOX ════════
   Click any feature photo to inspect it full-screen. Esc or click the
   backdrop to close. Keyboard accessible. */
(() => {
  if (window.__mvLight) return; window.__mvLight = 1;

  const photos = [
    ['.hero__photo', 'Max Verstappen'],
    ['#revealImg', 'Born to race'],
    ['#machineImg', 'The machine']
  ].map(([sel, cap]) => ({ el: document.querySelector(sel), cap })).filter(p => p.el);
  if (!photos.length) return;

  window.mvInject && window.mvInject('mv-light-css', `
    .mv-lb{ position:fixed; inset:0; z-index:9994; display:none; align-items:center; justify-content:center;
      padding:4vmin; background:rgba(3,4,8,.92); backdrop-filter:blur(8px); cursor:zoom-out; }
    .mv-lb.open{ display:flex; }
    .mv-lb__img{ max-width:94vw; max-height:84vh; border-radius:8px; box-shadow:0 30px 90px rgba(0,0,0,.7);
      transform:scale(.96); transition:transform .35s cubic-bezier(.16,1,.3,1); }
    .mv-lb.open .mv-lb__img{ transform:scale(1); }
    .mv-lb__cap{ position:absolute; left:0; right:0; bottom:5vh; text-align:center; font-family:var(--mvmono);
      color:#c9ccd8; font-size:11px; letter-spacing:.22em; text-transform:uppercase; }
    .mv-lb__x{ position:absolute; top:24px; right:28px; color:#f3f4f8; font-family:var(--mvmono);
      font-size:11px; letter-spacing:.14em; border:1px solid rgba(255,255,255,.25); border-radius:5px;
      padding:7px 12px; background:none; cursor:pointer; }
    .mv-lb__x:hover{ border-color:var(--orange,#ff6a00); color:var(--orange,#ff6a00); }
    .mv-inspectable{ cursor:zoom-in; }
  `);

  const lb = document.createElement('div');
  lb.className = 'mv-lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = `<button class="mv-lb__x" aria-label="Close">Close ✕</button><img class="mv-lb__img" alt="" /><div class="mv-lb__cap"></div>`;
  document.body.appendChild(lb);
  const img = lb.querySelector('.mv-lb__img'), cap = lb.querySelector('.mv-lb__cap');

  const open = p => { img.src = p.el.currentSrc || p.el.src; img.alt = p.cap; cap.textContent = p.cap + ' · inspect'; lb.classList.add('open'); };
  const close = () => lb.classList.remove('open');

  photos.forEach(p => {
    p.el.classList.add('mv-inspectable');
    p.el.setAttribute('tabindex', '0');
    p.el.setAttribute('role', 'button');
    p.el.addEventListener('click', () => open(p));
    p.el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(p); } });
  });
  lb.addEventListener('click', e => { if (e.target !== img) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
