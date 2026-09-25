import { site } from '../data/site';

// Prijava za upis: ime, prezime i telefon stižu Maji mejlom. Sajt nema svoj server, pa se
// slanje obavlja preko servisa formsubmit.co; primalac se podešava u site.enrollEmail.

export const ENROLL_FIELDS = ['ime', 'prezime', 'telefon'];

const hasLetter = (s) => /\p{L}/u.test(s);

export function validateEnrollment({ ime, prezime, telefon }) {
  const errors = {};
  if (!ime.trim()) errors.ime = 'Upiši svoje ime.';
  else if (!hasLetter(ime)) errors.ime = 'Ime treba da sadrži slova.';

  if (!prezime.trim()) errors.prezime = 'Upiši svoje prezime.';
  else if (!hasLetter(prezime)) errors.prezime = 'Prezime treba da sadrži slova.';

  const phone = telefon.trim();
  const digits = phone.replace(/\D/g, '');
  if (!phone) errors.telefon = 'Upiši broj telefona na koji ti se Maja javlja.';
  else if (!/^\+?[\d\s\-()/.]+$/.test(phone) || digits.length < 8 || digits.length > 15) {
    errors.telefon = 'Proveri broj telefona, npr. 064 123 4567 ili +381 64 123 4567.';
  }
  return errors;
}

// Baca grešku ako prijava nije stigla do servisa. `trap` je skriveno polje za robote:
// ako je popunjeno, prijava se tiho odbacuje.
export async function sendEnrollment({ ime, prezime, telefon }, trap = '') {
  if (trap) return;
  if (!site.enrollEmail) throw new Error('site.enrollEmail nije podešen (src/data/site.js)');

  const res = await fetch(`https://formsubmit.co/ajax/${site.enrollEmail}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      Ime: ime.trim(),
      Prezime: prezime.trim(),
      Telefon: telefon.trim(),
      _subject: `Nova prijava — ${site.name}`,
      _template: 'table',
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !(data.success === true || data.success === 'true')) {
    throw new Error(data.message || `Slanje nije uspelo (${res.status})`);
  }
}
