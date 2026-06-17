/* ════════ FEATURE 04 · DRS BOOST (easter egg) ════════
   Enter the Konami code (↑↑↓↓←→←→ B A) to activate DRS: a particle
   burst, an on-screen banner, and a brief engine rev. */
(() => {
  if (window.__mvDrs) return; window.__mvDrs = 1;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.mvInject && window.mvInject('mv-drs-css', `
    .mv-drs{ position:fixed; inset:0; z-index:9997; pointer-events:none; display:flex;
      align-items:center; justify-content:center; opacity:0; }
    .mv-drs__t{ font-family:'Anton',sans-serif; font-size:clamp(3rem,12vw,9rem); letter-spacing:.1em;
      color:#fff; text-shadow:0 0 40px var(--orange,#ff6a00); transform:scale(.7); }
    .mv-drs__edge{ position:fixed; inset:0; z-index:9996; pointer-events:none; opacity:0;
      box-shadow:inset 0 0 160px 30px var(--orange,#ff6a00); }
  `);

  const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let i = 0;
  addEventListener('keydown', e => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    i = (k === SEQ[i]) ? i + 1 : (k === SEQ[0] ? 1 : 0);
    if (i === SEQ.length) { i = 0; fire(); }
  });

  function fire() {
    window.mvRev && window.mvRev();
    const banner = document.createElement('div');
    banner.className = 'mv-drs';
    banner.innerHTML = `<div class="mv-drs__t">DRS ENABLED</div>`;
    const edge = document.createElement('div'); edge.className = 'mv-drs__edge';
    document.body.append(edge, banner);

    if (window.gsap && !reduce) {
      gsap.to(edge, { opacity: 1, duration: .2, yoyo: true, repeat: 1 });
      gsap.timeline({ onComplete: () => { banner.remove(); edge.remove(); } })
        .to(banner, { opacity: 1, duration: .15 })
        .to(banner.firstElementChild, { scale: 1, duration: .5, ease: 'back.out(2)' }, '<')
        .to(banner, { opacity: 0, duration: .4 }, '+=0.7');
      burst();
    } else {
      banner.style.opacity = 1; banner.firstElementChild.style.transform = 'scale(1)';
      setTimeout(() => { banner.remove(); edge.remove(); }, 1400);
    }
  }

  function burst() {
    const c = document.createElement('canvas');
    Object.assign(c.style, { position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none' });
    c.width = innerWidth; c.height = innerHeight; document.body.appendChild(c);
    const ctx = c.getContext('2d');
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim() || '#ff6a00';
    const P = Array.from({ length: 140 }, () => ({
      x: innerWidth / 2, y: innerHeight / 2,
      vx: (Math.random() - .5) * 22, vy: (Math.random() - .5) * 22 - 4,
      life: 1, r: Math.random() * 4 + 1.5
    }));
    (function anim() {
      ctx.clearRect(0, 0, c.width, c.height);
      let alive = false;
      P.forEach(p => {
        if (p.life <= 0) return; alive = true;
        p.x += p.vx; p.y += p.vy; p.vy += 0.35; p.vx *= 0.99; p.life -= 0.016;
        ctx.globalAlpha = Math.max(p.life, 0); ctx.fillStyle = accent;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      });
      if (alive) requestAnimationFrame(anim); else c.remove();
    })();
  }
})();
