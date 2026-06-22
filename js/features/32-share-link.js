/* ════════ FEATURE 32 · SHARE ════════
   Share the page via the native share sheet where available, otherwise
   copy the link to the clipboard and confirm with a toast. */
(() => {
  if (window.__mvShare) return; window.__mvShare = 1;
  if (!window.mvDock) return;

  window.mvInject('mv-share-css', `
    .mv-toast{ position:fixed; left:50%; bottom:24px; transform:translate(-50%,140%); z-index:9989;
      padding:11px 18px; background:rgba(10,12,20,.95); border:1px solid rgba(255,255,255,.16);
      border-left:3px solid var(--orange,#ff6a00); border-radius:8px; font-family:var(--mvmono); font-size:12px;
      color:#f3f4f8; box-shadow:0 18px 50px rgba(0,0,0,.5); transition:transform .45s cubic-bezier(.16,1,.3,1); }
    .mv-toast.show{ transform:translate(-50%,0); }
  `);
  let toastEl, toastT;
  const toast = msg => {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'mv-toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg; requestAnimationFrame(() => toastEl.classList.add('show'));
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 2600);
  };

  const btn = window.mvDockBtn('SHARE', 'Share', '⇪');
  window.mvDock().appendChild(btn);
  btn.addEventListener('click', async () => {
    const data = { title: 'MV1 · Max Verstappen', text: 'A vertical drive through a champion’s career.', url: location.href };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(location.href); toast('Link copied to clipboard');
    } catch (e) {
      if (e && e.name === 'AbortError') return; // user dismissed the share sheet
      toast('Couldn’t share — copy the URL from the address bar');
    }
  });
})();
