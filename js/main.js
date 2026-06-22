/* ═══════════════════════════════════════════════
   MV1 · MAX VERSTAPPEN — A VERTICAL DRIVE
   GSAP 3.13 (all plugins free) · ScrollTrigger · SplitText
   ═══════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;

/* ───────────── SVG helmet artwork (original, two-tone) but need to change it to actual helmets ───────────── */
function helmetSVG() {
  return `
  <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path class="h-shell" d="M44 120 Q40 55 100 42 Q170 28 198 80 Q210 104 198 128 L176 134 Q176 150 160 156 L96 158 Q56 158 48 128 Q44 124 44 120 Z"/>
    <path class="h-shell" d="M96 158 L160 156 Q176 150 176 136 L176 150 Q176 168 150 170 L96 172 Q66 172 58 150 Q62 158 76 158 Z"/>
    <path class="h-acc" d="M52 92 Q70 50 116 46 Q166 44 192 78 L176 88 Q150 60 112 64 Q74 68 62 100 Z"/>
    <path class="h-acc" d="M150 46 Q140 72 150 98 L162 94 Q156 72 162 52 Z"/>
    <path class="h-visor" d="M86 92 Q140 78 192 96 Q196 112 184 122 L112 128 Q86 126 80 108 Q80 98 86 92 Z"/>
    <path d="M100 100 Q140 92 178 104" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="3" stroke-linecap="round"/>
    <rect class="h-acc" x="38" y="94" width="14" height="26" rx="6"/>
  </svg>`;
}

/* ───────────── Build dynamic grids ───────────── */
function buildGrids() {
  // (Helmet section is now a static showcase — see #helmets / feature 29.)

  // Calendar
  const races = [
    { r: 'R01', f: '🇦🇺', gp: 'Australia', c: 'Albert Park', d: 'MAR 08' },
    { r: 'R04', f: '🇯🇵', gp: 'Japan', c: 'Suzuka', d: 'APR 12' },
    { r: 'R07', f: '🇲🇨', gp: 'Monaco', c: 'Monte Carlo', d: 'MAY 24' },
    { r: 'R12', f: '🇳🇱', gp: 'Netherlands', c: 'Zandvoort · Home', d: 'AUG 30' },
    { r: 'R15', f: '🇮🇹', gp: 'Italy', c: 'Monza', d: 'SEP 06' },
    { r: 'R24', f: '🇦🇪', gp: 'Abu Dhabi', c: 'Yas Marina · Finale', d: 'DEC 06' }
  ];
  const cl = document.getElementById('calList');
  if (cl) cl.innerHTML = races.map(x => `
    <li class="cal__row" data-row>
      <span class="cal__round">${x.r}</span>
      <span><span class="cal__gp">${x.gp}</span><br><span class="cal__circuit">${x.c}</span></span>
      <span class="cal__flag">${x.f}</span>
      <span class="cal__date">${x.d}</span>
    </li>`).join('');

  // Store
  const products = [
    { n: 'Race Cap', p: '€35', big: '1', g: 'linear-gradient(160deg,#ff6a00,#7a1f00)' },
    { n: 'Team Tee', p: '€45', big: 'MV', g: 'linear-gradient(160deg,#1b2a6b,#06070f)' },
    { n: 'Champ Hoodie', p: '€90', big: '★', g: 'linear-gradient(160deg,#ff8a2b,#3a1500)' },
    { n: '1:43 Model', p: '€60', big: '🏎', g: 'linear-gradient(160deg,#0a2a4a,#020308)' },
    { n: 'Lion Poster', p: '€25', big: '🦁', g: 'linear-gradient(160deg,#ff6a00,#1b2a6b)' },
    { n: 'Flag Scarf', p: '€30', big: '⚑', g: 'linear-gradient(160deg,#111733,#ff6a00)' }
  ];
  const sg = document.getElementById('storeGrid');
  if (sg) sg.innerHTML = products.map(p => `
    <article class="product" data-product>
      <div class="product__img" style="--g:${p.g}"><span>${p.big}</span></div>
      <div class="product__body"><span class="product__name">${p.n}</span><span class="product__price">${p.p}</span></div>
    </article>`).join('');

  // Partners (invented brands to avoid trademarks)
  const partners = ['VELOCITY', 'APEX FUEL', 'NITRO', 'ORANGE CO', 'REDLINE', 'PODIUM', 'TORQUE', 'GRIDLOCK'];
  const pg = document.getElementById('partnerGrid');
  if (pg) pg.innerHTML = partners.map(p => `<div class="partner" data-cursor="hover">${p}</div>`).join('');

  // Social feed
  const posts = [
    { t: 'Race Day', e: '🏁', g: 'linear-gradient(160deg,#ff6a00,#7a1f00)' },
    { t: 'Sim Night', e: '🎮', g: 'linear-gradient(160deg,#1b2a6b,#06070f)' },
    { t: 'Podium', e: '🏆', g: 'linear-gradient(160deg,#ff8a2b,#3a1500)' },
    { t: 'Behind Scenes', e: '📸', g: 'linear-gradient(160deg,#0a2a4a,#020308)' },
    { t: 'Fan Zone', e: '🧡', g: 'linear-gradient(160deg,#ff6a00,#1b2a6b)' },
    { t: 'Garage', e: '🔧', g: 'linear-gradient(160deg,#111733,#ff6a00)' },
    { t: 'On the Limit', e: '⚡', g: 'linear-gradient(160deg,#c8102e,#1a0000)' },
    { t: 'Victory Lap', e: '🚀', g: 'linear-gradient(160deg,#ff8a2b,#06070f)' }
  ];
  const socg = document.getElementById('socialGrid');
  if (socg) socg.innerHTML = posts.map(p => `
    <div class="post" data-post>
      <div class="post__img" style="background:${p.g}"><span>${p.e}</span></div>
      <span class="post__tag">${p.t}</span>
    </div>`).join('');
}

/* ───────────── Cursor + magnetic ───────────── */
function initCursor() {
  if (isTouch || reduceMotion) return;
  const ring = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  const xR = gsap.quickTo(ring, 'x', { duration: .4, ease: 'power3' });
  const yR = gsap.quickTo(ring, 'y', { duration: .4, ease: 'power3' });
  const xD = gsap.quickTo(dot, 'x', { duration: .1, ease: 'power3' });
  const yD = gsap.quickTo(dot, 'y', { duration: .1, ease: 'power3' });
  window.addEventListener('mousemove', e => { xR(e.clientX); yR(e.clientY); xD(e.clientX); yD(e.clientY); });
  document.querySelectorAll('[data-cursor="hover"], a, button, [data-magnetic]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });
  document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * .4, y: (e.clientY - (r.top + r.height / 2)) * .4, duration: .5, ease: 'power3' });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,0.4)' }));
  });
}

/* ───────────── Nav + progress + smooth scroll ───────────── */
function initNav() {
  const nav = document.getElementById('nav');
  ScrollTrigger.create({ start: 'top -80', onUpdate: s => nav.classList.toggle('scrolled', s.scroll() > 80) });
  gsap.to('#progressBar', { width: '100%', ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      gsap.to(window, { duration: 1.1, ease: 'power3.inOut', scrollTo: { y: t, offsetY: 0 } });
    });
  });
}

/* ───────────── Hero entrance (returns paused timeline) ───────────── */
function buildHeroIntro() {
  const tl = gsap.timeline({ paused: true });
  gsap.utils.toArray('.hero__title [data-split]').forEach((el, i) => {
    const s = new SplitText(el, { type: 'chars', mask: 'chars' });
    tl.from(s.chars, { yPercent: 120, opacity: 0, duration: .9, ease: 'power4.out', stagger: .04 }, i * .12);
  });
  tl.from('[data-hero]', { y: 30, opacity: 0, duration: .8, ease: 'power3.out', stagger: .12 }, .3);
  tl.from('.hero__portrait', { xPercent: 30, opacity: 0, duration: 1.2, ease: 'power3.out' }, .25);
  tl.from('.hero__scroll', { opacity: 0, duration: .6 }, .9);
  return tl;
}

/* ───────────── Hero parallax (depth layers) ───────────── */
function initHeroParallax() {
  gsap.utils.toArray('.hero [data-depth]').forEach(el => {
    const depth = parseFloat(el.dataset.depth);
    gsap.to(el, {
      yPercent: depth * 180, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  });
  gsap.fromTo('.hero__content',
    { yPercent: 0, opacity: 1 },
    { yPercent: -14, opacity: .5, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
}

/* ───────────── Marquee ───────────── */
function initMarquee() {
  const t = document.getElementById('marquee');
  if (!t) return;
  t.innerHTML += t.innerHTML;
  gsap.to(t, { xPercent: -50, ease: 'none', duration: 22, repeat: -1 });
}

/* ───────────── Generic fades + line reveals ───────────── */
function initReveals() {
  gsap.utils.toArray('[data-fade]').forEach(el => {
    gsap.from(el, { y: 40, opacity: 0, duration: .8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  gsap.utils.toArray('[data-lines]').forEach(el => {
    const s = new SplitText(el, { type: 'lines, words', mask: 'lines' });
    gsap.from(s.words, { opacity: .12, yPercent: 100, ease: 'power2.out', stagger: .04,
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 40%', scrub: 1 } });
  });
}

/* ───────────── Quote signature draw ───────────── */
function initSignature() {
  const p = document.getElementById('sigPath');
  if (!p) return;
  const len = p.getTotalLength();
  gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
  gsap.to(p, { strokeDashoffset: 0, ease: 'none',
    scrollTrigger: { trigger: '.quote', start: 'top 55%', end: 'bottom 75%', scrub: 1 } });
}

/* ───────────── Scroll-reveal portrait (clip wipe + zoom) ───────────── */
function initReveal() {
  const img = document.getElementById('revealImg');
  if (!img) return;
  gsap.fromTo(img,
    { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.35 },
    { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none',
      scrollTrigger: { trigger: '.reveal', start: 'top 85%', end: 'top 5%', scrub: 1 } });
  // gentle continued drift once revealed
  gsap.to(img, { yPercent: -8, ease: 'none',
    scrollTrigger: { trigger: '.reveal', start: 'top top', end: 'bottom top', scrub: true } });
  // title chars
  gsap.utils.toArray('.reveal__title [data-split]').forEach((el, i) => {
    const s = new SplitText(el, { type: 'chars', mask: 'chars' });
    gsap.from(s.chars, { yPercent: 120, opacity: 0, duration: .8, ease: 'power4.out', stagger: .04,
      scrollTrigger: { trigger: '.reveal', start: 'top 45%' }, delay: i * .1 });
  });
}

/* ───────────── Car banner parallax ───────────── */
function initMachine() {
  const img = document.getElementById('machineImg');
  if (!img) return;
  gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none',
    scrollTrigger: { trigger: '.machine', start: 'top bottom', end: 'bottom top', scrub: true } });
}

/* ───────────── Horizontal gallery ───────────── */
function initGallery() {
  const track = document.getElementById('galTrack');
  if (!track) return;
  const amount = () => track.scrollWidth - window.innerWidth + 80;
  const tween = gsap.to(track, {
    x: () => -amount(), ease: 'none',
    scrollTrigger: {
      trigger: '.gallery', start: 'top top', end: () => '+=' + amount(),
      pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true
    }
  });
  gsap.utils.toArray('[data-shot]').forEach(shot => {
    gsap.from(shot, { y: 80, opacity: 0, duration: .6, ease: 'power3.out',
      scrollTrigger: { trigger: shot, containerAnimation: tween, start: 'left 92%' } });
    gsap.from(shot.querySelector('figcaption'), { y: 20, opacity: 0, duration: .5, ease: 'power2.out',
      scrollTrigger: { trigger: shot, containerAnimation: tween, start: 'left 70%' } });
  });
}

/* ───────────── Split panels + counters ───────────── */
function initSplit() {
  gsap.utils.toArray('[data-panel]').forEach(panel => {
    gsap.from(panel.children, { y: 50, opacity: 0, duration: .7, ease: 'power3.out', stagger: .08,
      scrollTrigger: { trigger: panel, start: 'top 78%' } });
  });
  gsap.utils.toArray('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        const o = { v: 0 };
        gsap.to(o, { v: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(o.v) + suffix; } });
      }
    });
  });
}

/* ───────────── Helmet / store / social batched reveals ───────────── */
function initBatches() {
  ScrollTrigger.batch('[data-helmet]', { start: 'top 90%', batchMax: 4,
    onEnter: els => gsap.from(els, { y: 60, opacity: 0, scale: .9, duration: .6, ease: 'power3.out', stagger: .08, overwrite: true }) });
  ScrollTrigger.batch('[data-product]', { start: 'top 90%', batchMax: 3,
    onEnter: els => gsap.from(els, { y: 60, opacity: 0, duration: .6, ease: 'power3.out', stagger: .1, overwrite: true }) });
  ScrollTrigger.batch('[data-post]', { start: 'top 92%', batchMax: 4,
    onEnter: els => gsap.from(els, { scale: .8, opacity: 0, duration: .5, ease: 'power3.out', stagger: .06, overwrite: true }) });
  ScrollTrigger.batch('[data-row]', { start: 'top 92%',
    onEnter: els => gsap.from(els, { x: -40, opacity: 0, duration: .6, ease: 'power3.out', stagger: .08, overwrite: true }) });
  gsap.utils.toArray('.partner').forEach((el, i) => {
    gsap.from(el, { opacity: 0, duration: .5, delay: (i % 4) * .05,
      scrollTrigger: { trigger: '.partners__grid', start: 'top 85%' } });
  });
  gsap.from('.footer__big', { scale: .85, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.footer__cta', start: 'top 75%' } });
}

/* ───────────── Boot the scrolling experience ───────────── */
let heroIntro;
function boot() {
  buildGrids();
  initCursor();
  initNav();
  heroIntro = buildHeroIntro();
  initHeroParallax();
  initMarquee();
  initReveals();
  initSignature();
  initReveal();
  initMachine();
  initGallery();
  initSplit();
  initBatches();
  ScrollTrigger.refresh();
}

/* ───────────── Intro gate ("LOAD VERSTAPPEN") ───────────── */
function runGate() {
  const gate = document.getElementById('gate');
  const load = document.getElementById('gateLoad');
  const ring = document.getElementById('gateRingFill');
  const label = document.getElementById('gateLabel');

  // animate the name in
  const nameTl = gsap.timeline();
  gsap.utils.toArray('[data-gate-line]').forEach((el, i) => {
    const s = new SplitText(el, { type: 'chars', mask: 'chars' });
    nameTl.from(s.chars, { yPercent: 110, opacity: 0, duration: .8, ease: 'power4.out', stagger: .04 }, i * .15);
  });

  let started = false;
  const start = () => {
    if (started) return; started = true;
    const tl = gsap.timeline();
    tl.to(ring, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' })
      .to(label, { textContent: 'GO', duration: .01 }, '-=0.15')
      .to(label, { scale: 1.2, color: '#ff6a00', duration: .25, yoyo: true, repeat: 1 }, '<')
      .to('.gate__inner', { y: -40, opacity: 0, duration: .5, ease: 'power2.in' }, '+=0.1')
      .to(gate, { yPercent: -100, duration: .9, ease: 'power4.inOut' }, '-=0.2')
      .add(() => { gate.remove(); heroIntro.play(); ScrollTrigger.refresh(); }, '-=0.1');
  };
  load.addEventListener('click', start);
  load.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') start(); });
}

/* ───────────── Mobile rotate hint ───────────── */
function initRotate() {
  const rotate = document.getElementById('rotate');
  const dismiss = document.getElementById('rotateDismiss');
  const check = () => {
    const portraitPhone = window.innerWidth < 600 && window.innerHeight > window.innerWidth;
    rotate.classList.toggle('show', portraitPhone && !rotate.dataset.dismissed);
  };
  dismiss?.addEventListener('click', () => { rotate.dataset.dismissed = '1'; rotate.classList.remove('show'); });
  check();
  window.addEventListener('resize', check);
}

/* ───────────── Init ───────────── */
window.addEventListener('load', () => {
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  fontsReady.then(() => {
    initRotate();
    boot();
    if (reduceMotion) {
      document.getElementById('gate')?.remove();
      heroIntro.progress(1); // show final hero state
    } else {
      runGate();
    }
  });
});

window.addEventListener('resize', () => ScrollTrigger.refresh());
