// Linijski crtež torte (u duhu logotipa) koji se slaže modul po modul.
// 01–08 grade tortu (podloga, kore, filovi, premaz, dekoracija, fondan, spratovi),
// 09–12 dodaju završne trikove, korisne linkove, prezentaciju i brend.
// Redosled elemenata u SVG-u određuje šta je iznad čega; „from“ određuje kada se pojavljuje.

const INK = '#24140E';
const KARAMEL = '#D9824B';
const MED = '#E5A16F';
const LAN = '#EDE3D8';
const KREM = '#FDFAF5';
const VISNJA = '#9B4456';
const ZALFIJA = '#859682';

const wave = (x0, x1, y, amp = 2.5, len = 10) => {
  let d = `M${x0} ${y}`;
  for (let x = x0; x < x1; x += len) d += ` q${len / 4} ${-amp} ${len / 2} 0 t${len / 2} 0`;
  return d;
};

const star = (cx, cy, r) =>
  `M${cx} ${cy - r} Q${cx} ${cy} ${cx + r} ${cy} Q${cx} ${cy} ${cx} ${cy + r} Q${cx} ${cy} ${cx - r} ${cy} Q${cx} ${cy} ${cx} ${cy - r}Z`;

const pearls = (x0, x1, y, gap = 12) => {
  const out = [];
  for (let x = x0; x <= x1; x += gap) out.push(x);
  return out.map((x) => <circle key={x} cx={x} cy={y} r="2.6" fill={KREM} stroke={INK} strokeWidth="1" />);
};

const crumbs = (points) =>
  points.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill={KARAMEL} opacity="0.6" />);

function Step({ step, from, until, children }) {
  const on = step >= from && (until == null || step <= until);
  return (
    <g className="torta-korak" data-on={on}>
      {children}
    </g>
  );
}

export default function CakeBuild({ step, total = 12, className = '' }) {
  return (
    <svg viewBox="0 0 360 400" className={className} role="img" aria-label={`Torta složena do modula ${step} od ${total}`}>
      {/* Obris buduće torte */}
      <g fill="none" stroke="#D8C6B4" strokeWidth="1.5" strokeDasharray="4 6">
        <rect x="74" y="213" width="212" height="115" rx="9" />
        <rect x="118" y="120" width="124" height="89" rx="8" />
        <line x1="54" y1="334" x2="306" y2="334" />
      </g>

      {/* 01 — dobro došla: podloga za tortu */}
      <Step step={step} from={1}>
        <rect className="crtez" pathLength="1" x="48" y="328" width="264" height="12" rx="6" fill={LAN} stroke={INK} strokeWidth="1.5" />
      </Step>

      {/* 02 — osnove profesionalne torte: prva, temeljna kora */}
      <Step step={step} from={2}>
        <rect className="crtez" pathLength="1" x="80" y="296" width="200" height="30" rx="4" fill="#F2D6BC" stroke={INK} strokeWidth="1.25" />
        {crumbs([[110, 312], [170, 306], [246, 314]])}
      </Step>

      {/* 03 — kore i biskviti */}
      <Step step={step} from={3}>
        {[222, 259].map((y) => (
          <rect key={y} className="crtez" pathLength="1" x="80" y={y} width="200" height="30" rx="4" fill="#F2D6BC" stroke={INK} strokeWidth="1.25" />
        ))}
        {crumbs([[104, 236], [150, 244], [212, 232], [252, 241], [124, 274], [188, 280], [238, 270]])}
      </Step>

      {/* 04 — filovi */}
      <Step step={step} from={4}>
        {[255.5, 292.5].map((y) => (
          <g key={y}>
            <rect x="80" y={y - 3.5} width="200" height="7" fill={KREM} />
            <path className="crtez" pathLength="1" d={wave(80, 280, y)} fill="none" stroke={KARAMEL} strokeWidth="4" strokeLinecap="round" />
          </g>
        ))}
      </Step>

      {/* 05 — sastavljanje i filovanje: premaz i strugač */}
      <Step step={step} from={5}>
        <rect className="crtez" pathLength="1" x="76" y="216" width="208" height="112" rx="6" fill="#F4E1CF" fillOpacity="0.88" stroke={KARAMEL} strokeWidth="1.5" />
      </Step>
      <Step step={step} from={5} until={5}>
        <rect x="298" y="222" width="11" height="100" rx="2.5" fill={KREM} stroke={INK} strokeWidth="1.4" />
        <path d="M318 246v52M326 258v28" stroke={KARAMEL} strokeWidth="1.4" strokeLinecap="round" />
      </Step>

      {/* 07 — rad sa fondanom (u crtežu ispod cvetova iz modula 06) */}
      <Step step={step} from={7}>
        <rect className="crtez" pathLength="1" x="74" y="213" width="212" height="115" rx="9" fill={KREM} stroke={INK} strokeWidth="1.75" />
        <path d="M92 228v86" stroke={LAN} strokeWidth="5" strokeLinecap="round" />
      </Step>

      {/* 08 — spratne torte: stubići, podloga i gornji sprat */}
      <Step step={step} from={8}>
        {[140, 180, 220].map((x) => (
          <line key={x} x1={x} y1="224" x2={x} y2="322" stroke={KARAMEL} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.8" />
        ))}
        <rect x="112" y="207" width="136" height="6" rx="3" fill={LAN} stroke={INK} strokeWidth="1.2" />
        <rect className="crtez" pathLength="1" x="118" y="120" width="124" height="87" rx="8" fill={KREM} stroke={INK} strokeWidth="1.75" />
        <path d="M132 132v62" stroke={LAN} strokeWidth="4.5" strokeLinecap="round" />
        {pearls(128, 232, 202, 13)}
      </Step>

      {/* 06 — dekoracija: cvetovi od buter krema i perle */}
      <Step step={step} from={6}>
        <g>
          <ellipse cx="104" cy="214" rx="9" ry="4" transform="rotate(-24 104 214)" fill={ZALFIJA} stroke={INK} strokeWidth="1" />
          <circle cx="90" cy="212" r="10" fill="#EBCFD2" stroke={INK} strokeWidth="1.2" />
          <path d="M86 212a4 4 0 1 1 4 4" fill="none" stroke={VISNJA} strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="110" cy="206" r="7" fill="#F5E1E3" stroke={INK} strokeWidth="1.2" />
          <path d="M107.5 206a2.6 2.6 0 1 1 2.6 2.6" fill="none" stroke={VISNJA} strokeWidth="1.1" strokeLinecap="round" />
        </g>
        {pearls(86, 274, 322)}
      </Step>

      {/* 09 — trikovi i saveti: preliv, krem i srce na vrhu */}
      <Step step={step} from={9}>
        <path
          d="M118 128Q118 120 126 120H234Q242 120 242 128V132H236V142a4 4 0 0 1-8 0V132H214V154a4.5 4.5 0 0 1-9 0V132H192V140a4 4 0 0 1-8 0V132H170V160a4.5 4.5 0 0 1-9 0V132H146V146a4 4 0 0 1-8 0V132H128V150a4 4 0 0 1-8 0V132H118Z"
          fill={VISNJA}
        />
        <path d="M146 120C144 107 160 102 180 102S216 107 214 120Z" fill={KREM} stroke={INK} strokeWidth="1.5" />
        <path d="M154 104C152 93 165 89 180 89S208 93 206 104C198 106 162 106 154 104Z" fill={KREM} stroke={INK} strokeWidth="1.5" />
        <path d="M163 91C162 82 171 78 180 78S198 82 197 91C190 93 170 93 163 91Z" fill={KREM} stroke={INK} strokeWidth="1.5" />
        <path className="crtez" pathLength="1" d="M179 78C177 71 181 65 189 64" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <path
          className="crtez"
          pathLength="1"
          d="M0 4C0-1 7-2 8 3 9-2 16-1 16 4 16 10 8 14 8 17 8 14 0 10 0 4Z"
          transform="translate(204 38) rotate(14)"
          fill="none"
          stroke={VISNJA}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </Step>

      {/* 10 — korisni linkovi */}
      <Step step={step} from={10}>
        <path
          d="M34 30H104A10 10 0 0 1 114 40V62A10 10 0 0 1 104 72H70L56 84V72H34A10 10 0 0 1 24 62V40A10 10 0 0 1 34 30Z"
          fill={KREM}
          stroke={INK}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <g transform="rotate(-30 69 51)" fill="none" stroke={KARAMEL} strokeWidth="2.6" strokeLinecap="round">
          <rect x="49" y="45" width="23" height="12" rx="6" />
          <rect x="66" y="45" width="23" height="12" rx="6" />
        </g>
      </Step>

      {/* 11 — profesionalna prezentacija: kadar i odsjaj */}
      <Step step={step} from={11}>
        <path
          className="crtez"
          pathLength="1"
          d="M10 40V16H34M326 16H350V40M350 368V392H326M34 392H10V368"
          fill="none"
          stroke={INK}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d={star(268, 100, 9)} fill={MED} />
        <path d={star(96, 190, 6)} fill={MED} />
        <path d={star(300, 196, 5)} fill={MED} />
      </Step>

      {/* 12 — od hobija do profesionalnog rada: cena i tvoj brend */}
      <Step step={step} from={12}>
        <path className="crtez" pathLength="1" d="M75 244C58 244 44 254 40 272" fill="none" stroke={INK} strokeWidth="1.25" />
        <g transform="translate(20 260) rotate(-8 20 12)">
          <path d="M20 0 40 13V52a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V13Z" fill={KREM} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="20" cy="13" r="3" fill={LAN} stroke={INK} strokeWidth="1.1" />
          <text x="20" y="43" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontSize="19" fill={INK}>
            €
          </text>
        </g>
        <path d="M86 358H52L62 370 52 382H86Z" fill={LAN} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M274 358H308L298 370 308 382H274Z" fill={LAN} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
        <rect x="76" y="350" width="208" height="28" rx="2" fill={KREM} stroke={INK} strokeWidth="1.5" />
        <text x="180" y="373" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontStyle="italic" fontSize="20" fill={VISNJA}>
          tvoj brend
        </text>
      </Step>
    </svg>
  );
}
