import { useEffect, useRef, useState } from 'react';
import { modules, phases } from '../data/content';
import { site } from '../data/site';
import CakeBuild from './CakeBuild';

export default function Program() {
  const [step, setStep] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('[data-step]');
    if (!items?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setStep(Number(e.target.dataset.step)));
      },
      { rootMargin: '-42% 0px -52% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = modules[step - 1];
  const phase = phases.find((p) => step >= p.from && step <= p.to);

  return (
    <section id="program" className="relative overflow-clip py-16 sm:py-24 lg:py-36">
      <div aria-hidden="true" className="sjaj top-[20%] left-[-18%] size-[48rem]" />
      <div className="wrap relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow">Program edukacije</p>
            <h2 className="font-display text-naslov mt-5">
              Šta ćeš <span className="kurziv text-bobica">naučiti</span>?
            </h2>
          </div>
          <p className="self-end text-kakao text-pretty lg:col-span-5">
            Dvanaest modula, korak po korak: od prvih kora i filova do profesionalnog rada. Prati kako se torta
            slaže dok čitaš program.
          </p>
        </div>

        <div ref={listRef} className="relative mt-14 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-10">
          {/* Mobilni: kompaktna traka koja prati skrol */}
          <div className="sticky top-18 z-20 -mx-5 border-b border-okvir bg-vanila/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:hidden">
            <div className="flex items-center gap-4">
              <CakeBuild step={step} total={modules.length} className="h-28 w-[6.3rem] shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-display kurziv text-[1.15rem] leading-tight text-bobica">
                  {phase ? phase.title : site.program}
                </p>
                <p className="mt-1 truncate text-sm font-semibold">
                  {current ? `${current.number} · ${current.title}` : 'Skroluj kroz module'}
                </p>
                <Progress step={step} className="mt-2.5" />
              </div>
            </div>
          </div>

          {/* Desktop: velika torta sa strane */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 border border-okvir bg-krem p-3 shadow-otisak">
              <div className="border border-okvir/70 px-7 pt-7 pb-6">
              <div className="flex items-baseline justify-between gap-4">
                {phases.map((p) => (
                  <p
                    key={p.title}
                    className={`font-display kurziv text-[1.65rem] leading-none transition-colors duration-500 ${
                      phase === p ? 'text-bobica' : 'text-lan-tamni'
                    }`}
                  >
                    {p.title}
                  </p>
                ))}
              </div>
              <CakeBuild step={step} total={modules.length} className="mx-auto mt-4 block h-auto w-full max-w-[22rem] max-h-[52vh]" />
              <div className="mt-5 border-t border-okvir pt-5">
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="font-semibold">{current ? current.title : 'Prazna podloga'}</span>
                  <span className="shrink-0 text-kakao tabular-nums">{String(step).padStart(2, '0')} / {modules.length}</span>
                </div>
                <Progress step={step} className="mt-3" />
              </div>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {modules.map((m, i) => {
              const n = i + 1;
              const startsPhase = phases.find((p) => p.from === n);
              const active = step === n;
              return (
                <li key={m.number} data-step={n}>
                  {startsPhase && (
                    <div className={`flex items-baseline gap-4 ${n === 1 ? 'pt-8 lg:pt-0' : 'pt-16'}`}>
                      <span className="font-display kurziv text-[2.4rem] leading-none text-bobica">
                        {startsPhase.title}
                      </span>
                      <span className="text-sm text-kakao">— {startsPhase.note}</span>
                    </div>
                  )}
                  <article className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-b border-okvir py-9 sm:grid-cols-[4.5rem_1fr] sm:py-11">
                    <span
                      className={`font-display kurziv text-[1.9rem] leading-[0.95] transition-colors duration-500 sm:text-[2.4rem] ${
                        active ? 'text-bobica' : 'text-karamel'
                      }`}
                      aria-hidden="true"
                    >
                      {m.number}
                    </span>
                    <div>
                      <h3 className="font-display text-podnaslov">
                        <span className="sr-only">Modul {m.number}: </span>
                        {m.title}
                      </h3>
                      {m.body.length > 0 && (
                        <div className="mt-4 space-y-3 text-kakao">
                          {m.body.map((p) => (
                            <p key={p} className="text-pretty">{p}</p>
                          ))}
                        </div>
                      )}
                      {m.topics?.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Teme: ${m.title}`}>
                          {m.topics.map((t) => (
                            <li key={t} className="border border-okvir bg-krem px-3 py-1.5 text-[0.9rem] leading-snug text-espreso">
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Progress({ step, className = '' }) {
  return (
    <div className={`flex gap-1 ${className}`} aria-hidden="true">
      {modules.map((m, i) => (
        <span
          key={m.number}
          className={`h-[3px] flex-1 transition-colors duration-500 ${
            i < step ? (i < phases[0].to ? 'bg-karamel' : 'bg-bobica') : 'bg-lan'
          }`}
        />
      ))}
    </div>
  );
}
