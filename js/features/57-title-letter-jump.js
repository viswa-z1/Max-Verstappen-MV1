/* ════════ FEATURE 57 · LETTER JUMP ════════
   Hover the hero name and the letters spring up in a quick wave — SplitText
   per-character with a staggered GSAP bounce. */
(() => {
  if (window.__mvJump2) return; window.__mvJump2 = 1;
  if (!window.gsap || !window.SplitText || matchMedia('(hover: none)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const title = document.querySelector('.hero__title');
  if (!title) return;

  // wait until the hero intro SplitText has settled, then split for hover
  setTimeout(() => {
    const split = new SplitText(title.querySelectorAll('.row'), { type: 'chars' });
    split.chars.forEach(ch => {
      ch.style.display = 'inline-block';
      ch.addEventListener('pointerenter', () => {
        gsap.fromTo(ch, { y: 0 }, { y: -14, duration: .22, ease: 'power2.out', yoyo: true, repeat: 1 });
      });
    });
  }, 1500);
})();
