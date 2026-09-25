// Priprema slika za sajt: čita originale iz korena projekta i pravi
// optimizovane WebP verzije u public/assets. Pokretanje: npm run slike
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public', 'assets');
const src = (name) => path.join(root, name);
const wa = (stamp) => src(`WhatsApp Image 2026-09-${stamp}`);

// Radovi: izvor, slug i (opciono) isečak iz snimka ekrana ili 'trim' za crne ivice
const radovi = [
  ['11 at 6.17.46 PM.jpeg', 'bozuri-zlatni-listici'],
  ['11 at 6.17.46 PM (5).jpeg', 'naked-torta-ruze'],
  ['11 at 6.17.46 PM (4).jpeg', 'karamel-tekstura-pampas'],
  ['11 at 6.17.46 PM (8).jpeg', 'cokoladni-volani-ombre'],
  ['11 at 6.17.45 PM (1).jpeg', 'torta-knjiga-ruze', 'trim'],
  ['11 at 6.17.45 PM.jpeg', 'spratna-cvetna-torta'],
  ['11 at 6.17.46 PM (7).jpeg', 'zlatni-i-crveni-listovi', 'trim'],
  ['11 at 6.17.46 PM (1).jpeg', 'svadbena-gipsofila'],
  ['11 at 6.17.46 PM (10).jpeg', 'lavanda-zlatni-obruc'],
  ['11 at 6.17.45 PM (3).jpeg', 'svadbena-roze-lila'],
  ['11 at 6.17.43 PM.jpeg', 'svadbena-putovanje-globus'],
  ['11 at 6.17.44 PM.jpeg', 'crvene-ruze-obruc'],
  ['11 at 6.17.45 PM (4).jpeg', 'torta-zamak'],
  ['11 at 6.17.46 PM (9).jpeg', 'secerno-cvece-detalj'],
  ['11 at 6.17.47 PM.jpeg', 'ljubicaste-ruze-spratna', { left: 0, top: 280, width: 922, height: 1150 }],
  ['11 at 1.50.52 AM.jpeg', 'tratincice-prvi-rodjendan'],
  ['11 at 1.50.54 AM (2).jpeg', 'leptirici-roze'],
  ['11 at 1.50.53 AM (4).jpeg', 'roze-oblaci-balon'],
  ['11 at 1.50.50 AM.jpeg', 'baloni-na-topli-vazduh'],
  ['11 at 1.50.52 AM (1).jpeg', 'roze-meda-dunja'],
  ['11 at 1.50.53 AM.jpeg', 'dzungla-dzip'],
  ['11 at 1.50.50 AM (1).jpeg', 'vrtesko-nika', { left: 0, top: 374, width: 922, height: 1296 }],
  ['11 at 1.50.50 AM (2).jpeg', 'superheroji'],
  ['11 at 1.50.53 AM (2).jpeg', 'plavi-mede-baloni'],
  ['11 at 1.30.53 AM.jpeg', 'plavi-meda-ivan'],
  ['11 at 1.30.52 AM.jpeg', 'autici-viktor'],
  ['11 at 1.50.54 AM (3).jpeg', 'barbi-mladena'],
  ['11 at 1.50.52 AM (2).jpeg', 'beli-mede-zvezdice', 'trim'],
];

const numbered = [
  ['1.jpeg', 'tirkizni-baloni'],
  ['2.jpeg', 'meda-luka-volani'],
  ['3.jpeg', 'paw-patrol-maksim'],
];

async function cake(file, slug, crop) {
  const base = () => {
    const img = sharp(file).rotate();
    if (crop === 'trim') return img.trim({ background: '#000000', threshold: 30 });
    return crop ? img.extract(crop) : img;
  };
  const buf = await base().toBuffer();
  const meta = await sharp(buf).metadata();
  await sharp(buf).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(out, 'radovi', `${slug}-640.webp`));
  await sharp(buf).resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(out, 'radovi', `${slug}-1400.webp`));
  return { slug, width: meta.width, height: meta.height };
}

// Beli fon logotipa pretvara u providnost (color-to-alpha prema beloj)
async function whiteToAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = Math.max(255 - r, 255 - g, 255 - b) / 255;
    if (a < 0.02) { data[i + 3] = 0; continue; }
    data[i] = Math.round(255 - (255 - r) / a);
    data[i + 1] = Math.round(255 - (255 - g) / a);
    data[i + 2] = Math.round(255 - (255 - b) / a);
    data[i + 3] = Math.round(a * 255);
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

await mkdir(path.join(out, 'radovi'), { recursive: true });
await mkdir(path.join(out, 'maja'), { recursive: true });

const sizes = [];
for (const [stamp, slug, crop] of radovi) sizes.push(await cake(wa(stamp), slug, crop));
for (const [name, slug] of numbered) sizes.push(await cake(src(name), slug));

// Portreti
const portret = wa('10 at 9.39.24 PM.jpeg');
await sharp(portret).rotate().resize({ width: 1080 }).webp({ quality: 82 }).toFile(path.join(out, 'maja', 'portret-1080.webp'));
await sharp(portret).rotate().resize({ width: 640 }).webp({ quality: 80 }).toFile(path.join(out, 'maja', 'portret-640.webp'));
const radionica = await sharp(wa('10 at 10.24.25 AM (1).jpeg')).rotate().trim({ background: '#000000', threshold: 24 }).toBuffer();
await sharp(radionica).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(out, 'maja', 'radionica-900.webp'));

// Detalj za naslovni kolaž: božur i zlatni listići (isečak iz torte sa božurima)
await mkdir(path.join(out, 'detalji'), { recursive: true });
const detalj = await sharp(wa('11 at 6.17.46 PM.jpeg')).rotate().extract({ left: 60, top: 540, width: 780, height: 1040 }).toBuffer();
await sharp(detalj).resize({ width: 480 }).webp({ quality: 80 }).toFile(path.join(out, 'detalji', 'bozur-zlatni-listic-480.webp'));
await sharp(detalj).webp({ quality: 82 }).toFile(path.join(out, 'detalji', 'bozur-zlatni-listic-780.webp'));

// Atmosferske pozadine: široki, blago prigušeni i omekšani kadrovi koji se na sajtu
// prikazuju sa ~15% providnosti iza sadržaja
await mkdir(path.join(out, 'pozadine'), { recursive: true });
const pozadine = [
  ['11 at 6.17.46 PM (4).jpeg', 'karamel-prozor'],
  ['11 at 6.17.46 PM (5).jpeg', 'naked-torta-drvo'],
  ['11 at 6.17.46 PM (1).jpeg', 'gipsofila-vece', { left: 0, top: 300, width: 1536, height: 1100 }],
  ['11 at 6.17.46 PM.jpeg', 'bozuri-senke', { left: 0, top: 0, width: 1440, height: 1100 }],
  // Uspravna pozadina za karticu sa cenom i upisom
  ['11 at 6.17.46 PM (8).jpeg', 'cokoladni-volani', null, [1080, 1600]],
];
for (const [stamp, slug, crop, [w, h] = [1920, 1080]] of pozadine) {
  let img = sharp(wa(stamp)).rotate();
  if (crop) img = sharp(await img.extract(crop).toBuffer());
  await img
    .resize(w, h, { fit: 'cover' })
    .modulate({ saturation: 0.75 })
    .blur(1.2)
    .webp({ quality: 60 })
    .toFile(path.join(out, 'pozadine', `${slug}-${w}.webp`));
}

// Logo i znak
const logoAlpha = await whiteToAlpha(src('logo.jpeg'));
await sharp(await sharp(logoAlpha).trim().toBuffer()).resize({ width: 640 }).png({ compressionLevel: 9 }).toFile(path.join(out, 'logo.png'));
const znak = await whiteToAlpha(await sharp(src('logo.jpeg')).extract({ left: 80, top: 610, width: 440, height: 470 }).toBuffer());
const znakTrim = await sharp(znak).trim().toBuffer();
const square = (s) => sharp(znakTrim).resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png();
await square(256).toFile(path.join(out, 'logo-znak.png'));
await square(48).toFile(path.join(out, 'favicon-48.png'));
await sharp(znakTrim).resize(150, 150, { fit: 'contain', background: '#FAF6F0' }).extend({ top: 15, bottom: 15, left: 15, right: 15, background: '#FAF6F0' }).flatten({ background: '#FAF6F0' }).png().toFile(path.join(out, 'apple-touch-icon.png'));

// Slika za deljenje na mrežama (program sa cenom)
await sharp(wa('11 at 6.34.27 PM.jpeg')).resize({ width: 1080 }).jpeg({ quality: 84 }).toFile(path.join(out, 'og-program.jpg'));

console.log(JSON.stringify(Object.fromEntries(sizes.map((s) => [s.slug, [s.width, s.height]]))));
