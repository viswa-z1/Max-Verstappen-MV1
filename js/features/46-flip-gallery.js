/* ════════ FEATURE 46 · THE GARAGE (Flip filter) ════════
   A filterable gallery: pick a category and the tiles rearrange with a
   smooth GSAP Flip transition rather than a hard cut. */
(() => {
  if (window.__mvFlip) return; window.__mvFlip = 1;
  const footer = document.querySelector('.footer');
  if (!footer || !window.gsap || !window.Flip) return;
  gsap.registerPlugin(Flip);

  const ITEMS = [
    ['Race start', 'track', '🏁', 'linear-gradient(160deg,#ff6a00,#7a1f00)'],
    ['Sim rig', 'sim', '🎮', 'linear-gradient(160deg,#1b2a6b,#06070f)'],
    ['Podium', 'track', '🏆', 'linear-gradient(160deg,#ff8a2b,#3a1500)'],
    ['Karting', 'off', '🛞', 'linear-gradient(160deg,#0a2a4a,#020308)'],
    ['Onboard', 'track', '🎥', 'linear-gradient(160deg,#ff6a00,#1b2a6b)'],
    ['Esports', 'sim', '⌨️', 'linear-gradient(160deg,#111733,#ff6a00)'],
    ['Fan meet', 'off', '🧡', 'linear-gradient(160deg,#c8102e,#1a0000)'],
    ['Garage', 'track', '🔧', 'linear-gradient(160deg,#2c44b0,#06070f)']
  ];
  const FILTERS = [['all', 'All'], ['track', 'On track'], ['sim', 'Sim'], ['off', 'Off track']];

  window.mvInject && window.mvInject('mv-flip-css', `
    .mvflip{ position:relative; z-index:5; background:var(--bg); border-top:1px solid var(--line);
      padding:clamp(5rem,12vh,9rem) clamp(1.2rem,5vw,5rem); }
    .mvflip__head{ margin-bottom:1.5rem; }
    .mvflip__chips{ display:flex; gap:.6rem; flex-wrap:wrap; margin-bottom:1.6rem; }
    .mvflip__chip{ cursor:pointer; background:transparent; color:var(--muted); border:1px solid var(--line);
      border-radius:40px; padding:.5rem 1.1rem; font-family:inherit; font-size:.85rem; letter-spacing:.05em;
      text-transform:uppercase; transition:.25s; }
    .mvflip__chip.on{ color:#1a0c00; background:var(--orange,#ff6a00); border-color:var(--orange,#ff6a00); }
    .mvflip__grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:1rem; }
    .mvflip__item{ aspect-ratio:1; border-radius:10px; overflow:hidden; position:relative;
      display:flex; align-items:flex-end; padding:1rem; border:1px solid var(--line); }
    .mvflip__item span{ position:relative; z-index:1; font-weight:700; letter-spacing:.04em; }
    .mvflip__item i{ position:absolute; top:1rem; right:1rem; font-style:normal; font-size:1.6rem; z-index:1; }
    .mvflip__item::after{ content:''; position:absolute; inset:0; background:linear-gradient(transparent 45%, rgba(0,0,0,.6)); }
  `);

  const sec = document.createElement('section');
  sec.className = 'mvflip'; sec.id = 'garage';
  sec.innerHTML = `
    <div class="mvflip__head">
      <p class="section-label" data-fade><span class="dot"></span> The Garage</p>
      <h2 class="section-title" data-fade>EVERY <em>ANGLE</em></h2>
    </div>
    <div class="mvflip__chips">${FILTERS.map((f, i) => `<button class="mvflip__chip ${i === 0 ? 'on' : ''}" data-f="${f[0]}">${f[1]}</button>`).join('')}</div>
    <div class="mvflip__grid">${ITEMS.map(([t, cat, ic, g]) =>
      `<div class="mvflip__item" data-cat="${cat}" style="background:${g}"><i>${ic}</i><span>${t}</span></div>`).join('')}</div>`;
  footer.parentNode.insertBefore(sec, footer);

  const items = gsap.utils.toArray(sec.querySelectorAll('.mvflip__item'));
  const chips = sec.querySelectorAll('.mvflip__chip');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('on')); chip.classList.add('on');
    const f = chip.dataset.f;
    const state = Flip.getState(items);                         // capture positions
    items.forEach(it => { it.style.display = (f === 'all' || it.dataset.cat === f) ? '' : 'none'; });
    Flip.from(state, { duration: 0.6, ease: 'power2.inOut', scale: true, stagger: 0.03,
      absolute: true, onEnter: el => gsap.fromTo(el, { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .4 }),
      onLeave: el => gsap.to(el, { opacity: 0, scale: .8, duration: .3 }) });
  }));
})();
