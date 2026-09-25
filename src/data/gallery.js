// Radovi iz radionice Cool Cakes by Maja.
// Slike se generišu komandom `npm run slike` u public/assets/radovi.

export const categories = [
  { id: 'sve', label: 'Sve' },
  { id: 'svecane', label: 'Svečane i svadbene' },
  { id: 'decije', label: 'Dečije i rođendanske' },
];

// [slug, kategorija, širina, visina, opis]
const raw = [
  ['bozuri-zlatni-listici', 'svecane', 1440, 1920, 'Dvospratna torta sa bledim božurima, suvim cvećem, pampas travom i zlatnim listićima'],
  ['leptirici-roze', 'decije', 1512, 1512, 'Roze torta sa leptirićima, dugom i zlatnim natpisom'],
  ['naked-torta-ruze', 'svecane', 1080, 1080, 'Naked torta sa belim i breskva ružama'],
  ['cokoladni-volani-ombre', 'svecane', 721, 1099, 'Visoka torta sa volanima u prelazu od krem do čokoladne boje, sa ružama na vrhu'],
  ['vrtesko-nika', 'decije', 922, 1296, 'Spratna torta sa vrteškom, konjićima i slonom'],
  ['torta-knjiga-ruze', 'svecane', 1080, 1555, 'Trospratna torta sa efektom listova knjige i ružama'],
  ['tratincice-prvi-rodjendan', 'decije', 941, 1672, 'Trospratna torta u bež tonu sa tratinčicama za prvi rođendan'],
  ['karamel-tekstura-pampas', 'svecane', 1080, 1080, 'Trospratna torta u karamel tonu sa teksturom, ružama i pampas travom'],
  ['spratna-cvetna-torta', 'svecane', 1366, 2049, 'Četvorospratna torta ukrašena šarenim cvećem'],
  ['roze-oblaci-balon', 'decije', 1536, 2048, 'Visoka roze torta sa oblacima, leptirićima i medom u balonu'],
  ['zlatni-i-crveni-listovi', 'svecane', 942, 1120, 'Visoka torta sa zlatnim i crvenim listovima i monogramom'],
  ['plavi-mede-baloni', 'decije', 1440, 1440, 'Plavo-bela torta sa medama i balonima za prvi rođendan'],
  ['svadbena-gipsofila', 'svecane', 1536, 2048, 'Bela trospratna svadbena torta sa gipsofilom na zlatnom postolju'],
  ['baloni-na-topli-vazduh', 'decije', 1024, 1536, 'Roze torta sa balonima na topli vazduh i medama'],
  ['lavanda-zlatni-obruc', 'svecane', 865, 1094, 'Spratna torta u tonovima lavande sa zlatnim detaljima'],
  ['dzungla-dzip', 'decije', 912, 1368, 'Spratna torta sa motivom džungle, životinjama i džipom'],
  ['svadbena-roze-lila', 'svecane', 1080, 1620, 'Svadbena torta u roze i lila prelazu sa cvećem'],
  ['meda-luka-volani', 'decije', 1080, 1080, 'Plava torta sa volanima, mašnom i medama na vrhu'],
  ['svadbena-putovanje-globus', 'svecane', 1023, 1537, 'Svadbena torta sa globusom, koferom i figuricama mladenaca'],
  ['roze-meda-dunja', 'decije', 941, 1672, 'Spratna torta sa roze medama i cvećem'],
  ['crvene-ruze-obruc', 'svecane', 1080, 1279, 'Svečana torta sa crvenim ružama u cvetnom obruču'],
  ['superheroji', 'decije', 1065, 1477, 'Trospratna torta sa motivima superheroja'],
  ['secerno-cvece-detalj', 'svecane', 1440, 1440, 'Detalj šećernog cveća, orhideja i gipsofile'],
  ['plavi-meda-ivan', 'decije', 1415, 1745, 'Plava dvospratna torta sa medama i brojem jedan'],
  ['torta-zamak', 'svecane', 1080, 1079, 'Torta u obliku belog zamka sa crvenim ružama'],
  ['autici-viktor', 'decije', 1415, 1999, 'Dvospratna torta sa autićima, oblacima i zvezdama'],
  ['ljubicaste-ruze-spratna', 'svecane', 922, 1150, 'Četvorospratna torta sa ljubičastim i belim ružama'],
  ['tirkizni-baloni', 'decije', 972, 973, 'Dvospratna torta sa tirkiznim i zlatnim balonima'],
  ['barbi-mladena', 'decije', 817, 1096, 'Roze torta sa mašnom i prugama'],
  ['beli-mede-zvezdice', 'decije', 946, 1681, 'Bela spratna torta sa medama i zvezdicama'],
  ['paw-patrol-maksim', 'decije', 1080, 1267, 'Crveno-plava torta sa motivom kučića'],
];

export const gallery = raw.map(([slug, category, width, height, alt]) => ({
  slug,
  category,
  width,
  height,
  alt,
  thumb: `/assets/radovi/${slug}-640.webp`,
  full: `/assets/radovi/${slug}-1400.webp`,
}));
