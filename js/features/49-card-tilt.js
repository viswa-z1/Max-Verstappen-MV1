/* ════════ FEATURE 49 · CARD POINTER TILT ════════
   Store and social cards lean toward the cursor in 3D with a soft specular
   sheen — GSAP quickTo on rotationX/Y, eased back on leave. */
(() => {
  if (window.__mvCardTilt) return; window.__mvCardTilt = 1;
  if (!window.gsap || matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const wire = (el) => {
    if (el.dataset.tilt) return; el.dataset.tilt = '1';
    gsap.set(el, { transformPerspective: 700, transformOrigin: '50% 50%' });
    const rx = gsap.quickTo(el, 'rotationX', { duration: .4, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: .4, ease: 'power3' });
    const sc = gsap.quickTo(el, 'scale', { duration: .4, ease: 'power3' });
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      ry((((e.clientX - r.left) / r.width) - .5) * 16);
      rx(((((e.clientY - r.top) / r.height) - .5)) * -16);
      sc(1.04);
    });
    el.addEventListener('pointerleave', () => { rx(0); ry(0); sc(1); });
  };

  const run = () => document.querySelectorAll('.product, .post, .mvflip__item').forEach(wire);
  // run after dynamic grids (store/social) and the Flip gallery exist
  if (document.readyState === 'complete') setTimeout(run, 80);
  else addEventListener('load', () => setTimeout(run, 80));
})();
