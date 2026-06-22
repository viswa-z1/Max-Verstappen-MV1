/* ════════ FEATURE 29 · HELMET INSPECTOR ════════
   The helmet on the stage tilts to your pointer. Click it (or "Inspect")
   to open it full-size; drag to rotate it in 3D. Esc / backdrop closes. */
(() => {
  if (window.__mvHv) return; window.__mvHv = 1;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.mvInject && window.mvInject('mv-hv-css', `
    .mv-hv{ position:fixed; inset:0; z-index:9991; display:none; align-items:center; justify-content:center;
      padding:5vmin; background:rgba(3,4,8,.93); backdrop-filter:blur(10px); cursor:zoom-out; perspective:1400px; }
    .mv-hv.open{ display:flex; }
    .mv-hv__stage{ width:min(74vmin,600px); aspect-ratio:1; border-radius:50%; overflow:hidden; cursor:grab;
      box-shadow:0 40px 110px rgba(0,0,0,.7), 0 0 0 8px rgba(255,255,255,.04);
      transform-style:preserve-3d; transition:transform .5s cubic-bezier(.16,1,.3,1); }
    .mv-hv__stage.drag{ cursor:grabbing; transition:none; }
    .mv-hv__stage img{ width:100%; height:100%; object-fit:cover; display:block; }
    .mv-hv__meta{ position:absolute; left:0; right:0; bottom:6vh; text-align:center; font-family:var(--mvmono,monospace);
      color:#c9ccd8; font-size:11px; letter-spacing:.22em; text-transform:uppercase; }
    .mv-hv__x{ position:absolute; top:24px; right:28px; color:#f3f4f8; font-family:var(--mvmono,monospace); font-size:11px;
      letter-spacing:.14em; border:1px solid rgba(255,255,255,.25); border-radius:5px; padding:7px 12px; background:none; cursor:pointer; }
    .mv-hv__x:hover{ border-color:var(--orange,#ff6a00); color:var(--orange,#ff6a00); }
  `);

  const root = document.createElement('div');
  root.className = 'mv-hv'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true');
  root.innerHTML = `<button class="mv-hv__x" aria-label="Close">Close ✕</button>
    <div class="mv-hv__stage" id="mvHvStage"><img alt="" /></div>
    <div class="mv-hv__meta">Max Verstappen · race helmet — drag to inspect</div>`;
  document.body.appendChild(root);
  const stage = root.querySelector('#mvHvStage'), img = stage.querySelector('img');

  const lidImg = document.getElementById('lidImg');
  const open = () => { if (!lidImg) return; img.src = lidImg.src; root.classList.add('open'); reset(); };
  const close = () => root.classList.remove('open');
  document.getElementById('lidImg')?.addEventListener('click', open);
  document.getElementById('lidInspect')?.addEventListener('click', open);

  // 3D drag-to-rotate inside the overlay
  let rx = 0, ry = 0;
  const apply = () => stage.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  const reset = () => { rx = 0; ry = 0; stage.style.transition = ''; apply(); };
  let dragging = false, sx = 0, sy = 0, bx = 0, by = 0;
  stage.addEventListener('pointerdown', e => { dragging = true; stage.classList.add('drag'); sx = e.clientX; sy = e.clientY; bx = ry; by = rx; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', e => { if (!dragging) return; ry = bx + (e.clientX - sx) * .35; rx = Math.max(-40, Math.min(40, by - (e.clientY - sy) * .35)); ry = Math.max(-55, Math.min(55, ry)); apply(); });
  const end = () => { if (!dragging) return; dragging = false; stage.classList.remove('drag'); stage.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)'; reset(); };
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
  root.addEventListener('click', e => { if (e.target === root || e.target.classList.contains('mv-hv__x')) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // showcase helmet: GSAP float (y) + pointer tilt (rotationX/Y) compose cleanly
  const lidStage = document.getElementById('lidStage');
  if (lidStage && lidImg && window.gsap) {
    gsap.set(lidImg, { transformPerspective: 800, transformOrigin: '50% 50%' });
    if (!reduce) gsap.to(lidImg, { y: 16, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });
    if (!reduce && !matchMedia('(hover: none)').matches) {
      const rotY = gsap.quickTo(lidImg, 'rotationY', { duration: .6, ease: 'power3' });
      const rotX = gsap.quickTo(lidImg, 'rotationX', { duration: .6, ease: 'power3' });
      lidStage.addEventListener('pointermove', e => {
        const r = lidStage.getBoundingClientRect();
        rotY(((e.clientX - r.left) / r.width - .5) * 26);
        rotX(((e.clientY - r.top) / r.height - .5) * -20);
      });
      lidStage.addEventListener('pointerleave', () => { rotY(0); rotX(0); });
    }
  }
})();
