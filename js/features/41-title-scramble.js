/* ════════ FEATURE 41 · TITLE SCRAMBLE ════════
   Section headings decode from random glyphs into place the first time they
   scroll into view — a custom GSAP scramble (no paid plugin needed).
   Honours reduced motion. */
(() => {
  if (window.__mvScramble) return; window.__mvScramble = 1;
  if (!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#▮▯';
  const rnd = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

  const scramble = (el) => {
    const html = el.innerHTML;          // keep the styled markup (e.g. <em>)
    const text = el.textContent;
    const o = { p: 0 };
    gsap.to(o, {
      p: 1, duration: 0.9, ease: 'power2.out',
      onUpdate() {
        const reveal = Math.floor(o.p * text.length);
        let out = '';
        for (let i = 0; i < text.length; i++) out += text[i] === ' ' ? ' ' : (i < reveal ? text[i] : rnd());
        el.textContent = out;
      },
      onComplete() { el.innerHTML = html; }
    });
  };

  gsap.utils.toArray('.section-title, .lid .section-title').forEach(el => {
    if (el.dataset.scrambled) return; el.dataset.scrambled = '1';
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => scramble(el) });
  });
})();
