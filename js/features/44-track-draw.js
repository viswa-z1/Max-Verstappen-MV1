/* ════════ FEATURE 44 · SCROLL-DRAWN LAP ════════
   A circuit that draws itself as you scroll, with a car marker running the
   racing line — GSAP ScrollTrigger scrub on a stroke-dashoffset, plus a
   marker positioned along the path. */
(() => {
  if (window.__mvDraw) return; window.__mvDraw = 1;
  const footer = document.querySelector('.footer');
  if (!footer || !window.gsap) return;

  const PATH = 'M70 380 C40 300 70 190 170 190 C260 190 250 90 340 90 C440 90 430 220 360 250 C300 276 360 330 450 320 C560 308 540 420 450 430 C360 440 320 380 230 400 C150 418 110 430 70 380 Z';

  window.mvInject && window.mvInject('mv-draw-css', `
    .mvdraw{ position:relative; z-index:5; background:var(--bg); border-top:1px solid var(--line);
      padding:clamp(5rem,12vh,9rem) clamp(1.2rem,5vw,5rem); display:grid; grid-template-columns:1fr 1fr;
      gap:clamp(2rem,5vw,4rem); align-items:center; }
    .mvdraw__copy .section-title{ margin:.3rem 0 0; }
    .mvdraw__desc{ color:var(--muted); margin-top:1.4rem; max-width:42ch; font-size:1.1rem; }
    .mvdraw svg{ width:100%; max-width:520px; height:auto; margin:0 auto; display:block; overflow:visible; }
    @media (max-width:820px){ .mvdraw{ grid-template-columns:1fr; } }
  `);

  const sec = document.createElement('section');
  sec.className = 'mvdraw'; sec.id = 'lap';
  sec.innerHTML = `
    <div class="mvdraw__copy">
      <p class="section-label"><span class="dot"></span> The Lap</p>
      <h2 class="section-title">FIND THE <em>APEX</em></h2>
      <p class="mvdraw__desc">Brake late, turn in, clip the apex, get on the power. Scroll to put in a lap.</p>
    </div>
    <svg viewBox="0 0 600 520" aria-hidden="true">
      <path d="${PATH}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="14"/>
      <path id="mvDrawLine" d="${PATH}" fill="none" stroke="var(--orange,#ff6a00)" stroke-width="14" stroke-linecap="round"/>
      <circle id="mvDrawCar" r="11" fill="#fff" stroke="var(--orange,#ff6a00)" stroke-width="4"/>
    </svg>`;
  footer.parentNode.insertBefore(sec, footer);

  const line = sec.querySelector('#mvDrawLine'), car = sec.querySelector('#mvDrawCar');
  const len = line.getTotalLength();
  gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
  const st = { trigger: sec, start: 'top 70%', end: 'bottom 85%', scrub: 1 };
  gsap.to(line, { strokeDashoffset: 0, ease: 'none', scrollTrigger: st });
  gsap.to({ p: 0 }, {
    p: 1, ease: 'none', scrollTrigger: st,
    onUpdate() { const pt = line.getPointAtLength(this.targets()[0].p * len); car.setAttribute('cx', pt.x); car.setAttribute('cy', pt.y); }
  });
  const s = line.getPointAtLength(0); car.setAttribute('cx', s.x); car.setAttribute('cy', s.y);
  ScrollTrigger.refresh();
})();
