const demoVideos = [
  { title: 'חימום דינמי עם כדור', url: 'https://www.youtube.com/watch?v=OL2_OrmhjW0' },
  { title: 'קבלה וסריקה לפני מסירה', url: 'https://www.youtube.com/watch?v=EK2LaTBUH04' },
  { title: 'כדרור ושינויי כיוון', url: 'https://www.youtube.com/watch?v=jTCC-QO0wdY' },
  { title: 'מסירות בקצב משתנה', url: 'https://www.youtube.com/watch?v=J5rz5LsUiMY' },
  { title: 'האצות קצרות 10–20 מטר', url: 'https://www.youtube.com/watch?v=LrrlCoBS7lQ' },
  { title: 'תגובה ויציאה לכדור', url: 'https://www.youtube.com/watch?v=PLapwq4EWCM' },
  { title: 'ריצות אינטרוולים', url: 'https://www.youtube.com/watch?v=Mkr4GLC0zB8' },
  { title: 'ריצות שינוי כיוון', url: 'https://www.youtube.com/watch?v=Mkr4GLC0zB8' },
  { title: 'כוח רגליים ומשקל גוף', url: 'https://www.youtube.com/watch?v=S0AI2KSjAMw' },
  { title: 'קליטה וניתור לשוער', url: 'https://www.youtube.com/watch?v=Drc5vt-AJAY' },
  { title: 'משחק רגל לשוער', url: 'https://www.youtube.com/watch?v=IVoEm6RAmKo' },
  { title: 'סיומת לשער משתי רגליים', url: 'https://www.youtube.com/watch?v=1VFHkEmOvJM' },
  { title: 'הרמה ותנועה לרחבה', url: 'https://www.youtube.com/watch?v=sh03KDmw_6c' },
  { title: 'תזמון ונגיחות', url: 'https://www.youtube.com/watch?v=Z-YJ0FtNHs8' },
  { title: 'שחרור ותנועתיות', url: 'https://www.youtube.com/watch?v=Ri7vLhTLoVM' },
];

// Change the existing demo links from YouTube search pages to direct video pages.
document.addEventListener('click', (event) => {
  const link = event.target.closest('a.video-link');
  if (!link) return;

  const container = link.closest('.drill-card, .modal-drill');
  const title = container?.querySelector('h2, label b')?.textContent?.trim();
  const video = demoVideos.find((item) => item.title === title);
  if (video) link.href = video.url;
});
