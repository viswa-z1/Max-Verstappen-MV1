/* ════════ FEATURE 54 · TAB-AWAY RADIO ════════
   Switch tabs and the page title calls you back over team radio; it flips
   back to normal the moment you return. */
(() => {
  if (window.__mvTab) return; window.__mvTab = 1;
  const original = document.title;
  const AWAY = ['📻 Box box — come back!', '📻 We need you on the pit wall', '📻 Radio check… still there?'];
  let i = 0, timer;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = AWAY[i++ % AWAY.length];
      clearInterval(timer);
      timer = setInterval(() => { document.title = AWAY[i++ % AWAY.length]; }, 2500);
    } else {
      clearInterval(timer); document.title = original;
    }
  });
})();
