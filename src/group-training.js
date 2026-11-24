import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const STORAGE_KEY = 'playform-training-group';
const MAX_PARTICIPANTS = 10;

function loadGroup() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Number.isInteger(saved.count) && Array.isArray(saved.names)) {
      const count = Math.min(MAX_PARTICIPANTS, Math.max(1, saved.count));
      return { count, names: Array.from({ length: count }, (_, index) => saved.names[index] || '') };
    }
  } catch {
    // Use the default single-person setup when storage is unavailable or invalid.
  }
  return { count: 1, names: [''] };
}

function GroupTraining() {
  const [group, setGroup] = useState(loadGroup);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(group)); } catch {
      // The control remains usable even if browser storage is disabled.
    }
  }, [group]);

  function changeCount(value) {
    const count = Math.min(MAX_PARTICIPANTS, Math.max(1, Number(value) || 1));
    setGroup((current) => ({
      count,
      names: Array.from({ length: count }, (_, index) => current.names[index] || ''),
    }));
  }

  function changeName(index, name) {
    setGroup((current) => ({
      ...current,
      names: current.names.map((value, nameIndex) => nameIndex === index ? name : value),
    }));
  }

  return <div dir="rtl" className={`group-training ${open ? 'is-open' : ''}`}>
    <button className="group-training-toggle" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
      <span aria-hidden="true">👥</span>
      <span>{open ? 'סגירה' : `אימון משותף · ${group.count}`}</span>
    </button>
    {open && <section className="group-training-panel" aria-label="הגדרת אימון משותף">
      <div className="group-training-heading">
        <div><small>מתאמנים יחד</small><h2>כמה שחקנים?</h2></div>
        <button type="button" aria-label="סגירה" onClick={() => setOpen(false)}>×</button>
      </div>
      <label className="group-count-label" htmlFor="group-count">מספר משתתפים</label>
      <select id="group-count" value={group.count} onChange={(event) => changeCount(event.target.value)}>
        {Array.from({ length: MAX_PARTICIPANTS }, (_, index) => index + 1).map((count) =>
          <option value={count} key={count}>{count} {count === 1 ? 'שחקן' : 'שחקנים'}</option>
        )}
      </select>
      <div className="group-names">
        {group.names.map((name, index) => <label key={index} htmlFor={`group-player-${index}`}>
          <span>שחקן/ית {index + 1}</span>
          <input id={`group-player-${index}`} value={name} onChange={(event) => changeName(index, event.target.value)} placeholder={`שם שחקן/ית ${index + 1}`} />
        </label>)}
      </div>
      <p>ההגדרה נשמרת במכשיר הזה.</p>
    </section>}
    <style>{`
      .group-training { position: fixed; z-index: 1000; right: 24px; bottom: 24px; direction: rtl; font-family: inherit; color: #1b2821; }
      .group-training-toggle { display: flex; align-items: center; gap: 9px; border: 0; border-radius: 999px; padding: 12px 18px; color: #fff; background: #174b37; box-shadow: 0 8px 26px #14271f35; font: inherit; font-weight: 700; cursor: pointer; }
      .group-training-toggle:hover { background: #123d2d; }
      .group-training-panel { position: absolute; right: 0; bottom: 58px; width: min(340px, calc(100vw - 32px)); max-height: min(70vh, 560px); overflow: auto; box-sizing: border-box; padding: 20px; border: 1px solid #dfe3d9; border-radius: 18px; background: #fbfcf8; box-shadow: 0 14px 40px #14271f26; }
      .group-training-heading { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
      .group-training-heading small, .group-training-panel p { color: #77837a; }
      .group-training-heading h2 { margin: 3px 0 0; font-size: 20px; }
      .group-training-heading button { border: 0; background: transparent; color: #536057; font-size: 25px; cursor: pointer; }
      .group-count-label, .group-names label { display: block; margin: 12px 0 6px; font-size: 13px; font-weight: 600; }
      .group-training-panel select, .group-training-panel input { box-sizing: border-box; width: 100%; padding: 10px 12px; border: 1px solid #dfe3d9; border-radius: 9px; background: #fff; color: #1b2821; font: inherit; }
      .group-names { max-height: 230px; overflow: auto; }
      .group-training-panel p { margin: 14px 0 0; font-size: 12px; }
      @media (max-width: 600px) { .group-training { right: 14px; bottom: 14px; } .group-training-panel { bottom: 56px; } }
    `}</style>
  </div>;
}

const widget = document.createElement('div');
widget.id = 'group-training-widget';
document.body.appendChild(widget);
createRoot(widget).render(<GroupTraining />);
