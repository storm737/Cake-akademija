// Video lekcije programa „Od torte do savršenstva“ — jedna lekcija po modulu.
//
// Naslov, opis i teme lekcije preuzimaju se iz programa (src/data/content.js → modules),
// pa se tekst menja samo na jednom mestu. Ovde su samo podaci o videu.
//
// Kako radi prikaz:
//  • isLocked: true              → lekcija iz programa; bez pristupnog koda prikazuje katanac,
//                                  a posle unosa koda (src/data/accessKeys.js) se otključava
//  • isLocked: false             → besplatna lekcija, dostupna svima
//  • videoUrl popunjen           → otključana lekcija se pušta u plejeru
//  • videoUrl prazan             → otključana lekcija prikazuje najavu „Video stiže uskoro“
//
// Za dodavanje videa dovoljno je upisati link u videoUrl — plejer se sam uključuje.
// Lekcija iz više delova: upiši listu linkova, npr. videoUrl: ['link 1', 'link 2'] — ispod
// plejera se pojavljuju dugmad „Deo 1“, „Deo 2“… Za sopstveni naziv dela upiši { url, label }
// umesto samog linka, npr. videoUrl: [{ url: 'link 1', label: 'Čokoladni biskvit' }, 'link 2'].
// Podržano: YouTube (watch, youtu.be, shorts, embed), Vimeo, Google Drive
// (fajl mora biti podeljen sa „Svako ko ima link“) i direktni .mp4/.webm fajlovi.
//
// ratio = oblik snimka: širina / visina. Uspravan snimak (snimljen telefonom) je 9 / 16, položen 16 / 9
// (ako se izostavi, važi 16 / 9). Preko celog ekrana snimak popunjava ekran bez crnih traka
// samo ako je ratio tačan; pogrešan ratio ostavlja trake.
//
// icon = ikona na kartici lekcije (kapa, torta, mutilica, cinija, sastavljanje, dresir,
// oklagija, spratna, sijalica, link, fotoaparat, radnja); thumbnail = slika u plejeru.

import { modules } from './content';

const thumb = (slug) => `/assets/radovi/${slug}-640.webp`;

const videos = [
  {
    module: '01',
    icon: 'kapa',
    isLocked: true,
    thumbnail: '/assets/maja/portret-1080.webp',
    ratio: 9 / 16,
    videoUrl: 'https://youtu.be/lIBjLp79SqM',
  },
  {
    module: '02',
    icon: 'torta',
    isLocked: true,
    thumbnail: thumb('svadbena-gipsofila'),
    ratio: 9 / 16,
    videoUrl: 'https://youtu.be/k0J7NShayv8',
  },
  {
    module: '03',
    icon: 'mutilica',
    isLocked: true,
    thumbnail: thumb('naked-torta-ruze'),
    ratio: 9 / 16,
    videoUrl: [
      { url: 'https://youtu.be/GjqYD9Ph0Sw', label: 'Čokoladni biskvit' },
      { url: 'https://youtu.be/nkTzfEtas0Q', label: 'Kore od belanaca' },
      { url: 'https://youtu.be/0JpEBWLoHps', label: 'Šuškave sušene kore' },
    ],
  },
  {
    module: '04',
    icon: 'cinija',
    isLocked: true,
    thumbnail: thumb('cokoladni-volani-ombre'),
    ratio: 9 / 16,
    videoUrl: [
      { url: 'https://youtu.be/SCcEjmK-0AU', label: 'Čokoladni fil' },
      { url: 'https://youtu.be/INGmcZi7yho', label: 'Žuti fil' },
    ],
  },
  { module: '05', icon: 'sastavljanje', isLocked: true, thumbnail: thumb('torta-knjiga-ruze'), videoUrl: '' },
  { module: '06', icon: 'dresir', isLocked: true, thumbnail: thumb('bozuri-zlatni-listici'), videoUrl: '' },
  { module: '07', icon: 'oklagija', isLocked: true, thumbnail: thumb('torta-zamak'), videoUrl: '' },
  { module: '08', icon: 'spratna', isLocked: true, thumbnail: thumb('svadbena-roze-lila'), videoUrl: '' },
  { module: '09', icon: 'sijalica', isLocked: true, thumbnail: thumb('zlatni-i-crveni-listovi'), videoUrl: '' },
  { module: '10', icon: 'link', isLocked: true, thumbnail: thumb('lavanda-zlatni-obruc'), videoUrl: '' },
  { module: '11', icon: 'fotoaparat', isLocked: true, thumbnail: thumb('karamel-tekstura-pampas'), videoUrl: '' },
  { module: '12', icon: 'radnja', isLocked: true, thumbnail: thumb('spratna-cvetna-torta'), videoUrl: '' },
];

// Uvodni video u velikom plejeru iznad liste lekcija (npr. kratko predstavljanje programa).
// Nije deo modula i vidljiv je svima (isLocked: false). Kada video stigne, upiši link u videoUrl.
export const introVideo = {
  id: 'uvod',
  label: 'Uvod',
  title: 'Uvod u program',
  description:
    'Program koji objedinjuje znanje o izradi i dekoraciji torti sa praktičnim smernicama za rad sa klijentima i postavljanje zdravih temelja za cake biznis.',
  details: [],
  topics: [],
  icon: 'kapa',
  isLocked: false,
  thumbnail: '/assets/maja/portret-1080.webp',
  videoUrl: '',
};

export const lessons = videos.map((video, i) => {
  const mod = modules.find((m) => m.number === video.module);
  if (!mod) throw new Error(`Lekcija ${i + 1}: modul ${video.module} ne postoji u src/data/content.js`);
  const topics = mod.topics ?? [];
  return {
    id: i + 1,
    ...video,
    // Oznaka na kartici („Modul 01“…); može se zameniti poljem label u videos
    label: video.label ?? `Modul ${video.module}`,
    title: mod.title,
    // Kratak opis za karticu: prva rečenica opisa ili spisak tema
    description: mod.body[0] ?? topics.join(' · '),
    details: mod.body,
    topics,
  };
});
