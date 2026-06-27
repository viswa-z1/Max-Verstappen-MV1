/* ════════ FEATURE 55 · NUMBER-ONE EASTER EGG ════════
   Tap the giant ghost "1" in the hero five times to set it off — a spin,
   a flash and a little burst. */
(() => {
  if (window.__mvNumEgg) return; window.__mvNumEgg = 1;
  const num = document.querySelector('.hero__layer--num');
  if (!num || !window.gsap) return;
  num.style.pointerEvents = 'auto'; num.style.cursor = 'pointer';

  let taps = 0, t;
  num.addEventListener('click', () => {
    taps++; clearTimeout(t); t = setTimeout(() => taps = 0, 1200);
    gsap.fromTo(num, { scale: 1 }, { scale: 1.06, duration: .12, yoyo: true, repeat: 1, transformOrigin: '50% 50%' });
    if (taps >= 5) { taps = 0; fire(); }
  });

  function fire() {
    const flash = document.createElement('div');
    Object.assign(flash.style, { position: 'fixed', inset: 0, zIndex: 9986, pointerEvents: 'none', display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontFamily: 'Anton, sans-serif', color: 'var(--orange,#ff6a00)',
      fontSize: 'clamp(3rem,12vw,9rem)', textShadow: '0 0 40px var(--orange,#ff6a00)', opacity: 0 });
    flash.textContent = 'SUPER MAX';
    document.body.appendChild(flash);
    gsap.timeline({ onComplete: () => flash.remove() })
      .to(num, { rotation: 360, duration: 1, ease: 'power3.inOut', transformOrigin: '50% 50%' }, 0)
      .fromTo(flash, { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, 0)
      .to(flash, { opacity: 0, duration: .4 }, '+=0.8')
      .set(num, { rotation: 0 });
    if (window.mvRev) window.mvRev();
  }
})();
