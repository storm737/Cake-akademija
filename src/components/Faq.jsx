import { useId, useState } from 'react';
import { faq } from '../data/content';
import { site } from '../data/site';
import { Icon } from './ui';

export default function Faq() {
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <section id="faq" className="relative overflow-clip border-t border-okvir bg-puter py-16 sm:py-24 lg:py-36">
      <div aria-hidden="true" className="sjaj bottom-[-20%] left-[-14%] size-[46rem]" />

      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="eyebrow">Pitanja i odgovori</p>
          <h2 className="font-display text-naslov mt-5">
            Česta <span className="kurziv text-bobica">pitanja</span>
          </h2>
          <p className="mt-6 max-w-xs text-kakao text-pretty">
            Nisi pronašla odgovor? Piši na Instagramu{' '}
            <a
              href={site.instagram[0].url}
              target="_blank"
              rel="noopener"
              className="font-medium text-espreso underline decoration-bobica underline-offset-4 hover:decoration-2"
            >
              @{site.instagram[0].handle}
            </a>
            .
          </p>
        </div>

        <ul className="border-t border-lan-tamni/70 lg:col-span-8">
          {faq.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${uid}-odgovor-${i}`;
            return (
              <li key={item.q} className="border-b border-lan-tamni/70">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-[clamp(1.2rem,1.02rem+0.55vw,1.5rem)] leading-[1.25] transition-colors group-hover:text-bobica">
                      {item.q}
                    </span>
                    <span
                      className={`grid size-10 shrink-0 place-items-center border transition-colors duration-300 ${
                        isOpen ? 'border-bobica-tamna bg-bobica-tamna text-vanila' : 'border-lan-tamni text-espreso group-hover:border-bobica/60'
                      }`}
                    >
                      <Icon.Plus className={`transition-transform duration-300 ease-meko ${isOpen ? 'rotate-45' : ''}`} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className="grid transition-[grid-template-rows] duration-400 ease-meko"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="max-w-2xl space-y-3 pr-14 pb-7 text-kakao">
                      {item.a.map((p) => (
                        <p key={p} className="text-pretty">{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
