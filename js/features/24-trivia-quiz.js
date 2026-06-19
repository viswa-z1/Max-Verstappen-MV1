/* ════════ FEATURE 24 · KNOW YOUR MAX ════════
   A quick three-question quiz on factual career trivia, with an instant
   score. Opens from the dock. */
(() => {
  if (window.__mvQuiz) return; window.__mvQuiz = 1;
  if (!window.mvDock || !window.mvPanel) return;

  const Q = [
    { q: 'What is Max’s current car number?', a: ['1', '33', '3'], c: 0 },
    { q: 'Which country does Max race under?', a: ['Belgium', 'Netherlands', 'Germany'], c: 1 },
    { q: 'In which year did he win his first title?', a: ['2019', '2021', '2023'], c: 1 }
  ];

  window.mvInject('mv-quiz-css', `
    .mv-quiz__q{ font-size:12.5px; color:#f3f4f8; line-height:1.4; margin-bottom:10px; min-height:34px; }
    .mv-quiz__a{ display:flex; flex-direction:column; gap:6px; }
    .mv-quiz__a button{ text-align:left; padding:9px 11px; border-radius:6px; cursor:pointer; font-family:var(--mvmono);
      font-size:12px; border:1px solid rgba(255,255,255,.14); background:transparent; color:#c9ccd8; transition:.15s; }
    .mv-quiz__a button:hover{ border-color:var(--orange,#ff6a00); }
    .mv-quiz__a button.right{ border-color:#2ee06a; color:#2ee06a; background:rgba(46,224,106,.12); }
    .mv-quiz__a button.wrong{ border-color:#ff2e2e; color:#ff2e2e; background:rgba(255,46,46,.12); }
    .mv-quiz__meta{ display:flex; justify-content:space-between; font-size:9px; color:#8b8fa3; letter-spacing:.12em; text-transform:uppercase; margin-bottom:9px; }
    .mv-quiz__end{ text-align:center; }
    .mv-quiz__score{ font-family:'Anton',sans-serif; font-size:40px; color:var(--orange,#ff6a00); }
    .mv-quiz__again{ margin-top:8px; padding:8px 16px; border-radius:6px; cursor:pointer; border:1px solid rgba(255,255,255,.15);
      background:transparent; color:#f3f4f8; font-family:var(--mvmono); font-size:11px; letter-spacing:.1em; text-transform:uppercase; }
  `);

  const panel = document.createElement('div');
  panel.innerHTML = `<div class="mv-dp__h">Know your Max</div><div id="mvQuizBody"></div>`;
  document.body.appendChild(panel);
  const body = panel.querySelector('#mvQuizBody');

  const btn = window.mvDockBtn('QUIZ', 'Trivia quiz', '?');
  window.mvDock().appendChild(btn);
  window.mvPanel(btn, panel);

  let i = 0, score = 0, locked = false;
  const render = () => {
    if (i >= Q.length) {
      body.innerHTML = `<div class="mv-quiz__end"><div class="mv-quiz__score">${score}/${Q.length}</div>
        <p style="color:#c9ccd8;font-size:12px;margin-top:6px">${score === Q.length ? 'Pole position — flawless.' : score >= 2 ? 'Points finish. Solid.' : 'Back to the sim.'}</p>
        <button class="mv-quiz__again" id="mvQuizAgain">Play again</button></div>`;
      body.querySelector('#mvQuizAgain').addEventListener('click', () => { i = 0; score = 0; locked = false; render(); });
      return;
    }
    locked = false;
    const item = Q[i];
    body.innerHTML = `<div class="mv-quiz__meta"><span>Question ${i + 1}/${Q.length}</span><span>Score ${score}</span></div>
      <div class="mv-quiz__q">${item.q}</div>
      <div class="mv-quiz__a">${item.a.map((t, k) => `<button data-k="${k}">${t}</button>`).join('')}</div>`;
    body.querySelectorAll('.mv-quiz__a button').forEach(b => b.addEventListener('click', () => {
      if (locked) return; locked = true;
      const k = +b.dataset.k, btns = body.querySelectorAll('.mv-quiz__a button');
      if (k === item.c) { b.classList.add('right'); score++; }
      else { b.classList.add('wrong'); btns[item.c].classList.add('right'); }
      setTimeout(() => { i++; render(); }, 900);
    }));
  };
  render();
})();
