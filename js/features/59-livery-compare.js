/* ════════ FEATURE 59 · BEFORE / AFTER ════════
   A draggable divider that wipes between a mono and full-colour treatment of
   the portrait — GSAP Draggable controlling a clip. Injected before footer. */
(() => {
  if (window.__mvCompare) return; window.__mvCompare = 1;
  const footer = document.querySelector('.footer');
  if (!footer || !window.gsap || !window.Draggable) return;
  gsap.registerPlugin(Draggable);

  window.mvInject && window.mvInject('mv-cmp-css', `
    .mvcmp{ position:relative; z-index:5; background:var(--ink); border-top:1px solid var(--line);
      padding:clamp(5rem,12vh,9rem) clamp(1.2rem,5vw,5rem); }
    .mvcmp__head{ margin-bottom:clamp(2rem,5vh,3rem); }
    .mvcmp__frame{ position:relative; max-width:880px; margin:0 auto; aspect-ratio:16/9; border-radius:12px;
      overflow:hidden; border:1px solid var(--line); user-select:none; }
    .mvcmp__img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 18%; }
    .mvcmp__img--top{ filter:grayscale(1) contrast(1.1); clip-path:inset(0 50% 0 0); }
    .mvcmp__lbl{ position:absolute; bottom:12px; z-index:3; font-family:var(--mvmono,monospace); font-size:10px;
      letter-spacing:.2em; text-transform:uppercase; color:#fff; background:rgba(6,7,15,.7); padding:4px 9px; border-radius:30px; }
    .mvcmp__lbl--l{ left:12px; } .mvcmp__lbl--r{ right:12px; }
    .mvcmp__handle{ position:absolute; top:0; bottom:0; left:50%; width:3px; background:var(--orange,#ff6a00); z-index:4; cursor:ew-resize; }
    .mvcmp__grip{ position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:42px; height:42px;
      border-radius:50%; background:var(--orange,#ff6a00); color:#1a0c00; display:flex; align-items:center; justify-content:center;
      font-weight:900; box-shadow:0 6px 18px rgba(255,106,0,.5); }
  `);

  const sec = document.createElement('section');
  sec.className = 'mvcmp'; sec.id = 'compare';
  sec.innerHTML = `
    <div class="mvcmp__head">
      <p class="section-label" data-fade><span class="dot"></span> Before / After</p>
      <h2 class="section-title" data-fade>DRAG TO <em>REVEAL</em></h2>
    </div>
    <div class="mvcmp__frame" id="mvCmpFrame">
      <img class="mvcmp__img" src="assets/max-portrait.jpg" alt="Max Verstappen, colour" />
      <img class="mvcmp__img mvcmp__img--top" id="mvCmpTop" src="assets/max-portrait.jpg" alt="Max Verstappen, mono" />
      <span class="mvcmp__lbl mvcmp__lbl--l">Mono</span>
      <span class="mvcmp__lbl mvcmp__lbl--r">Colour</span>
      <div class="mvcmp__handle" id="mvCmpHandle"><span class="mvcmp__grip">⇆</span></div>
    </div>`;
  footer.parentNode.insertBefore(sec, footer);

  const frame = sec.querySelector('#mvCmpFrame'), handle = sec.querySelector('#mvCmpHandle'), top = sec.querySelector('#mvCmpTop');
  const setPos = (px) => {
    const w = frame.clientWidth, pct = gsap.utils.clamp(0, 100, (px / w) * 100);
    handle.style.left = pct + '%';
    top.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
  };
  setPos(frame.clientWidth / 2);
  Draggable.create(handle, {
    type: 'x', bounds: frame, cursor: 'ew-resize',
    onDrag() { setPos(this.x + handle.offsetWidth / 2); }
  });
  addEventListener('resize', () => { handle.style.left = '50%'; setPos(frame.clientWidth / 2); gsap.set(handle, { x: 0 }); });
})();
