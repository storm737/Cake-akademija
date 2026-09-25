
// Sadržaj sajta preuzet iz dokumenta „Online program Cool Cakes Akademije…“,
// infografika programa i teksta „O meni“.

export const nav = [
  { href: '#o-akademiji', label: 'O akademiji' },
  { href: '#program', label: 'Program edukacije' },
  { href: '#video-lekcije', label: 'Video lekcije' },
  { href: '#galerija', label: 'Galerija' },
  { href: '#cena', label: 'Cena i upis' },
  { href: '#faq', label: 'Česta pitanja' },
];

export const hero = {
  marks: ['Online edukacija', 'Korak po korak', 'Od osnova do profesionalne torte'],
  titleTop: 'Od torte',
  titleBottom: 'do savršenstva',
  lead:
    'Online program Cool Cakes Akademije za žene koje žele da unaprede svoje znanje, podignu kvalitet svojih torti i nauče kako da svoje veštine pretvore u ozbiljniju ponudu.',
  // Citat za naslovni kolaž (tekst dostavljen uz redizajn — potvrditi sa Majom pre objave)
  quote: {
    text: 'Poslastičarstvo nije samo recept, već način da kroz detalje i teksture stvoriš emociju.',
    author: 'Maja',
  },
};

export const story = {
  paragraphs: [
    'Možda si počela iz ljubavi, a vremenom su stigle i prve porudžbine. Možda još uvek samo razmišljaš da li bi od svog hobija mogla da napraviš nešto više.',
    'U svakom slučaju, postoji trenutak kada recepti i nasumični tutorijali više nisu dovoljni.',
  ],
  wants: [
    'Želiš da razumeš tehniku.',
    'Da znaš kako da napraviš stabilnu i urednu tortu.',
    'Da naučiš kako da rešiš problem kada nešto ne ispadne kako treba.',
    'I da znaš kako da vrednuješ ono što radiš.',
  ],
  closingBefore: 'Zato je nastao program',
  summary:
    'Program koji objedinjuje znanje o izradi i dekoraciji torti sa praktičnim smernicama za rad sa klijentima i postavljanje zdravih temelja za cake biznis.',
};

export const instructor = {
  intro: 'Supruga sam i majka dva odrasla sina.',
  bio: [
    'Profesionalno se bavim izradom torti već 14 godina, a ljubav prema ovom poslu rodila se još mnogo ranije. Kroz godine rada, neprestano sam učila, usavršavala svoje veštine i sticala dragoceno iskustvo koje danas unosim u svaku svoju poslasticu.',
    'Danas je izrada torti za mene mnogo više od posla – to je kreativnost, ljubav i način da svojim radom ulepšam nečiji poseban dan.',
  ],
  whyTitle: 'Zašto Cool Cakes Akademija?',
  why: [
    'Iza programa stoji iskustvo iz stvarnog rada — sa tortama, klijentima, rokovima, greškama i situacijama koje ne možeš uvek naučiti iz recepta.',
    'Sve ono što sam kroz godine rada učila, testirala i usavršavala sada sam složila u jedan program.',
  ],
  quote: 'Ne želim samo da ti pokažem šta radim. Želim da ti objasnim zašto to radim.',
  quoteFollow:
    'Jer kada razumeš princip, možeš da ga primeniš na mnogo više od jednog recepta ili jedne torte.',
  facts: [
    { value: '14 godina', label: 'profesionalne izrade torti' },
    { value: 'Pirot', label: 'radionica Cool Cakes by Maja' },
  ],
};

// Program po Majinom spisku lekcija (folder „novo“). Moduli 01–08 grade tortu,
// 09–12 vode ka savršenstvu i profesionalnom radu.
// topics = teme koje Maja navodi unutar modula; body = opis (za module bez opisa
// u spisku preuzet je Majin tekst iz Word dokumenta za istu temu).
export const phases = [
  { from: 1, to: 8, title: 'Od torte', note: 'osnove, kore, filovi, dekoracija i spratne torte' },
  { from: 9, to: 12, title: 'do savršenstva', note: 'trikovi, prezentacija i profesionalni rad' },
];

export const modules = [
  {
    number: '01',
    title: 'Dobro došla u akademiju',
    body: ['Upoznajmo se i postavimo temelje za tvoje putovanje.'],
  },
  {
    number: '02',
    title: 'Osnove profesionalne torte',
    body: ['Šta čini dobru tortu i koje su osnovne stvari koje moraš da znaš.'],
  },
  {
    number: '03',
    title: 'Kore i biskviti',
    body: [],
    topics: ['Čokoladni biskvit', 'Kore od belanaca', 'Puslica kore – kora za Anu Pavlovu', 'Žuti biskvit'],
  },
  {
    number: '04',
    title: 'Filovi',
    body: [],
    topics: ['Čokoladni fil', 'Poslastičarski krem', 'Fil na pari', 'Ganache'],
  },
  {
    number: '05',
    title: 'Sastavljanje torte i filovanje',
    body: [
      'Kako pravilno kombinovati komponente i napraviti tortu koja je ukusna, stabilna i pogodna za dalji rad i dekoraciju.',
    ],
  },
  {
    number: '06',
    title: 'Dekoracija',
    body: [
      'Kako da povežeš boje, oblike, proporcije i detalje u skladnu završnu celinu.',
      'Cilj je da dekoracija izgleda promišljeno, a ne samo „ukrašeno“.',
    ],
    topics: ['Buter krem – nekoliko vrsta', 'Šlag', 'Kombinovanje različitih tehnika'],
  },
  {
    number: '07',
    title: 'Rad sa fondanom',
    body: [
      'Priprema, razvijanje, oblaganje i završna obrada.',
      'Uz najčešće probleme koji se javljaju pri radu i načine da ih izbegneš.',
    ],
  },
  {
    number: '08',
    title: 'Spratne torte',
    body: ['Osnove konstrukcije, pravilnog slaganja i stabilnosti spratnih torti.'],
  },
  {
    number: '09',
    title: 'Trikovi i saveti',
    body: [],
  },
  {
    number: '10',
    title: 'Korisni linkovi',
    body: [],
  },
  {
    number: '11',
    title: 'Profesionalna prezentacija',
    body: [
      'Kako da svoje torte predstaviš na način koji privlači pažnju i jasno pokazuje njihov kvalitet.',
      'Proći ćemo kroz osnove prezentacije, fotografije i sadržaja za društvene mreže.',
    ],
  },
  {
    number: '12',
    title: 'Od hobija do profesionalnog rada',
    body: [
      'Kako da od svog znanja počneš da gradiš organizovaniji posao.',
      'Ponuda, cena, troškovi, klijenti i način rada — osnovni elementi koje treba da razumeš ako želiš da pravljenje torti jednog dana postane više od hobija.',
    ],
  },
];

export const audience = {
  title: 'Kome je program namenjen?',
  intro: 'Za tebe je ako:',
  items: [
    'tek počinješ i želiš da učiš pravilno',
    'već praviš torte, ali želiš da unaprediš tehniku',
    'želiš urednije i profesionalnije rezultate',
    'želiš da savladaš fondan i spratne torte',
    'želiš da bolje razumeš dekoraciju',
    'nisi sigurna kako da formiraš cenu',
    'želiš da naučiš kako da predstaviš svoj rad',
    'imaš prve klijente i želiš da podigneš nivo svog rada',
    'razmišljaš da jednog dana od torti napraviš posao',
  ],
  notes: [
    {
      title: 'Ne moraš da znaš sve da bi počela',
      body: [
        'Ne moraš da imaš godine iskustva niti da sve odmah radiš savršeno.',
        'Potrebni su ti želja da učiš i spremnost da vežbaš.',
        'Kroz program nećeš samo gledati kako neko drugi pravi tortu. Učićeš postupke, principe i način razmišljanja koji možeš da primeniš i na svoje torte.',
      ],
    },
    {
      title: 'Uči kada tebi odgovara',
      body: [
        'Program je potpuno online.',
        'Pratiš lekcije svojim tempom, iz svog doma i u vreme koje ti odgovara.',
        'Možeš da zastaneš, vratiš lekciju, ponoviš postupak i nastaviš kada budeš spremna.',
      ],
    },
  ],
};

export const offer = {
  includesTitle: 'Šta dobijaš?',
  includes: [
    'strukturisan online program',
    'detaljne video lekcije',
    'praktične tehnike i postupke',
    'materijale za rad',
    'smernice za formiranje cena',
    'smernice za komunikaciju sa klijentima',
    'znanje koje možeš odmah da primeniš',
    'mogućnost da se vraćaš na lekcije i ponavljaš ih',
  ],
  bonusTitle: 'Bonus',
  bonus: [
    'Moji najbolji i najprodavaniji recepti',
    'PDF materijali',
    'Pitanja i odgovori s vremena na vreme',
    'Dodatni saveti i inspiracija',
  ],
};

export const vision = {
  title: 'Šta ćeš uraditi sa tim znanjem?',
  maybes: [
    'Možda ćeš praviti torte samo za svoje najbliže.',
    'Možda ćeš prihvatiti prve porudžbine.',
    'Možda ćeš vremenom izgraditi svoj brend i svoju malu radionicu.',
  ],
  honest: [
    'Ja ti ne mogu obećati određenu zaradu.',
    'Ali mogu da ti dam znanje i smernice koje ti mogu pomoći da radiš kvalitetnije, donosiš bolje odluke i postaviš dobre temelje za ono što želiš da izgradiš.',
  ],
  finaleLines: ['Ne kao obećanje.', 'Već kao mogućnost.'],
  finaleBody:
    'Od ljubavi prema tortama, preko znanja i prakse, do trenutka kada svoje veštine možeš da pretvoriš u nešto svoje.',
  welcome:
    'Ako želiš da naučiš više, radiš bolje i napraviš sledeći korak — dobrodošla u Cool Cakes Akademiju.',
};

// Odgovori su preuzeti iz dokumenta i infografika programa
export const faq = [
  {
    q: 'Da li mi je potrebno prethodno iskustvo?',
    a: [
      'Ne moraš da imaš godine iskustva niti da sve odmah radiš savršeno. Potrebni su ti želja da učiš i spremnost da vežbaš.',
    ],
  },
  {
    q: 'Kako se prati program?',
    a: [
      'Program je potpuno online. Pratiš lekcije svojim tempom, iz svog doma i u vreme koje ti odgovara.',
    ],
  },
  {
    q: 'Mogu li da se vraćam na lekcije?',
    a: [
      'Da. Možeš da zastaneš, vratiš lekciju, ponoviš postupak i nastaviš kada budeš spremna.',
    ],
  },
  {
    q: 'Da li ću samo gledati kako se pravi torta?',
    a: [
      'Ne. Kroz program nećeš samo gledati kako neko drugi pravi tortu. Učićeš postupke, principe i način razmišljanja koji možeš da primeniš i na svoje torte.',
    ],
  },
  {
    q: 'Da li je program samo o izradi i dekoraciji?',
    a: [
      'Program objedinjuje znanje o izradi i dekoraciji torti sa praktičnim smernicama za rad sa klijentima i postavljanje zdravih temelja za cake biznis — od formiranja cene i predstavljanja rada do komunikacije sa klijentima.',
    ],
  },
  {
    q: 'Koliko košta program?',
    a: ['Cena za prvu generaciju je 350 €, a redovna cena je 500 €.'],
  },
  {
    q: 'Kako se upisujem?',
    a: [
      'Klikni na „Upiši program“ i pošalji prijavu sa imenom, prezimenom i brojem telefona. Maja ti se javlja da dogovorite uplatu, a nakon uplate dobijaš pristupni kod za video lekcije.',
    ],
  },
  {
    q: 'Kako da otključam video lekcije?',
    a: [
      'Klikni na „Upiši program“ ili „Imam kod“, unesi pristupni kod iz poruke i sve lekcije se odmah otključavaju.',
      'Pristup ostaje sačuvan u pregledaču na uređaju na kom si unela kod. Na drugom telefonu ili računaru samo ponovo unesi isti kod.',
    ],
  },
  {
    q: 'Šta je uključeno u bonus?',
    a: [
      'Moji najbolji i najprodavaniji recepti, PDF materijali, pitanja i odgovori s vremena na vreme i dodatni saveti i inspiracija.',
    ],
  },
  {
    q: 'Da li program garantuje zaradu?',
    a: [
      'Ja ti ne mogu obećati određenu zaradu.',
      'Ali mogu da ti dam znanje i smernice koje ti mogu pomoći da radiš kvalitetnije, donosiš bolje odluke i postaviš dobre temelje za ono što želiš da izgradiš.',
    ],
  },
];

export const footer = {
  motto: 'Jer znanje donosi slobodu.',
};

// Napomene o autorskim pravima: podnožje, ispod plejera, prozor za pristup i kartica sa cenom
export const rights = {
  footer:
    'Zabranjeno je umnožavanje, kopiranje, snimanje, deljenje i objavljivanje sadržaja ovog sajta (video lekcija, tekstova, fotografija i ostalih materijala) bez pisane dozvole autorke.',
  video:
    'Video lekcije su zaštićene autorskim pravima i namenjene isključivo polaznicama programa. Zabranjeno je umnožavanje, kopiranje, snimanje, deljenje i objavljivanje bez pisane dozvole autorke.',
  access: 'Zabranjeno je deljenje pristupnog koda, kao i umnožavanje, kopiranje i snimanje lekcija.',
  pricing: 'Zabranjeno umnožavanje i deljenje',
};
