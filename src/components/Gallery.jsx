import { useEffect, useRef, useState } from 'react';
import { categories, gallery } from '../data/gallery';
import { Button, Icon } from './ui';

const INITIAL = 12;

export default function Gallery() {
  const [filter, setFilter] = useState('sve');
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const items = filter === 'sve' ? gallery : gallery.filter((g) => g.category === filter);
  const visible = expanded ? items : items.slice(0, INITIAL);

  return (
    <section id="galerija" className="relative overflow-clip border-t border-okvir bg-puter py-16 sm:py-24 lg:py-36">
      <div aria-hidden="true" className="sjaj top-[-8%] left-[20%] size-[56rem]" />

      <div className="wrap relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow">Galerija</p>
            <h2 className="font-display text-naslov mt-5 text-balance">
              Radovi iz <span className="kurziv text-bobica">radionice</span>
            </h2>
          </div>
          <p className="self-end text-kakao text-pretty lg:col-span-5">
            Torte Cool Cakes by Maja — od nežnih svadbenih spratova do razigranih dečijih torti. Klikni na fotografiju
            za uvećan prikaz.
          </p>
        </div>

        <div role="group" aria-label="Filter radova" className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-b border-okvir">
          {categories.map((c) => {
            const count = c.id === 'sve' ? gallery.length : gallery.filter((g) => g.category === c.id).length;
            const on = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setFilter(c.id);
                  setExpanded(false);
                }}
                className={`-mb-px border-b-2 pt-1 pb-3 text-[0.92rem] font-medium transition-colors duration-300 ${
                  on ? 'border-bobica text-bobica' : 'border-transparent text-kakao hover:text-espreso'
                }`}
              >
                {c.label}
                <sup className="ml-1 text-[0.72rem] font-semibold text-karamel-tamni">{count}</sup>
              </button>
            );
          })}
        </div>

        <ul className="mt-10 columns-2 gap-3 sm:gap-5 md:columns-3 lg:columns-4">
          {visible.map((item, i) => (
            <li key={item.slug} className="mb-3 break-inside-avoid sm:mb-5">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group block w-full border border-okvir bg-krem p-1.5 text-left transition duration-500 ease-meko hover:-translate-y-0.5 hover:shadow-otisak sm:p-2"
                aria-label={`Uvećaj: ${item.alt}`}
              >
                <span className="block overflow-hidden bg-puter">
                  <img
                    src={item.thumb}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full transition duration-700 ease-meko group-hover:scale-[1.04]"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {items.length > INITIAL && (
          <div className="mt-12 flex justify-center">
            <Button variant="secondary" arrow={false} type="button" onClick={() => setExpanded((v) => !v)}>
              {expanded ? 'Prikaži manje' : `Prikaži sve radove (${items.length})`}
            </Button>
          </div>
        )}
      </div>

      <Lightbox items={visible} index={openIndex} onChange={setOpenIndex} />
    </section>
  );
}

function Lightbox({ items, index, onChange }) {
  const ref = useRef(null);
  const touch = useRef(null);
  const item = index == null ? null : items[index];

  useEffect(() => {
    const dialog = ref.current;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  // Unapred učitaj susedne fotografije
  useEffect(() => {
    if (index == null) return;
    [index - 1, index + 1].forEach((i) => {
      const next = items[(i + items.length) % items.length];
      if (next) new Image().src = next.full;
    });
  }, [index, items]);

  const go = (delta) => onChange((index + delta + items.length) % items.length);
  const close = () => onChange(null);

  return (
    <dialog
      ref={ref}
      onClose={close}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
      aria-label="Uvećan prikaz fotografije"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-espreso/96 p-0 text-vanila"
    >
      {item && (
        <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-vanila/70 uppercase brojke">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="grid size-11 place-items-center border border-vanila/25 text-vanila transition hover:bg-vanila/10"
              aria-label="Zatvori galeriju"
            >
              <Icon.Close />
            </button>
          </div>

          <figure
            className="flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div key={item.slug} className="izroni flex max-h-full max-w-full bg-krem p-2 [animation-duration:.4s] sm:p-3">
              <img src={item.full} alt={item.alt} className="max-h-[calc(100dvh-11rem)] max-w-full object-contain" />
            </div>
          </figure>

          <div className="flex items-center justify-between gap-4 px-4 pt-3 pb-5 sm:px-6">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid size-12 shrink-0 place-items-center border border-vanila/25 transition hover:bg-vanila/10"
              aria-label="Prethodna fotografija"
            >
              <Icon.Chevron />
            </button>
            <p className="text-center font-display kurziv text-[1.05rem] leading-snug text-vanila/85 text-pretty">{item.alt}</p>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid size-12 shrink-0 place-items-center border border-vanila/25 transition hover:bg-vanila/10"
              aria-label="Sledeća fotografija"
            >
              <Icon.Chevron className="rotate-180" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
