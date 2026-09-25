import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from './accessKeys.js';

// Osnovni podaci o akademiji — menjaju se na jednom mestu.
// Instagram nalog i pristupni kodovi su u src/data/accessKeys.js.
export const site = {
  name: 'Cool Cakes Akademija',
  program: 'Od torte do savršenstva',
  brand: 'Cool Cakes by Maja',
  instructor: 'Maja',
  location: 'Pirot, Srbija',

  // Adresa sajta kada bude objavljen, npr. 'https://www.tvojdomen.rs' (bez kose crte na kraju).
  // Koristi se za SEO: kanonski link, slika za deljenje, robots.txt i sitemap.xml.
  // Dok je prazno, ove oznake se ne prave. Može i pri izradi: SITE_URL=https://... npm run build
  url: 'https://coolcakeakademija.com',

  // SEO: naslov (do ~60 znakova) i opis (do ~160) koje pretraga prikazuje, tekst za deljenje na
  // društvenim mrežama i slika za deljenje (1200×630, fajl u public/assets)
  seo: {
    title: 'Online kurs izrade torti — Cool Cakes Akademija',
    description:
      'Online kurs izrade i dekoracije torti korak po korak: od osnova do profesionalne torte i cake biznisa. Video lekcije Maje iz Cool Cakes Akademije.',
    shareTitle: 'Od torte do savršenstva — online kurs izrade torti',
    shareDescription: 'Online edukacija korak po korak: od osnova do profesionalne torte, i od torte do posla.',
    shareImage: '/assets/og-slika.jpg',
    shareImageSize: [1200, 630],
    shareImageAlt: 'Cool Cakes Akademija — Od torte do savršenstva: online kurs izrade torti sa Majom',
  },

  cohort: 'I generaciju',

  price: {
    current: 350,
    regular: 500,
    currency: '€',
    label: 'Cena za prvu generaciju',
  },

  // Uslovi pristupa prikazani na kartici sa cenom
  access: 'Vraćaš se na lekcije i ponavljaš ih',

  // Upis ide preko prijave (ime, prezime, telefon) koja stiže mejlom; Maja se javlja polaznici,
  // a nakon uplate ona dobija pristupni kod.
  // Mejl na koji stižu prijave (šalje se preko formsubmit.co). Prvo slanje traži jednokratnu potvrdu:
  // FormSubmit šalje link za aktivaciju na tu adresu, pa probaj prijavu pre objave sajta.
  // Posle aktivacije mejl daje nasumičan kod; upiši ga ovde umesto adrese da se adresa ne vidi u kodu sajta.
  enrollEmail: 'coolcakeakademija@gmail.com',
  enrollNote: 'Popuni prijavu, a Maja ti se javlja da dogovorite uplatu.',

  instagram: [
    { handle: INSTAGRAM_HANDLE, url: INSTAGRAM_URL },
    { handle: 'coolcakes.maja', url: 'https://www.instagram.com/coolcakes.maja/' },
  ],

  // Popuni kada budu dostupni — prazna polja se ne prikazuju
  email: '',
  phone: '',
};

export const formatPrice = (value) => `${value} ${site.price.currency}`;
