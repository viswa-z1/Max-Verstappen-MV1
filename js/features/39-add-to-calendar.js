/* ════════ FEATURE 39 · ADD NEXT RACE TO CALENDAR ════════
   Drops an "Add to calendar" button into the schedule that downloads a
   standard .ics invite for the next Grand Prix. */
(() => {
  if (window.__mvIcs) return; window.__mvIcs = 1;
  const cal = document.getElementById('calendar');
  if (!cal) return;
  const head = cal.querySelector('.cal__head') || cal;

  const RACES = [
    ['Austrian Grand Prix', 'Red Bull Ring', '2026-06-28T13:00:00Z'],
    ['British Grand Prix', 'Silverstone', '2026-07-05T14:00:00Z'],
    ['Hungarian Grand Prix', 'Hungaroring', '2026-07-26T13:00:00Z'],
    ['Dutch Grand Prix', 'Zandvoort', '2026-08-30T13:00:00Z'],
    ['Italian Grand Prix', 'Monza', '2026-09-06T13:00:00Z'],
    ['Abu Dhabi Grand Prix', 'Yas Marina', '2026-12-06T13:00:00Z']
  ].map(([n, v, d]) => ({ n, v, t: new Date(d) }));

  window.mvInject && window.mvInject('mv-ics-css', `
    .mv-ics{ display:inline-flex; align-items:center; gap:.5rem; margin-top:1.2rem; cursor:pointer;
      background:transparent; color:var(--orange,#ff6a00); border:1px solid var(--orange,#ff6a00); border-radius:3px;
      padding:.7rem 1.3rem; font-family:inherit; font-weight:700; font-size:.85rem; letter-spacing:.06em;
      text-transform:uppercase; transition:background .3s, color .3s; }
    .mv-ics:hover{ background:var(--orange,#ff6a00); color:#1a0c00; }
  `);

  const next = RACES.find(r => r.t.getTime() > Date.now());
  const btn = document.createElement('button');
  btn.className = 'mv-ics';
  btn.textContent = next ? `+ Add ${next.n.replace(' Grand Prix', ' GP')} to calendar` : 'Season complete';
  if (!next) btn.disabled = true;
  head.appendChild(btn);
  if (!next) return;

  const z = n => String(n).padStart(2, '0');
  const stamp = d => `${d.getUTCFullYear()}${z(d.getUTCMonth() + 1)}${z(d.getUTCDate())}T${z(d.getUTCHours())}${z(d.getUTCMinutes())}00Z`;

  btn.addEventListener('click', () => {
    const start = next.t, end = new Date(start.getTime() + 2 * 3600 * 1000);
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//MV1//Race Calendar//EN', 'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:' + start.getTime() + '@mv1.local',
      'DTSTAMP:' + stamp(new Date()),
      'DTSTART:' + stamp(start),
      'DTEND:' + stamp(end),
      'SUMMARY:' + next.n + ' 🏁',
      'LOCATION:' + next.v,
      'DESCRIPTION:Lights out for the ' + next.n + '. Go Max!',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    const a = document.createElement('a');
    a.href = url; a.download = next.n.replace(/\s+/g, '-').toLowerCase() + '.ics'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
