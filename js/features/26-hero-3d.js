/* ════════ FEATURE 26 · HOMEPAGE 3D SCROLL ════════
   Turns the hero into a 3D diorama: the ghost number sits deep behind the
   stage, the portrait floats forward and tilts to the pointer, and the
   whole scene rotates back as you scroll away. Only animates transform
   components the base parallax doesn't touch, so nothing fights.
   Honours reduced motion and skips pointer-tilt on touch. */
(() => {
  if (window.__mv3d) return; window.__mv3d = 1;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  const img = document.querySelector('.hero__photo');
  const num = document.querySelector('.hero__layer--num');
  const glow = document.querySelector('.hero__layer--glow');
  const portrait = document.querySelector('.hero__portrait');
  if (!hero || !img) return;

  window.mvInject && window.mvInject('mv-3d-css', `
    .hero{ perspective:1200px; perspective-origin:60% 40%; }
    .hero__portrait{ transform-style:preserve-3d; }
    .hero__photo{ transform-style:preserve-3d; backface-visibility:hidden; }
  `);

  // static depth — different transform channel (z) from the base parallax (yPercent/opacity)
  if (num) gsap.set(num, { z: -480, transformOrigin: '50% 50%' });
  if (glow) gsap.set(glow, { z: -260 });
  gsap.set(portrait, { z: 80 });
  gsap.set(img, { rotateY: 0, rotateX: 0, transformPerspective: 1000, transformOrigin: '50% 50%' });

  // scroll: tilt the portrait back and sink the number further as the hero leaves
  gsap.to(img, { rotateX: -12, z: -40, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  if (num) gsap.to(num, { z: -760, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // pointer: parallax tilt of the portrait + counter-shift of the deep number
  if (!reduce && !matchMedia('(hover: none)').matches) {
    const rY = gsap.quickTo(img, 'rotateY', { duration: .6, ease: 'power3' });
    const rX = gsap.quickTo(img, 'rotateX', { duration: .6, ease: 'power3' });
    const nx = num ? gsap.quickTo(num, 'xPercent', { duration: 1, ease: 'power3' }) : null;
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;   // -0.5..0.5
      const py = (e.clientY - r.top) / r.height - .5;
      rY(px * 16); rX(-py * 10 - 12 * ScrollTriggerProgress());
      if (nx) nx(-px * 6);
    });
    hero.addEventListener('pointerleave', () => { rY(0); rX(0); if (nx) nx(0); });
  }
  function ScrollTriggerProgress() { return Math.min(scrollY / innerHeight, 1); }
})();
