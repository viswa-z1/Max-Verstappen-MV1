/* ════════ FEATURE 29 · HELMET INSPECTOR ════════
   Click a helmet to open it full-size in full colour. Drag to tilt it in
   3D; release and it eases back. Esc or backdrop closes. */
(() => {
  if (window.__mvHv) return; window.__mvHv = 1;

  window.mvInject && window.mvInject('mv-hv-css', `
    .mv-hv{ position:fixed; inset:0; z-index:9991; display:none; align-items:center; justify-content:center;
      padding:5vmin; background:rgba(3,4,8,.93); backdrop-filter:blur(10px); cursor:zoom-out; perspective:1400px; }
    .mv-hv.open{ display:flex; }
    .mv-hv__stage{ width:min(70vmin,560px); aspect-ratio:1; border-radius:14px; overflow:hidden; cursor:grab;
      box-shadow:0 40px 110px rgba(0,0,0,.7); transform-style:preserve-3d; transition:transform .5s cubic-bezier(.16,1,.3,1); }
    .mv-hv__stage.drag{ cursor:grabbing; transition:none; }
    .mv-hv__stage img{ width:100%; height:100%; object-fit:cover; display:block; }
    .mv-hv__meta{ position:absolute; left:0; right:0; bottom:6vh; text-align:center; font-family:var(--mvmono);
      color:#c9ccd8; font-size:11px; letter-spacing:.22em; text-transform:uppercase; }
    .mv-hv__x{ position:absolute; top:24px; right:28px; color:#f3f4f8; font-family:var(--mvmono); font-size:11px;
      letter-spacing:.14em; border:1px solid rgba(255,255,255,.25); border-radius:5px; padding:7px 12px; background:none; cursor:pointer; }
    .mv-hv__x:hover{ border-color:var(--orange,#ff6a00); color:var(--orange,#ff6a00); }
  `);

  const root = document.createElement('div');
  root.className = 'mv-hv'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true');
  root.innerHTML = `<button class="mv-hv__x" aria-label="Close">Close ✕</button>
    <div class="mv-hv__stage" id="mvHvStage"><img alt="" /></div>
    <div class="mv-hv__meta" id="mvHvMeta"></div>`;
  document.body.appendChild(root);
  const stage = root.querySelector('#mvHvStage'), img = stage.querySelector('img'), meta = root.querySelector('#mvHvMeta');

  const open = (src, label) => { img.src = src; img.alt = label; meta.textContent = label + ' · drag to inspect'; root.classList.add('open'); reset(); };
  const close = () => root.classList.remove('open');
  let rx = 0, ry = 0;
  const apply = () => stage.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  const reset = () => { rx = 0; ry = 0; stage.style.transition = ''; apply(); };

  // delegate clicks from helmet card images
  document.addEventListener('click', e => {
    const lid = e.target.closest('[data-helmet-img] .helmet-card__lid');
    if (!lid) return;
    const card = lid.closest('.helmet-card');
    const label = `${card.querySelector('.helmet-card__year')?.textContent || ''} ${card.querySelector('.helmet-card__name')?.textContent || ''}`.trim();
    open(lid.querySelector('img').src, label || 'Race helmet');
  });

  // drag to tilt
  let dragging = false, sx = 0, sy = 0, bx = 0, by = 0;
  stage.addEventListener('pointerdown', e => { dragging = true; stage.classList.add('drag'); sx = e.clientX; sy = e.clientY; bx = ry; by = rx; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', e => { if (!dragging) return; ry = bx + (e.clientX - sx) * 0.3; rx = by - (e.clientY - sy) * 0.3; rx = Math.max(-32, Math.min(32, rx)); ry = Math.max(-40, Math.min(40, ry)); apply(); });
  const end = () => { if (!dragging) return; dragging = false; stage.classList.remove('drag'); stage.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)'; reset(); };
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);

  root.addEventListener('click', e => { if (e.target === root || e.target.classList.contains('mv-hv__x')) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
