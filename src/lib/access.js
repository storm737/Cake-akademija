import { createContext, useContext } from 'react';
import { VALID_ACCESS_KEYS } from '../data/accessKeys';

// U pregledaču se čuva { isUnlocked: true, kod }. Kod se čuva uz oznaku da bi se pri svakoj
// poseti ponovo proverio: kada se obriše iz accessKeys.js, pristup se ukida.
const STORAGE_KEY = 'coolcakes-pristup';
const LEGACY_STORAGE_KEY = 'coolcakes-pristupni-kod';

// Kod iz Instagram poruke često stigne sa razmakom, tačkom ili „pametnom“ crticom —
// zato se porede samo slova i brojevi
export function normalizeKey(value) {
  return String(value ?? '')
    .toUpperCase()
    .replace(/[\s\-‐-―−_"'„“”‚‘’.,;:!?]/g, '');
}

const validKeys = new Set(VALID_ACCESS_KEYS.map(normalizeKey));

export const isValidKey = (value) => validKeys.has(normalizeKey(value));

export function readStoredKey() {
  try {
    const storage = window.localStorage;

    // Prelazak sa ranijeg zapisa (samo kod) na { isUnlocked, kod }
    const legacy = storage.getItem(LEGACY_STORAGE_KEY);
    if (legacy !== null) {
      storage.removeItem(LEGACY_STORAGE_KEY);
      if (isValidKey(legacy)) storeKey(normalizeKey(legacy));
    }

    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) return null;

    let saved = null;
    try {
      saved = JSON.parse(raw);
    } catch {
      saved = null;
    }
    if (saved?.isUnlocked === true && isValidKey(saved.kod)) return normalizeKey(saved.kod);

    // Kod je u međuvremenu uklonjen iz liste ili je zapis oštećen — pristup se ukida
    storage.removeItem(STORAGE_KEY);
  } catch {
    // Pregledač ne dozvoljava skladište (npr. privatni režim) — pristup važi samo u ovoj poseti
  }
  return null;
}

export function storeKey(key) {
  try {
    if (key) window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ isUnlocked: true, kod: key }));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Isto kao gore: bez skladišta pristup traje do zatvaranja stranice
  }
}

export const ACCESS_STORAGE_KEY = STORAGE_KEY;

export const AccessContext = createContext(null);

export function useAccess() {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error('useAccess mora da se koristi unutar <AccessProvider>');
  return ctx;
}
