// videoUrl u lessons.js može biti jedan link ili lista linkova (lekcija iz više delova)
export function videoList(lesson) {
  const value = lesson.videoUrl;
  if (Array.isArray(value)) return value.filter(Boolean);
  return value ? [value] : [];
}

// Stanje lekcije određuju podaci iz lessons.js i pristupni kod — raspored se ne menja.
export function lessonState(lesson, hasAccess = false) {
  if (lesson.isLocked && !hasAccess) return 'locked';
  return videoList(lesson).length ? 'playable' : 'soon';
}

const youtube = (id) => ({
  kind: 'iframe',
  src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
});

// Google Drive ne podržava automatsko puštanje, pa se njegov plejer prikazuje odmah.
// shield: Drive u uglu plejera ima dugme „otvori u novom prozoru“ koje otkriva link videa, pa se prekriva.
const googleDrive = (id) => ({
  kind: 'iframe',
  src: `https://drive.google.com/file/d/${id}/preview`,
  autoplay: false,
  shield: true,
});

// Pretvara običan link u adresu za ugrađeni plejer
export function toPlayer(url) {
  if (!url) return null;
  let u;
  try {
    u = new URL(url, window.location.origin);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, '');
  const parts = u.pathname.split('/').filter(Boolean);

  if (host === 'youtu.be') return youtube(parts[0]);
  if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
    if (parts[0] === 'embed' || parts[0] === 'shorts' || parts[0] === 'live') return youtube(parts[1]);
    const v = u.searchParams.get('v');
    if (v) return youtube(v);
  }
  if (host === 'drive.google.com') {
    // drive.google.com/file/d/ID/view · /preview · /edit, ili ?id=ID
    const id = parts[0] === 'file' && parts[1] === 'd' ? parts[2] : u.searchParams.get('id');
    if (id) return googleDrive(id);
  }
  if (host === 'vimeo.com' && parts[0]) {
    const hash = parts[1] ? `&h=${parts[1]}` : '';
    return { kind: 'iframe', src: `https://player.vimeo.com/video/${parts[0]}?autoplay=1&dnt=1${hash}` };
  }
  if (host === 'player.vimeo.com') {
    u.searchParams.set('autoplay', '1');
    return { kind: 'iframe', src: u.toString() };
  }
  if (/\.(mp4|webm|ogg|mov)$/i.test(u.pathname)) return { kind: 'file', src: u.toString() };

  return { kind: 'iframe', src: u.toString() };
}
