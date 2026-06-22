/* ════════ FEATURE 26 · HOMEPAGE 3D SCROLL ════════
   The hero is a 3D diorama. The ghost "1" sits deep behind the stage, the
   portrait floats forward and tilts to the pointer, and as you scroll the
   whole scene dollies back and tilts — a real 3D recede, not a flat fade.
   Only animates transform channels the base parallax leaves alone, so the
   two never fight. Honours reduced motion; skips pointer tilt on touch. */
(() => {
  if (window.__mv3d) return; window.__mv3d = 1;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  const img = document.querySelector('.hero__photo');
  const num = document.querySelector('.hero__layer--num');
  const glow = document.querySelector('.hero__layer--glow');
  const portrait = document.querySelector('.hero__portrait');
  const content = document.querySelector('.hero__content');
  if (!hero || !img || !window.gsap) return;

  window.mvInject && window.mvInject('mv-3d-css', `
    .hero{ perspective:1000px; perspective-origin:62% 42%; transform-style:preserve-3d; }
    .hero__portrait{ transform-style:preserve-3d; }
    .hero__photo{ backface-visibility:hidden; }
  `);

  // static depth — z is untouched by the base parallax (which uses yPercent/opacity)
  if (num) gsap.set(num, { z: -560, transformOrigin: '50% 50%' });
  if (glow) gsap.set(glow, { z: -320 });
  gsap.set(portrait, { z: 120 });
  gsap.set(img, { transformPerspective: 1000, transformOrigin: '50% 50%' });
  if (content) gsap.set(content, { transformPerspective: 1100, transformOrigin: '50% 30%' });

  // scroll: dolly the scene back and tilt it (3D recede)
  const st = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
  gsap.to(img, { rotateX: -16, z: -60, ease: 'none', scrollTrigger: st });
  if (num) gsap.to(num, { z: -880, rotateY: 10, ease: 'none', scrollTrigger: st });
  if (content) gsap.to(content, { rotateX: -14, z: -120, ease: 'none', scrollTrigger: st });

  // pointer: parallax tilt of the portrait + counter-shift of the deep number
  if (!reduce && !matchMedia('(hover: none)').matches) {
    const rY = gsap.quickTo(img, 'rotateY', { duration: .6, ease: 'power3' });
    const nx = num ? gsap.quickTo(num, 'xPercent', { duration: 1, ease: 'power3' }) : null;
    const gx = glow ? gsap.quickTo(glow, 'xPercent', { duration: 1.2, ease: 'power3' }) : null;
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      rY(px * 20); if (nx) nx(-px * 8); if (gx) gx(px * 5);
    });
    hero.addEventListener('pointerleave', () => { rY(0); if (nx) nx(0); if (gx) gx(0); });
  }
})();
