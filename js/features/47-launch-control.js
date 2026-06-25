/* ════════ FEATURE 47 · LAUNCH CONTROL ════════
   Drag the lever to the end of the travel to launch — GSAP Draggable with
   bounds and an elastic snap-back, firing a rev and a burst on release. */
(() => {
  if (window.__mvLaunch) return; window.__mvLaunch = 1;
  const footer = document.querySelector('.footer');
  if (!footer || !window.gsap || !window.Draggable) return;
  gsap.registerPlugin(Draggable);

  window.mvInject && window.mvInject('mv-launch-css', `
    .mvlaunch{ position:relative; z-index:5; background:var(--ink); border-top:1px solid var(--line);
      padding:clamp(4rem,9vh,7rem) clamp(1.2rem,5vw,5rem); text-align:center; }
    .mvlaunch__track{ position:relative; max-width:520px; height:72px; margin:1.8rem auto 0; border-radius:40px;
      background:var(--card); border:1px solid var(--line); display:flex; align-items:center; padding:0 8px; overflow:hidden; }
    .mvlaunch__fill{ position:absolute; left:0; top:0; bottom:0; width:0; border-radius:40px;
      background:linear-gradient(90deg, var(--orange,#ff6a00), var(--orange-bright,#ff8a2b)); opacity:.25; }
    .mvlaunch__knob{ position:relative; z-index:2; width:56px; height:56px; border-radius:50%; cursor:grab; flex:0 0 auto;
      background:radial-gradient(circle at 38% 32%, #ff8a2b, var(--orange,#ff6a00) 60%, #7a1f00);
      box-shadow:0 8px 20px rgba(255,106,0,.5); display:flex; align-items:center; justify-content:center; color:#1a0c00; font-weight:900; }
    .mvlaunch__knob:active{ cursor:grabbing; }
    .mvlaunch__hint{ position:absolute; right:24px; font-family:var(--mvmono,monospace); font-size:11px;
      letter-spacing:.2em; text-transform:uppercase; color:var(--muted); }
    .mvlaunch__status{ margin-top:1.1rem; font-family:var(--mvmono,monospace); font-size:12px; letter-spacing:.18em;
      text-transform:uppercase; color:var(--orange,#ff6a00); min-height:1em; }
  `);

  const sec = document.createElement('section');
  sec.className = 'mvlaunch'; sec.id = 'launch';
  sec.innerHTML = `
    <p class="section-label" style="justify-content:center"><span class="dot"></span> Launch control</p>
    <h2 class="section-title">PULL <em>AWAY</em></h2>
    <div class="mvlaunch__track" id="mvLaunchTrack">
      <div class="mvlaunch__fill" id="mvLaunchFill"></div>
      <div class="mvlaunch__knob" id="mvLaunchKnob">›</div>
      <span class="mvlaunch__hint">Drag to launch →</span>
    </div>
    <div class="mvlaunch__status" id="mvLaunchStatus">Standing start ready</div>`;
  footer.parentNode.insertBefore(sec, footer);

  const track = sec.querySelector('#mvLaunchTrack'), knob = sec.querySelector('#mvLaunchKnob');
  const fill = sec.querySelector('#mvLaunchFill'), status = sec.querySelector('#mvLaunchStatus');
  const maxX = () => track.clientWidth - knob.offsetWidth - 16;

  Draggable.create(knob, {
    type: 'x', bounds: track, inertia: false,
    onDrag() { fill.style.width = (this.x + knob.offsetWidth) + 'px'; },
    onDragEnd() {
      if (this.x >= maxX() - 6) { launch(); }
      else { gsap.to(knob, { x: 0, duration: 0.7, ease: 'elastic.out(1,0.45)', onUpdate: () => fill.style.width = (gsap.getProperty(knob, 'x') + knob.offsetWidth) + 'px' }); status.textContent = 'Aborted — try again'; }
    }
  });

  function launch() {
    status.textContent = 'Lights out — go go go!';
    window.mvRev && window.mvRev();
    gsap.fromTo(sec, { '--flash': 0 }, { duration: .2, yoyo: true, repeat: 1 });
    burst();
    gsap.to(knob, { x: 0, duration: 1, ease: 'elastic.out(1,0.4)', delay: .5,
      onUpdate: () => fill.style.width = (gsap.getProperty(knob, 'x') + knob.offsetWidth) + 'px',
      onComplete: () => status.textContent = 'Standing start ready' });
  }
  function burst() {
    const r = track.getBoundingClientRect();
    const c = document.createElement('canvas');
    Object.assign(c.style, { position: 'fixed', inset: 0, zIndex: 9990, pointerEvents: 'none' });
    c.width = innerWidth; c.height = innerHeight; document.body.appendChild(c);
    const ctx = c.getContext('2d'), accent = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim() || '#ff6a00';
    const P = Array.from({ length: 80 }, () => ({ x: r.right - 30, y: r.top + r.height / 2, vx: Math.random() * 14 + 4, vy: (Math.random() - .5) * 14, life: 1, s: Math.random() * 4 + 1.5 }));
    (function a() { ctx.clearRect(0, 0, c.width, c.height); let alive = false;
      P.forEach(p => { if (p.life <= 0) return; alive = true; p.x += p.vx; p.y += p.vy; p.vy += .25; p.vx *= .98; p.life -= .02;
        ctx.globalAlpha = Math.max(p.life, 0); ctx.fillStyle = accent; ctx.fillRect(p.x, p.y, p.s, p.s); });
      if (alive) requestAnimationFrame(a); else c.remove(); })();
  }
})();
