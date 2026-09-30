// videoUrl u lessons.js može biti: jedan link; lista linkova (lekcija iz više delova, dugmad
// dobijaju naziv „Deo 1“, „Deo 2“…); ili lista { url, label } kada delovi imaju sopstvene nazive
// (npr. { url: '...', label: 'Čokoladni biskvit' }) — tada dugme nosi taj naziv.
export function videoParts(lesson) {
  const value = lesson.videoUrl;
  const list = Array.isArray(value) ? value : value ? [value] : [];
  return list
    .filter(Boolean)
    .map((item, i) => (typeof item === 'string' ? { url: item, label: `Deo ${i + 1}` } : { url: item.url, label: item.label || `Deo ${i + 1}` }))
    .filter((p) => p.url);
}

export function videoList(lesson) {
  return videoParts(lesson).map((p) => p.url);
}

// Stanje lekcije određuju podaci iz lessons.js i pristupni kod — raspored se ne menja.
export function lessonState(lesson, hasAccess = false) {
  if (lesson.isLocked && !hasAccess) return 'locked';
  return videoList(lesson).length ? 'playable' : 'soon';
}

// YouTube se pušta preko IFrame API-ja (ne kao običan <iframe>), da bismo prekrili njegov plejer
// sopstvenim dugmićima — sprečava da se do pravog linka dođe preko YouTube-ovog menija (desni klik
// / dugo pritiskanje: „Kopiraj link videa“). Vidi YouTubePlayer u Lessons.jsx.
const youtube = (id) => ({ kind: 'youtube', id });

let ytApiPromise;
// Učitava YouTube IFrame API jednom (deli ga sve lekcije na strani) i vraća Promise koji se
// razrešava kad je window.YT.Player spreman za upotrebu. Odbija (reject) brzo i pouzdano ako
// skriptu blokira ad-block/mreža — bez ovoga bi se to primetilo tek posle dugog čekanja na tajmer.
export function loadYouTubeApi() {
  if (typeof window === 'undefined') return Promise.reject(new Error('nema window'));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve, reject) => {
    const prethodni = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prethodni?.();
      resolve(window.YT);
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = () => {
      ytApiPromise = null; // sledeći pokušaj (drugi video) ne sme da nasledi ovo odbijeno stanje
      reject(new Error('YouTube API skripta nije uspela da se učita'));
    };
    document.head.appendChild(script);
  });
  return ytApiPromise;
}

// Google Drive ne podržava automatsko puštanje: posle našeg „Pusti“ korisnik dodirne i njegovo dugme.
// shield: Drive u uglu plejera ima dugme „otvori u novom prozoru“ koje otkriva link videa, pa se prekriva.
const googleDrive = (id) => ({
  kind: 'iframe',
  src: `https://drive.google.com/file/d/${id}/preview`,
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
