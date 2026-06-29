/* ════════ FEATURE 78 · DOCK FAN-IN ════════
   The instrument dock builds in on load — buttons pop up one after another
   with a soft back-ease, once all the modules have registered. */
(() => {
  if (window.__mvDockIntro) return; window.__mvDockIntro = 1;
  if (!window.gsap) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const play = () => {
    const btns = document.querySelectorAll('#mv-dock .mv-dbtn');
    if (!btns.length) return;
    gsap.from(btns, {
      scale: 0, opacity: 0, transformOrigin: '50% 50%',
      duration: 0.5, ease: 'back.out(2)', stagger: { each: 0.04, from: 'end' }, clearProps: 'scale,opacity'
    });
  };
  // run once the dock is fully populated by the other feature modules
  if (document.readyState === 'complete') setTimeout(play, 200);
  else addEventListener('load', () => setTimeout(play, 200));
})();
