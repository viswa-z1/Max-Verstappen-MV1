/* ════════ FEATURE 21 · PODIUM FINISH ════════
   Reach the bottom of the page and take the win — a chequered-flag flourish
   with a P1 badge, fired once per visit. Respects reduced motion. */
(() => {
  if (window.__mvPodium) return; window.__mvPodium = 1;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const footer = document.querySelector('.footer');
  if (!footer) return;

  window.mvInject && window.mvInject('mv-podium-css', `
    .mv-pod{ position:fixed; inset:0; z-index:9993; pointer-events:none; display:flex;
      align-items:center; justify-content:center; opacity:0; }
    .mv-pod__badge{ text-align:center; transform:scale(.6); }
    .mv-pod__p1{ font-family:'Anton',sans-serif; font-size:clamp(4rem,16vw,12rem); line-height:.8;
      color:#fff; text-shadow:0 0 50px var(--orange,#ff6a00); }
    .mv-pod__sub{ font-family:var(--mvmono); font-size:12px; letter-spacing:.4em; text-transform:uppercase; color:var(--orange,#ff6a00); margin-top:8px; }
  `);

  let done = false;
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting && !done) { done = true; io.disconnect(); celebrate(); } });
  }, { threshold: 0.4 });
  io.observe(footer);

  function celebrate() {
    window.mvRev && window.mvRev();
    const el = document.createElement('div');
    el.className = 'mv-pod';
    el.innerHTML = `<div class="mv-pod__badge"><div class="mv-pod__p1">P1</div><div class="mv-pod__sub">Chequered flag</div></div>`;
    document.body.appendChild(el);
    if (window.gsap && !reduce) {
      gsap.timeline({ onComplete: () => el.remove() })
        .to(el, { opacity: 1, duration: .2 })
        .to(el.querySelector('.mv-pod__badge'), { scale: 1, duration: .6, ease: 'back.out(2)' }, '<')
        .to(el, { opacity: 0, duration: .5 }, '+=1.4');
      confetti();
    } else { el.style.opacity = 1; el.querySelector('.mv-pod__badge').style.transform = 'scale(1)'; setTimeout(() => el.remove(), 2200); }
  }

  function confetti() {
    const c = document.createElement('canvas');
    Object.assign(c.style, { position: 'fixed', inset: 0, zIndex: 9994, pointerEvents: 'none' });
    c.width = innerWidth; c.height = innerHeight; document.body.appendChild(c);
    const ctx = c.getContext('2d');
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim() || '#ff6a00';
    const cols = [accent, '#ffffff', '#111733'];
    const P = Array.from({ length: 160 }, () => ({
      x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.4,
      vx: (Math.random() - .5) * 4, vy: Math.random() * 3 + 2,
      s: Math.random() * 7 + 3, rot: Math.random() * 6, vr: (Math.random() - .5) * 0.3,
      col: cols[(Math.random() * cols.length) | 0], life: 1
    }));
    let frames = 0;
    (function anim() {
      ctx.clearRect(0, 0, c.width, c.height); frames++;
      P.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.rot += p.vr;
        if (frames > 150) p.life -= 0.02;
        ctx.save(); ctx.globalAlpha = Math.max(p.life, 0); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.col; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); ctx.restore();
      });
      if (frames < 230) requestAnimationFrame(anim); else c.remove();
    })();
  }
})();
