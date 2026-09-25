import { audience } from '../data/content';
import { CheckMark, Print } from './ui';

export default function Audience() {
  return (
    <section id="kome-je-namenjen" className="relative overflow-clip border-t border-zalfija/15 bg-zalfija-magla py-16 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="sjaj right-[-14%] bottom-[-10%] size-[46rem]" />

      <div className="wrap relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
            <p className="eyebrow">Za koga je program</p>
            <h2 className="font-display text-naslov mt-5 text-balance">
              Kome je program <span className="kurziv text-bobica">namenjen</span>?
            </h2>
            <Print
              offset
              className="mt-12 hidden max-w-[21rem] pr-5 lg:block"
              src="/assets/radovi/tratincice-prvi-rodjendan-640.webp"
              alt="Trospratna torta u bež tonu sa tratinčicama"
              width="640"
              height="1137"
              ratio="aspect-[4/5]"
              position="object-[50%_62%]"
              caption="Tratinčice · prvi rođendan"
            />
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <p className="font-display kurziv text-podnaslov text-bobica">{audience.intro}</p>
            <ul className="mt-6 grid gap-x-10 border-t border-zalfija/20 sm:grid-cols-2 sm:border-t-0">
              {audience.items.map((item) => (
                <li key={item} className="flex gap-3.5 border-b border-zalfija/20 py-4 text-[1.05rem] text-pretty sm:first:border-t sm:[&:nth-child(2)]:border-t">
                  <CheckMark />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {audience.notes.map((note) => (
                <article key={note.title} className="border border-okvir bg-krem p-2.5 shadow-otisak">
                  <div className="h-full border border-okvir/70 p-6 sm:p-7">
                    <h3 className="font-display text-[1.6rem] leading-[1.15] text-balance">{note.title}</h3>
                    <div className="mt-4 space-y-3 text-[0.98rem] text-kakao">
                      {note.body.map((p) => (
                        <p key={p} className="text-pretty">{p}</p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
