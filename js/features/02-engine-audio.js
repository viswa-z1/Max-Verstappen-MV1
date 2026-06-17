/* ════════ FEATURE 02 · ENGINE AUDIO ════════
   Opt-in synthesised V6-turbo idle (Web Audio API — no audio files).
   Starts only on user gesture; a rev blip fires on each toggle-on. */
(() => {
  if (window.__mvAudio) return; window.__mvAudio = 1;
  if (!window.mvDock) return;

  const btn = window.mvDockBtn('SND', 'Engine audio', '♪');
  window.mvDock().appendChild(btn);

  let ctx, master, running = false, nodes = [];

  const buildEngine = () => {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 760;
    master.connect(lp); lp.connect(ctx.destination);

    // three detuned saws = engine body
    [70, 71.5, 140].forEach((f, i) => {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
      const g = ctx.createGain(); g.gain.value = i === 2 ? 0.12 : 0.3;
      o.connect(g); g.connect(master); o.start(); nodes.push(o, g);
    });
    // slow LFO = idle rumble on the filter cutoff
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 11;
    const lfoG = ctx.createGain(); lfoG.gain.value = 220;
    lfo.connect(lfoG); lfoG.connect(lp.frequency); lfo.start(); nodes.push(lfo, lfoG);
    window.__mvEngine = { ctx, master, lp };
  };

  const rev = () => {
    if (!ctx) return;
    const t = ctx.currentTime;
    window.__mvEngine.lp.frequency.cancelScheduledValues(t);
    window.__mvEngine.lp.frequency.setValueAtTime(760, t);
    window.__mvEngine.lp.frequency.linearRampToValueAtTime(2400, t + 0.18);
    window.__mvEngine.lp.frequency.linearRampToValueAtTime(900, t + 0.9);
  };

  const start = () => {
    if (!ctx) buildEngine();
    if (ctx.state === 'suspended') ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.4);
    rev(); running = true; btn.classList.add('on');
  };
  const stop = () => {
    if (!ctx) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    running = false; btn.classList.remove('on');
  };

  btn.addEventListener('click', () => running ? stop() : start());
  // let other features trigger a rev (e.g. DRS boost)
  window.mvRev = () => { if (running) rev(); };
})();
