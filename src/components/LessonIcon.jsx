// Linijske ikone lekcija, u duhu logotipa: tamni kakao obris sa medenim,
// ružičastim i kremastim tonovima. Ikona se bira poljem `icon` u src/data/lessons.js.

const INK = '#24140E';
const MED = '#D9824B';
const BOBICA = '#9B4456';
const KREM = '#FDFAF5';
const MED_SVETLI = '#F2D6BC';
const BOBICA_SVETLA = '#EBCFD2';
const MAGLA = '#EDEFE6';

const icons = {
  // Dobro došla u akademiju — kuvarska kapa
  kapa: (
    <>
      <path d="M15 27c-4 0-7-2.9-7-6.4 0-3.6 3-6.5 6.8-6.3C15.8 10.6 19.6 8 24 8s8.2 2.6 9.2 6.3c3.8-.2 6.8 2.7 6.8 6.3 0 3.5-3 6.4-7 6.4" fill={KREM} />
      <path d="M15 26v11a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 33 37V26" fill={MED_SVETLI} />
      <path d="M15 27.5h18" />
      <path d="M20 30.5v5M24 30.5v5M28 30.5v5" stroke={MED} />
      <path d="M36.5 6.5v4M34.5 8.5h4" stroke={MED} />
    </>
  ),
  // Osnove profesionalne torte — torta sa trešnjom
  torta: (
    <>
      <path d="M7 39.5h34" />
      <rect x="11" y="21" width="26" height="18.5" rx="2" fill={MED_SVETLI} />
      <path d="M11 31.5c2.2 0 2.2 1.8 4.3 1.8s2.2-1.8 4.4-1.8 2.2 1.8 4.3 1.8 2.2-1.8 4.3-1.8 2.2 1.8 4.4 1.8 2.1-1.8 4.3-1.8" stroke={BOBICA} />
      <path d="M11 25.5V23a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2v2.5c-1.6 0-1.6 2.5-3.2 2.5s-1.6-2.5-3.2-2.5-1.6 3.5-3.3 3.5-1.6-3.5-3.3-3.5-1.6 2.5-3.2 2.5-1.6-2.5-3.2-2.5-1.6 3.5-3.3 3.5S12.6 25.5 11 25.5Z" fill={KREM} />
      <circle cx="24" cy="17.2" r="2.6" fill={BOBICA} />
      <path d="M24.6 14.7c.3-2.6 1.7-4.2 3.8-4.8" />
    </>
  ),
  // Kore i biskviti — mutilica i jaje
  mutilica: (
    <>
      <ellipse cx="12" cy="36.5" rx="4.2" ry="5.2" fill={MED_SVETLI} />
      <g transform="rotate(-35 24 24)">
        <path d="M24 29C17.5 23 17.5 9 24 6c6.5 3 6.5 17 0 23Z" fill={KREM} />
        <path d="M24 29c-3.2-6-3.2-17 0-23 3.2 6 3.2 17 0 23Z" />
        <rect x="22" y="29" width="4" height="13" rx="2" fill={MED} />
      </g>
    </>
  ),
  // Filovi — činija sa kremom, kašika i para (fil na pari)
  cinija: (
    <>
      <path d="M16.5 13c-1.6-1.4 1.6-2.8 0-4.2M21.5 11.5c-1.6-1.4 1.6-2.8 0-4.2" stroke={MED} />
      <path d="M32 21.5l6.3-8.8" />
      <ellipse cx="39.6" cy="10.8" rx="2.2" ry="3.2" transform="rotate(36 39.6 10.8)" fill={MED_SVETLI} />
      <path d="M11 24c0-3.2 3-5.2 6.2-4.6C18.4 16.4 21 15 24 15s5.6 1.4 6.8 4.4C34 18.8 37 20.8 37 24" fill={BOBICA_SVETLA} />
      <path d="M8 24h32c0 8-7.2 14-16 14S8 32 8 24Z" fill={KREM} />
      <path d="M18.5 38.5h11" />
    </>
  ),
  // Sastavljanje torte i filovanje — slojevi na postolju i špatula
  sastavljanje: (
    <>
      <rect x="9" y="26.5" width="24" height="6.5" rx="1.2" fill={MED_SVETLI} />
      <rect x="9" y="18" width="24" height="6.5" rx="1.2" fill={MED_SVETLI} />
      <rect x="9" y="9.5" width="24" height="6.5" rx="1.2" fill={MED_SVETLI} />
      <path d="M9.5 25.5h23M9.5 17h23" stroke={BOBICA} strokeWidth="2" />
      <rect x="5" y="33" width="32" height="3" rx="1.5" fill={KREM} />
      <path d="M21 36v4.5M15 41h12" />
      <g transform="rotate(14 41 22)">
        <rect x="39.5" y="8" width="3" height="19" rx="1.5" fill={KREM} />
        <rect x="39.8" y="27" width="2.4" height="9" rx="1.2" fill={MED} />
      </g>
    </>
  ),
  // Dekoracija — dresir kesa i ružica od buter krema
  dresir: (
    <>
      <path d="M12 7h24l-9 20h-6Z" fill={BOBICA_SVETLA} />
      <path d="M12 7c1.5-2.8 22.5-2.8 24 0" />
      <path d="M21 27h6l-.9 4h-4.2Z" fill={MED} />
      <path d="M14 43.5h20" />
      <path d="M16.5 43.5c0-4.4 3.4-7.5 7.5-7.5s7.5 3.1 7.5 7.5" fill={KREM} />
      <path d="M20.2 42.4c.5-2.6 2.2-3.9 4-3.6 2 .3 3 2.3 1.7 3.8" stroke={BOBICA} />
      <path d="M22.6 42.2c.3-1 1-1.4 1.6-1.2" stroke={BOBICA} />
    </>
  ),
  // Rad sa fondanom — oklagija i razvijeni fondan
  oklagija: (
    <>
      <path d="M5 33.5c1-3.4 33-5 37.5-1.3 1.3 1.1 1.2 3.4-.3 4.3-5.6 3.2-31 3.6-35.8.7C5 36.3 4.6 34.8 5 33.5Z" fill={BOBICA_SVETLA} />
      <g transform="rotate(-12 24 22)">
        <rect x="11" y="18.5" width="26" height="8" rx="4" fill={MED_SVETLI} />
        <rect x="4" y="20.5" width="7" height="4" rx="2" fill={MED} />
        <rect x="37" y="20.5" width="7" height="4" rx="2" fill={MED} />
        <path d="M16 21.5h5M25 23.5h6" stroke={MED} />
      </g>
    </>
  ),
  // Spratne torte — torta na tri sprata
  spratna: (
    <>
      <path d="M7 41.5h34" />
      <rect x="9.5" y="30" width="29" height="11.5" rx="1.5" fill={KREM} />
      <rect x="13.5" y="21" width="21" height="9" rx="1.5" fill={MED_SVETLI} />
      <rect x="17.5" y="13" width="13" height="8" rx="1.5" fill={BOBICA_SVETLA} />
      <path d="M13 36.2h22" strokeDasharray="0.1 3.1" strokeWidth="2" />
      <path d="M24 11c-1.5-1.3-4-2.7-4-4.6 0-1.3 1-2.2 2.1-2.2.8 0 1.5.4 1.9 1.1.4-.7 1.1-1.1 1.9-1.1 1.1 0 2.1.9 2.1 2.2 0 1.9-2.5 3.3-4 4.6Z" fill={BOBICA} stroke={BOBICA} />
    </>
  ),
  // Trikovi i saveti — sijalica
  sijalica: (
    <>
      <path d="M24 2.5v2.5M9.5 8.5l1.8 1.8M38.5 8.5l-1.8 1.8M5 21h2.5M40.5 21H43" stroke={MED} />
      <path d="M24 9a11 11 0 0 0-6.6 19.8c1.2.9 1.9 2.3 1.9 3.8V34h9.4v-1.4c0-1.5.7-2.9 1.9-3.8A11 11 0 0 0 24 9Z" fill={MED_SVETLI} />
      <path d="M21.5 34v-7.5M26.5 34v-7.5" />
      <path d="M21.5 26.5l1.25-2.6 1.25 2.6 1.25-2.6 1.25 2.6" stroke={BOBICA} />
      <rect x="19.3" y="34" width="9.4" height="4.5" rx="1" fill={KREM} />
      <path d="M21.5 38.5c0 1.8 1.1 2.8 2.5 2.8s2.5-1 2.5-2.8" />
    </>
  ),
  // Korisni linkovi — karike lanca
  link: (
    <>
      <g transform="rotate(-38 24 24)" strokeWidth="2.2">
        <rect x="6.5" y="18.5" width="20" height="11" rx="5.5" />
        <rect x="21.5" y="18.5" width="20" height="11" rx="5.5" stroke={BOBICA} />
      </g>
      <path d="M38 6.5v4M36 8.5h4M10 37.5v4M8 39.5h4" stroke={MED} />
    </>
  ),
  // Profesionalna prezentacija — fotoaparat
  fotoaparat: (
    <>
      <path d="M17 15.5l2.4-4.5h9.2l2.4 4.5" fill={MED_SVETLI} />
      <path d="M10 15.5v-2h4v2" />
      <rect x="6" y="15.5" width="36" height="23" rx="3" fill={KREM} />
      <circle cx="24" cy="27" r="7.8" fill={BOBICA_SVETLA} />
      <circle cx="24" cy="27" r="4.2" />
      <rect x="33.5" y="19" width="5" height="3" rx="1" fill={MED} />
    </>
  ),
  // Od hobija do profesionalnog rada — poslastičarnica sa tendom
  radnja: (
    <>
      <path d="M5 41.5h38" />
      <path d="M9.5 21v20.5h29V21" fill={KREM} />
      <path d="M8 19l3-8h26l3 8Z" fill={BOBICA_SVETLA} />
      <path d="M17.5 11L16 19M24 11v8M30.5 11l1.5 8" stroke={BOBICA} />
      <path d="M8 19c0 2 1.8 3.4 4 3.4s4-1.4 4-3.4c0 2 1.8 3.4 4 3.4s4-1.4 4-3.4c0 2 1.8 3.4 4 3.4s4-1.4 4-3.4c0 2 1.8 3.4 4 3.4s4-1.4 4-3.4" fill={BOBICA_SVETLA} />
      <rect x="13.5" y="28" width="7.5" height="13.5" rx="0.8" fill={MED_SVETLI} />
      <circle cx="19" cy="35" r="0.7" fill={INK} stroke="none" />
      <rect x="25" y="27" width="9.5" height="8" rx="0.8" fill={MAGLA} />
      <path d="M29.75 27v8M25 31h9.5" />
    </>
  ),
};

export default function LessonIcon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke={INK}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name] ?? icons.torta}
    </svg>
  );
}

// Pozadine pločica sa ikonama se smenjuju: med, ruža, žalfija
const tints = ['bg-med-svetli/45', 'bg-bobica-svetla/45', 'bg-zalfija-magla'];
export const iconTint = (id) => tints[(id - 1) % tints.length];
