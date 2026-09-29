// Generiše nasumične pristupne kodove: npm run kod  (ili: npm run kod -- 5 za pet kodova)
// Kod zatim dodaj u listu VALID_ACCESS_KEYS u src/data/accessKeys.js.
import { randomInt } from 'node:crypto';

// Bez slova i brojeva koji se lako pomešaju (0/O, 1/I/L)
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const block = () => Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');

const count = Math.max(1, Math.min(50, Number(process.argv[2]) || 1));
for (let i = 0; i < count; i++) console.log(`TORTA${block()}`);
