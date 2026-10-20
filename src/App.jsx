import { useEffect, useState } from 'react';

const positions = ['שוער', 'בלם', 'מגן ימני', 'מגן שמאלי', 'קשר אחורי', 'קשר מרכזי', 'קשר התקפי', 'כנף ימני', 'כנף שמאלי', 'חלוץ'];
const goals = ['טכניקה', 'מהירות', 'סיבולת', 'כוח'];
const levels = ['מתחיל', 'בינוני', 'מתקדם'];
const rank = { מתחיל: 1, בינוני: 2, מתקדם: 3 };
const allPositions = positions;
const drills = [
  { id: 'warm', title: 'חימום דינמי עם כדור', type: 'הכנה', minutes: 8, level: 'מתחיל', goals, positions: allPositions, text: 'הנעת מפרקים, ריצה קלה ונגיעות קצרות בכדור.' },
  { id: 'first-touch', title: 'קבלה וסריקה לפני מסירה', type: 'טכניקה', minutes: 12, level: 'מתחיל', goals: ['טכניקה'], positions: ['קשר אחורי', 'קשר מרכזי', 'קשר התקפי', 'מגן ימני', 'מגן שמאלי'], text: 'סרוק מעבר לכתף, פתח גוף וקבל לכיוון הפעולה הבאה.' },
  { id: 'dribble', title: 'כדרור ושינויי כיוון', type: 'טכניקה', minutes: 12, level: 'מתחיל', goals: ['טכניקה', 'מהירות'], positions: ['כנף ימני', 'כנף שמאלי', 'חלוץ', 'קשר התקפי', 'מגן ימני', 'מגן שמאלי'], text: 'התקדם בין סמנים, החלף קצב וגע בכדור בשתי הרגליים.' },
  { id: 'passing', title: 'מסירות בקצב משתנה', type: 'טכניקה', minutes: 10, level: 'מתחיל', goals: ['טכניקה'], positions: ['שוער', 'בלם', 'מגן ימני', 'מגן שמאלי', 'קשר אחורי', 'קשר מרכזי', 'קשר התקפי'], text: 'עבוד בזוגות: שתי נגיעות, נגיעה אחת ואז מסירה לרגל הרחוקה.' },
  { id: 'sprint', title: 'האצות קצרות 10–20 מטר', type: 'מהירות', minutes: 14, level: 'בינוני', goals: ['מהירות'], positions: allPositions, text: 'בצע האצות חדות עם מנוחה מלאה בין חזרה לחזרה.' },
  { id: 'reaction', title: 'תגובה ויציאה לכדור', type: 'מהירות', minutes: 12, level: 'בינוני', goals: ['מהירות', 'טכניקה'], positions: ['שוער', 'בלם', 'מגן ימני', 'מגן שמאלי', 'קשר אחורי', 'קשר מרכזי'], text: 'התחל מעמידה ניטרלית וצא לכיוון שהמאמן מסמן.' },
  { id: 'intervals', title: 'ריצות אינטרוולים', type: 'סיבולת', minutes: 18, level: 'בינוני', goals: ['סיבולת'], positions: allPositions, text: 'החלף בין קטעי ריצה מהירים לקצב התאוששות נשלט.' },
  { id: 'shuttle', title: 'ריצות שינוי כיוון', type: 'סיבולת', minutes: 16, level: 'בינוני', goals: ['סיבולת', 'מהירות'], positions: ['שוער', 'בלם', 'מגן ימני', 'מגן שמאלי', 'קשר אחורי', 'קשר מרכזי', 'קשר התקפי'], text: 'רוץ בין נקודות, האט בשליטה והאץ מחדש בלי לאבד יציבה.' },
  { id: 'strength', title: 'כוח רגליים ומשקל גוף', type: 'כוח', minutes: 16, level: 'מתחיל', goals: ['כוח'], positions: allPositions, text: 'סקוואט, לאנג׳, גשר ותרגילי ליבה בטווח תנועה נוח.' },
  { id: 'keeper', title: 'קליטה וניתור לשוער', type: 'שוערים', minutes: 16, level: 'מתחיל', goals: ['טכניקה', 'מהירות'], positions: ['שוער'], text: 'תרגל עמידת מוצא, קליטת כדור וניתור לצדדים בהדרגה.' },
  { id: 'keeper-feet', title: 'משחק רגל לשוער', type: 'שוערים', minutes: 14, level: 'בינוני', goals: ['טכניקה'], positions: ['שוער'], text: 'קבלה תחת לחץ, מסירה קצרה והעברת משחק לרגל הרחוקה.' },
  { id: 'finish', title: 'סיומת לשער משתי רגליים', type: 'סיומת', minutes: 15, level: 'בינוני', goals: ['טכניקה', 'מהירות'], positions: ['חלוץ', 'כנף ימני', 'כנף שמאלי', 'קשר התקפי'], text: 'קבל בתנועה וסיים בנגיעה או שתיים, פעם בכל צד.' },
  { id: 'cross', title: 'הרמה ותנועה לרחבה', type: 'טכניקה', minutes: 14, level: 'בינוני', goals: ['טכניקה'], positions: ['מגן ימני', 'מגן שמאלי', 'כנף ימני', 'כנף שמאלי'], text: 'הרם אחרי נגיעה קדימה ותרגל מסירות לאזורי מטרה שונים.' },
  { id: 'aerial', title: 'תזמון ונגיחות', type: 'הגנה', minutes: 12, level: 'בינוני', goals: ['כוח', 'טכניקה'], positions: ['שוער', 'בלם', 'חלוץ'], text: 'התמקד בתזמון, מיקום הגוף ונחיתה בטוחה.' },
  { id: 'recovery', title: 'שחרור ותנועתיות', type: 'התאוששות', minutes: 10, level: 'מתחיל', goals, positions: allPositions, text: 'הליכה קלה, נשימה ותנועתיות עדינה ללא כאב.' },
];
const defaultProfile = { position: 'קשר מרכזי', level: 'בינוני', goal: 'טכניקה', days: 4 };
const navigation = [
  { id: 'home', label: 'סקירה' },
  { id: 'plan', label: 'תוכנית אימונים' },
  { id: 'library', label: 'ספריית תרגילים' },
  { id: 'progress', label: 'התקדמות' },
];

function stored(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}

function todayKey() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function makeProgram(profile) {
  const matching = drills.filter((drill) => drill.positions.includes(profile.position) && drill.goals.includes(profile.goal) && rank[drill.level] <= rank[profile.level]);
  const fallback = drills.filter((drill) => drill.positions.includes(profile.position) && !matching.includes(drill));
  const main = [...matching, ...fallback].filter((drill) => !['הכנה', 'התאוששות'].includes(drill.type));
  const warm = drills.find((drill) => drill.id === 'warm');
  const recovery = drills.find((drill) => drill.id === 'recovery');
  const names = ['טכניקה ותנועה', 'כושר ואתלטיות', 'אימון עמדה', 'חידוד והתאוששות'];
  return Array.from({ length: profile.days }, (_, index) => {
    const selected = [warm, main[(index * 2) % main.length], main[(index * 2 + 1) % main.length], recovery];
    const unique = selected.filter((drill, itemIndex) => selected.findIndex((item) => item.id === drill.id) === itemIndex);
    return { id: `session-${index + 1}`, name: names[index], drills: unique, minutes: unique.reduce((sum, drill) => sum + drill.minutes, 0) };
  });
}

function lastSevenDays(log) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    return { key, short: new Intl.DateTimeFormat('he-IL', { weekday: 'short' }).format(date), day: date.getDate(), count: log.filter((item) => item.date === key).length, today: index === 6 };
  });
}

function App() {
  const [profile, setProfile] = useState(() => stored('playform-profile', defaultProfile));
  const [log, setLog] = useState(() => stored('playform-log', []));
  const [page, setPage] = useState('home');
  const [session, setSession] = useState(null);
  const [checked, setChecked] = useState([]);
  const [filter, setFilter] = useState('הכול');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const program = makeProgram(profile);
  const week = lastSevenDays(log);
  const categories = ['הכול', ...new Set(drills.map((drill) => drill.type))];
  const doneToday = new Set(log.filter((item) => item.date === todayKey()).map((item) => item.sessionId));
  const next = program.find((item) => !doneToday.has(item.id)) || program[0];
  const completedToday = log.filter((item) => item.date === todayKey()).length;
  const weeklyCount = week.reduce((sum, day) => sum + day.count, 0);
  const filtered = drills.filter((drill) => (filter === 'הכול' || drill.type === filter) && `${drill.title} ${drill.type} ${drill.text}`.includes(search.trim()));

  useEffect(() => localStorage.setItem('playform-profile', JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem('playform-log', JSON.stringify(log)), [log]);

  function updateProfile(key, value) { setProfile((current) => ({ ...current, [key]: value })); }
  function startSession(item) { setSession(item); setChecked([]); }
  function completeSession() {
    if (doneToday.has(session.id)) return;
    setLog((current) => [...current, { id: `${session.id}-${Date.now()}`, sessionId: session.id, name: session.name, date: todayKey(), minutes: session.minutes }]);
    setSession(null);
    setToast('האימון נשמר. עבודה טובה!');
    window.setTimeout(() => setToast(''), 2600);
  }

  return <div className="app">
    <aside className="sidebar">
      <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); setPage('home'); }}><span className="brand-ball">●</span><span>PLAY<span>FORM</span></span></a>
      <p className="side-label">מרחב השחקן</p>
      <nav aria-label="ניווט ראשי">{navigation.map((item, index) => <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => setPage(item.id)}><small>0{index + 1}</small>{item.label}<span>←</span></button>)}</nav>
      <div className="pitch" aria-hidden="true"><i /><b /><span /><em /></div>
      <p className="motto">התקדמות נבנית<br /><strong>אימון אחרי אימון.</strong></p>
      <small className="local-note">הנתונים נשמרים במכשיר הזה</small>
    </aside>
    <main className="main">
      <header className="topbar"><span><b>PLAYFORM</b><i>/</i>{navigation.find((item) => item.id === page)?.label}</span><div><small>עונת 2025 / 26</small><b className="avatar">{profile.position[0]}</b></div></header>
      {page === 'home' && <section className="content">
        <div className="heading"><div><p className="eyebrow">אזור השחקן שלך</p><h1>בונים משחק.<br /><span>מתקדמים כל יום.</span></h1><p className="intro">תוכנית אישית ל{profile.position}, רמה {profile.level}, מיקוד {profile.goal}.</p></div><div className="today-date"><small>היום</small><strong>{new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long' }).format(new Date())}</strong><small>{new Intl.DateTimeFormat('he-IL', { weekday: 'long' }).format(new Date())}</small></div></div>
        <div className="dashboard">
          <div className="column">
            <section className="hero"><div className="hero-copy"><small className="hero-label"><i /> התוכנית השבועית שלך</small><p>האימון הבא שלך</p><h2>{next.name}</h2><small>{next.drills.slice(1, 3).map((drill) => drill.title).join(' · ')}</small><div className="hero-meta"><span>{next.minutes} דקות</span><i />{next.drills.length} תחנות<i />מיקוד {profile.goal}</div><button className="primary" onClick={() => startSession(next)}>פתח אימון <b>←</b></button></div><div className="hero-art"><span className="ring ring-one" /><span className="ring ring-two" /><span className="ball">●</span><small>{profile.position.toUpperCase()}<br />{profile.goal.toUpperCase()}</small></div></section>
            <section className="block"><div className="section-head"><div><small>הקצב שלך</small><h2>השבוע במגרש</h2></div><button onClick={() => setPage('progress')}>לכל ההתקדמות ←</button></div><div className="week-chart">{week.map((day) => <div className={`week-day ${day.today ? 'is-today' : ''}`} key={day.key}><small>{day.short}</small><div className="bar-track"><span style={{ height: `${day.count ? Math.min(100, 35 + day.count * 24) : 7}%` }} /></div><small>{day.day}</small></div>)}<div className="week-total"><b>{weeklyCount}</b><small>אימונים<br />השבוע</small></div></div></section>
            <section className="block"><div className="section-head"><div><small>נבנה לפי הפרופיל שלך</small><h2>מה בתוכנית</h2></div><button onClick={() => setPage('plan')}>לכל התוכנית ←</button></div><div className="session-list">{program.slice(0, 3).map((item, index) => <button className="session-row" key={item.id} onClick={() => startSession(item)}><small>0{index + 1}</small><span><b>{item.name}</b><small>{item.drills.slice(1, 3).map((drill) => drill.type).join(' · ')}</small></span><small>{item.minutes} דק׳</small><i>←</i></button>)}</div></section>
          </div>
          <aside className="rail">
            <section className="card profile"><div className="card-title"><b>פרופיל שחקן</b><small>עריכה</small></div><label htmlFor="position">עמדה במגרש</label><select id="position" value={profile.position} onChange={(event) => updateProfile('position', event.target.value)}>{positions.map((item) => <option key={item}>{item}</option>)}</select><label htmlFor="level">רמת משחק</label><select id="level" value={profile.level} onChange={(event) => updateProfile('level', event.target.value)}>{levels.map((item) => <option key={item}>{item}</option>)}</select><label htmlFor="goal">מטרה מרכזית</label><select id="goal" value={profile.goal} onChange={(event) => updateProfile('goal', event.target.value)}>{goals.map((item) => <option key={item}>{item}</option>)}</select><label className="days-label" htmlFor="days">אימונים בשבוע <b>{profile.days}</b></label><input id="days" type="range" min="2" max="4" value={profile.days} onChange={(event) => updateProfile('days', Number(event.target.value))} /><div className="range-ends"><small>2 ימים</small><small>4 ימים</small></div></section>
            <section className="card count-card"><small>היום שלך</small><div><strong>{String(completedToday).padStart(2, '0')}</strong><span>/ {profile.days} אימונים הושלמו</span></div><div className="progress-track"><span style={{ width: `${Math.min(100, completedToday / profile.days * 100)}%` }} /></div><p>{completedToday ? 'כל אימון הוא צעד קדימה.' : 'האימון הראשון שלך עוד מחכה.'}</p></section>
            <p className="safety">אימון טוב מתחיל בהקשבה לגוף. עצור אם מופיע כאב והתאם את העומס למצבך.</p>
          </aside>
        </div>
      </section>}
      {page === 'plan' && <section className="content"><div className="heading"><div><p className="eyebrow">התוכנית שלך</p><h1>תוכנית האימונים<br /><span>של {profile.position}.</span></h1><p className="intro">{program.length} אימונים בשבוע · מיקוד {profile.goal} · רמה {profile.level}</p></div></div><div className="program-grid">{program.map((item, index) => <article className="program-card" key={item.id}><div><small>אימון 0{index + 1}</small><small>{doneToday.has(item.id) ? 'הושלם ✓' : `${item.minutes} דקות`}</small></div><h2>{item.name}</h2>{item.drills.map((drill) => <p key={drill.id}><i />{drill.title}<small>{drill.minutes} דק׳</small></p>)}<button className="outline" onClick={() => startSession(item)}>{doneToday.has(item.id) ? 'לצפייה באימון' : 'התחל אימון'} ←</button></article>)}</div><p className="disclaimer">התוכנית היא הצעה כללית. יש להתאים את העומס לגיל, לניסיון ולמצב הגופני שלך.</p></section>}
      {page === 'library' && <section className="content"><div className="heading"><div><p className="eyebrow">ארגז הכלים שלך</p><h1>ספריית<br /><span>התרגילים.</span></h1><p className="intro">תרגילים לכל עמדה, רמה ומטרת משחק.</p></div><div className="today-date"><small>תרגילים</small><strong>{filtered.length}</strong><small>בספרייה</small></div></div><label className="search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="חיפוש תרגיל או מיומנות" aria-label="חיפוש תרגילים" /></label><div className="filters">{categories.map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>{filtered.length ? <div className="drill-grid">{filtered.map((drill, index) => <article className="drill-card" key={drill.id}><div className={`drill-art art-${index % 4}`}><small>0{index + 1}</small><b>{drill.type}</b><span /></div><div className="drill-body"><small>{drill.type} <i /> {drill.minutes} דק׳</small><h2>{drill.title}</h2><p>{drill.text}</p><div><span>{drill.level}</span><span>{drill.goals.includes(profile.goal) ? 'מתאים למטרה שלך' : drill.goals[0]}</span></div></div></article>)}</div> : <div className="empty"><b>לא מצאנו תרגיל כזה</b><p>נסה מילה אחרת או קטגוריה שונה.</p></div>}</section>}
      {page === 'progress' && <section className="content"><div className="heading"><div><p className="eyebrow">הנתונים שלך</p><h1>רואים את<br /><span>העבודה.</span></h1><p className="intro">כל אימון שהשלמת מקרב אותך ליעד הבא.</p></div><div className="today-date"><small>אימונים השבוע</small><strong>{weeklyCount}</strong><small>היעד: {profile.days}</small></div></div><div className="metrics"><article><small>אימונים ב־7 ימים</small><b>{weeklyCount}</b><small>יעד אישי: {profile.days}</small></article><article><small>דקות אימון</small><b>{log.reduce((sum, item) => sum + item.minutes, 0)}</b><small>זמן מצטבר</small></article><article><small>אימונים שהושלמו</small><b>{log.length}</b><small>מאז תחילת המעקב</small></article></div><section className="block chart-block"><div className="section-head"><div><small>עקביות מנצחת</small><h2>שבעת הימים האחרונים</h2></div></div><div className="large-chart">{week.map((day) => <div className={`large-day ${day.today ? 'is-today' : ''}`} key={day.key}><small>{day.count || ''}</small><div><span style={{ height: `${day.count ? Math.min(90, 25 + day.count * 25) : 3}%` }} /></div><small>{day.short} {day.day}</small></div>)}</div></section><section className="block"><div className="section-head"><div><small>יומן עבודה</small><h2>האימונים האחרונים</h2></div>{log.length > 0 && <button className="reset" onClick={() => setLog([])}>איפוס היסטוריה</button>}</div>{log.length ? [...log].reverse().slice(0, 8).map((item) => <div className="history-row" key={item.id}><b>✓</b><strong>{item.name}</strong><span>{item.minutes} דקות</span><small>{new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'short' }).format(new Date(`${item.date}T12:00:00`))}</small></div>) : <div className="empty"><b>האימון הראשון עוד לפניך</b><p>השלם אימון מהתוכנית והמעקב יתחיל להתמלא.</p></div>}</section></section>}
    </main>
    {session && <div className="modal-bg" onMouseDown={(event) => { if (event.target === event.currentTarget) setSession(null); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header><small>{session.minutes} דקות · {session.drills.length} תחנות</small><button onClick={() => setSession(null)} aria-label="סגירה">×</button></header><h2 id="modal-title">{session.name}</h2><p className="modal-intro">סמן כל תחנה לאחר שביצעת אותה. קח מנוחה לפי הצורך.</p>{session.drills.map((drill, index) => <label className={`modal-drill ${checked.includes(drill.id) ? 'checked' : ''}`} key={drill.id}><input type="checkbox" checked={checked.includes(drill.id)} onChange={() => setChecked((current) => current.includes(drill.id) ? current.filter((id) => id !== drill.id) : [...current, drill.id])} /><small>0{index + 1}</small><span><b>{drill.title}</b><small>{drill.text}</small></span><small>{drill.minutes} דק׳</small></label>)}{doneToday.has(session.id) ? <p className="done-message">האימון כבר הושלם היום ✓</p> : <button className="primary finish" disabled={checked.length !== session.drills.length} onClick={completeSession}>{checked.length === session.drills.length ? 'סיימתי את האימון' : `סמן את כל התחנות · ${checked.length}/${session.drills.length}`} ←</button>}<p className="modal-safety">התאם את הקצב ליכולת שלך. כאב הוא סימן לעצור.</p></section></div>}
    {toast && <div className="toast" role="status">✓ {toast}</div>}
  </div>;
}

export default App;