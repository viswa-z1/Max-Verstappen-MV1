/* ════════ FEATURE 50 · LIGHTS-OUT SEQUENCE ════════
   The five-light gantry runs its sequence when it scrolls into view —
   illuminate one by one, hold, then lights out and "GO!" — a GSAP timeline.
   Replays each time it re-enters. */
(() => {
  if (window.__mvLights) return; window.__mvLights = 1;
  const footer = document.querySelector('.footer');
  if (!footer || !window.gsap) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.mvInject && window.mvInject('mv-lights-css', `
    .mvlights{ position:relative; z-index:5; background:var(--bg); border-top:1px solid var(--line);
      padding:clamp(4rem,10vh,7rem) clamp(1.2rem,5vw,5rem); text-align:center; }
    .mvlights__gantry{ display:inline-flex; gap:clamp(.6rem,2vw,1.2rem); margin-top:1.8rem; padding:1rem;
      background:#08080c; border:1px solid #1a1a22; border-radius:12px; }
    .mvlights__pole{ display:flex; flex-direction:column; gap:.5rem; }
    .mvlights__pole i{ width:clamp(30px,6vw,52px); height:clamp(30px,6vw,52px); border-radius:50%;
      background:#1a0000; box-shadow:inset 0 0 8px #000; }
    .mvlights__pole i.on{ background:radial-gradient(circle at 40% 35%,#ff6a4d,#e10600 60%,#7a0400);
      box-shadow:0 0 26px rgba(225,6,0,.9), inset 0 0 8px rgba(255,255,255,.3); }
    .mvlights__go{ margin-top:1.4rem; font-family:'Anton',sans-serif; font-size:clamp(2rem,7vw,4.5rem);
      letter-spacing:.18em; text-transform:uppercase; opacity:0; }
    .mvlights__go.live{ color:var(--orange,#ff6a00); }
  `);

  const poles = Array.from({ length: 5 }, () => `<div class="mvlights__pole"><i></i><i></i></div>`).join('');
  const sec = document.createElement('section');
  sec.className = 'mvlights'; sec.id = 'lights';
  sec.innerHTML = `
    <p class="section-label" style="justify-content:center"><span class="dot"></span> Race start</p>
    <h2 class="section-title">IT ALL STARTS <em>HERE</em></h2>
    <div class="mvlights__gantry">${poles}</div>
    <div class="mvlights__go" id="mvLightsGo">Lights out</div>`;
  footer.parentNode.insertBefore(sec, footer);

  const bulbs = () => sec.querySelectorAll('.mvlights__pole i');
  const go = sec.querySelector('#mvLightsGo');
  const poleEls = sec.querySelectorAll('.mvlights__pole');

  const sequence = () => {
    gsap.set(bulbs(), { clearProps: 'className' }); bulbs().forEach(b => b.classList.remove('on'));
    go.classList.remove('live'); gsap.set(go, { opacity: 0, scale: .8 });
    if (reduce) { bulbs().forEach(b => b.classList.add('on')); gsap.set(go, { opacity: 1 }); go.textContent = 'Go!'; go.classList.add('live'); return; }
    const tl = gsap.timeline();
    go.textContent = 'Lights out'; gsap.set(go, { opacity: 1, scale: 1 });
    poleEls.forEach((p, i) => tl.call(() => p.querySelectorAll('i').forEach(b => b.classList.add('on')), null, i * 0.45));
    tl.to({}, { duration: gsap.utils.random(0.7, 1.6) })          // suspense hold
      .call(() => { bulbs().forEach(b => b.classList.remove('on')); window.mvRev && window.mvRev(); })
      .set(go, { textContent: 'Go!' })
      .fromTo(go, { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, ease: 'back.out(2.5)', onStart: () => go.classList.add('live') });
  };

  ScrollTrigger.create({ trigger: sec, start: 'top 70%', onEnter: sequence, onEnterBack: sequence });
  ScrollTrigger.refresh();
})();
