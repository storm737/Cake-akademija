const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const Icon = {
  Arrow: (p) => (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...p}>
      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
    </svg>
  ),
  Lock: (p) => (
    <svg viewBox="0 0 20 20" width="16" height="16" {...base} {...p}>
      <rect x="4" y="9" width="12" height="8.5" rx="1.5" />
      <path d="M6.8 9V6.6a3.2 3.2 0 0 1 6.4 0V9" />
    </svg>
  ),
  Play: (p) => (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" {...p}>
      <path d="M7 4.8v10.4a.8.8 0 0 0 1.2.7l8.3-5.2a.8.8 0 0 0 0-1.4L8.2 4.1A.8.8 0 0 0 7 4.8Z" fill="currentColor" />
    </svg>
  ),
  Pause: (p) => (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" {...p}>
      <rect x="5.5" y="4.5" width="3.2" height="11" rx="0.8" fill="currentColor" />
      <rect x="11.3" y="4.5" width="3.2" height="11" rx="0.8" fill="currentColor" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 20 20" width="16" height="16" {...base} strokeWidth={1.8} {...p}>
      <path d="m4.5 10.5 3.4 3.2L15.5 6" />
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...p}>
      <path d="M5 5l10 10M15 5 5 15" />
    </svg>
  ),
  Menu: (p) => (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...p}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  ),
  Chevron: (p) => (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...p}>
      <path d="M12.5 4.5 7 10l5.5 5.5" />
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...p}>
      <path d="M10 4v12M4 10h12" />
    </svg>
  ),
  Instagram: (p) => (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...p}>
      <rect x="3" y="3" width="14" height="14" rx="4" />
      <circle cx="10" cy="10" r="3.2" />
      <circle cx="14.3" cy="5.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  Key: (p) => (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...p}>
      <circle cx="6.5" cy="10" r="3.5" />
      <path d="M10 10h7.5M15 10v3M17.5 10v2" />
    </svg>
  ),
  Pin: (p) => (
    <svg viewBox="0 0 20 20" width="18" height="18" {...base} {...p}>
      <path d="M10 17.5s5.5-5 5.5-9.2a5.5 5.5 0 0 0-11 0c0 4.2 5.5 9.2 5.5 9.2Z" />
      <circle cx="10" cy="8.3" r="1.9" />
    </svg>
  ),
};

// Baršunasta bobica koja se pri prelasku mišem preliva u tamni kakao;
// sekundarno dugme ima tanak karamel okvir
const variants = {
  primary: 'bg-bobica-tamna text-vanila before:bg-espreso',
  secondary: 'border border-karamel/70 text-espreso before:bg-med-svetli/50 hover:border-karamel',
  light: 'bg-vanila text-espreso before:bg-med',
};

export function Button({ href, variant = 'primary', arrow = true, className = '', children, ...props }) {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      className={`group relative isolate inline-flex items-center justify-center overflow-hidden rounded-[2px] px-7 py-4 whitespace-nowrap text-[0.92rem] leading-none font-semibold tracking-[0.01em] transition-[border-color,transform] duration-300 ease-meko before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-meko hover:before:scale-x-100 active:translate-y-px ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="inline-flex items-center gap-3">
        {children}
        {arrow && <Icon.Arrow className="transition-transform duration-300 ease-meko group-hover:translate-x-1" />}
      </span>
    </Tag>
  );
}

export function CheckMark({ className = '' }) {
  return <Icon.Check className={`mt-[0.32rem] shrink-0 text-zalfija ${className}`} width="17" height="17" strokeWidth={2} />;
}

// Fotografija uramljena kao umetnički otisak: paspartu, tanka topla linija
// i (opciono) laneni karton pomeren iza slike.
export function Print({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  ratio = 'aspect-[4/5]',
  position = 'object-center',
  offset = false,
  offsetTone = 'med',
  priority = false,
  caption,
  className = '',
}) {
  return (
    <figure className={`relative ${className}`}>
      <div className="relative">
      {offset && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 translate-x-2 translate-y-2 ${offsetTone === 'bobica' ? 'bg-bobica-svetla' : 'bg-med-svetli'}`}
        />
      )}
      <div className="relative border border-okvir bg-krem p-2 shadow-otisak sm:p-3">
        <div className={`overflow-hidden bg-puter ${ratio}`}>
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            className={`size-full object-cover ${position}`}
          />
        </div>
      </div>
      </div>
      {caption && (
        <figcaption className={`relative flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold tracking-[0.16em] text-kakao uppercase ${offset ? 'mt-6' : 'mt-4'}`}>
          <span aria-hidden="true" className="h-px w-6 bg-karamel" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Atmosferska fotografija iza sadržaja sa ~15% providnosti; gradijent topi ivice u pozadinu
// sekcije, pa tekst i dugmad ostaju potpuno oštri i čitljivi.
const fades = {
  vanila: 'from-vanila via-transparent to-vanila',
  puter: 'from-puter via-transparent to-puter',
  noc: 'from-bobica-noc via-transparent to-bobica-noc',
};

export function Backdrop({ src, fade = 'vanila', flip = false, position = 'object-center', className = 'opacity-15', priority = false }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src={src}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority="low"
        className={`size-full object-cover ${position} ${flip ? '-scale-x-100' : ''} ${className}`}
      />
      <div className={`absolute inset-0 bg-linear-to-b ${fades[fade]}`} />
    </div>
  );
}

// Utisnuti pečat sa tekstom koji se polako okreće
export function Seal({ text = 'Cool Cakes Akademija • Beograd • 2026 •', className = '' }) {
  const r = 76;
  const circumference = 2 * Math.PI * r;
  return (
    <div className={`relative aspect-square ${className}`} role="img" aria-label={text.replaceAll('•', '·')}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full" aria-hidden="true">
        <circle cx="100" cy="100" r="99" fill="#8A3546" />
        <circle cx="100" cy="100" r="93" fill="none" stroke="#E5A16F" strokeOpacity="0.7" strokeWidth="0.75" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#E5A16F" strokeOpacity="0.7" strokeWidth="0.75" />
        {/* Znak torte iz logotipa, pojednostavljen */}
        <g fill="none" stroke="#F2D6BC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M74 103h52v25a4 4 0 0 1-4 4H78a4 4 0 0 1-4-4Z" />
          <path d="M74 110c6 0 6 9 11 9s4-7 9-7 5 11 10 11 5-9 10-9 6 6 12 6" />
          <path d="M83 103c0-8 7-12 17-12s17 4 17 12" />
          <path d="M90 91c0-6 4-9 10-9s10 3 10 9" />
          <path d="M100 82c-1-5 2-8 7-8" />
          <path d="M114 64c0-3 4-4 5-1 1-3 5-2 5 1 0 4-5 6-5 8 0-2-5-4-5-8Z" strokeWidth="1.8" />
        </g>
      </svg>
      <svg viewBox="0 0 200 200" className="okret absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id="pecat-putanja" d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0" />
        </defs>
        <text fill="#FAF6F0" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="13" fontWeight="600">
          <textPath href="#pecat-putanja" textLength={circumference - 6} lengthAdjust="spacing">
            {text.toUpperCase()}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
