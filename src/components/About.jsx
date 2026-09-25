import { story, instructor } from '../data/content';
import { site } from '../data/site';
import { Backdrop, Icon, Print } from './ui';

export default function About() {
  return (
    <>
      <section id="o-akademiji" className="relative overflow-clip py-16 sm:py-24 lg:py-36">
        <Backdrop src="/assets/pozadine/bozuri-senke-1920.webp" position="object-[70%_40%]" />
        <div className="wrap relative grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="self-start lg:sticky lg:top-28 lg:col-span-4">
            <p className="eyebrow">O akademiji</p>
            <Print
              className="mt-10 hidden max-w-[22rem] lg:block"
              src="/assets/radovi/secerno-cvece-detalj-640.webp"
              alt="Detalj šećernog cveća, orhideja i gipsofile na torti"
              width="640"
              height="640"
              ratio="aspect-[3/4]"
              caption="Detalj · šećerno cveće"
            />
          </div>

          <div className="lg:col-span-8 lg:pl-10">
            <h2 className="font-display text-naslov text-balance">
              Možda već <span className="kurziv text-bobica">praviš</span> torte.
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-[1.125rem] text-kakao">
              {story.paragraphs.map((p) => (
                <p key={p} className="text-pretty">{p}</p>
              ))}
            </div>

            <ul className="mt-14 max-w-3xl border-t border-okvir">
              {story.wants.map((w) => (
                <li key={w} className="flex gap-4 border-b border-okvir py-5">
                  <span aria-hidden="true" className="mt-[1.05rem] h-px w-4 shrink-0 bg-karamel" />
                  <span className="font-display text-podnaslov text-pretty">{w}</span>
                </li>
              ))}
            </ul>

            <p className="mt-14 max-w-3xl font-display text-podnaslov text-balance">
              {story.closingBefore} <span className="kurziv text-bobica">„{site.program}“</span>.
            </p>
            <p className="mt-5 max-w-2xl text-kakao text-pretty">{story.summary}</p>
          </div>
        </div>
      </section>

      <section id="o-predavacu" aria-labelledby="predavac-naslov" className="relative overflow-clip border-y border-okvir bg-puter py-16 sm:py-24 lg:py-32">
        <Backdrop src="/assets/pozadine/naked-torta-drvo-1920.webp" fade="puter" flip />
        <div aria-hidden="true" className="sjaj top-[-10%] left-[-12%] size-[44rem]" />

        <div className="wrap relative grid items-start gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <Print
              offset
              offsetTone="bobica"
              className="max-w-md pr-3 sm:pr-5 lg:max-w-none"
              src="/assets/maja/radionica-900.webp"
              alt="Maja u radnoj uniformi"
              width="900"
              height="1601"
              ratio="aspect-[4/5]"
              position="object-[50%_22%]"
              caption={
                <>
                  <span className="inline-flex items-center gap-2">
                    <Icon.Pin width="15" height="15" className="text-karamel-tamni" /> {site.location}
                  </span>
                  <span aria-hidden="true" className="text-karamel">·</span>
                  <a
                    href={site.instagram[0].url}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-10 items-center gap-2 underline decoration-okvir underline-offset-4 transition hover:text-espreso hover:decoration-karamel"
                  >
                    <Icon.Instagram width="15" height="15" className="text-karamel-tamni" /> @{site.instagram[0].handle}
                  </a>
                </>
              }
            />
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow">O predavaču</p>
            <h2 id="predavac-naslov" className="font-display text-naslov mt-5">
              Zovem se <span className="kurziv text-bobica">Maja</span>.
            </h2>
            <p className="mt-4 font-display kurziv text-podnaslov text-kakao">{instructor.intro}</p>

            <div className="mt-8 space-y-5 text-[1.075rem] text-kakao">
              {instructor.bio.map((p) => (
                <p key={p} className="text-pretty">{p}</p>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-2 border-y border-okvir">
              {instructor.facts.map((f, i) => (
                <div key={f.value} className={`py-6 ${i > 0 ? 'border-l border-okvir pl-6 sm:pl-8' : 'pr-6'}`}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-display text-[2rem] leading-none brojke">{f.value}</span>
                    <span className="mt-2 block text-sm text-kakao">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-16 font-display text-podnaslov">{instructor.whyTitle}</h3>
            <div className="mt-5 space-y-5 text-kakao">
              {instructor.why.map((p) => (
                <p key={p} className="text-pretty">{p}</p>
              ))}
            </div>

            <figure className="relative mt-12 border border-okvir bg-krem px-7 py-8 shadow-otisak sm:px-10 sm:py-10">
              <span aria-hidden="true" className="absolute -top-[3.9rem] left-6 font-display text-[4.5rem] leading-none text-bobica sm:left-9">
                „
              </span>
              <blockquote>
                <p className="font-display kurziv text-[clamp(1.45rem,1.05rem+1.4vw,2.15rem)] leading-[1.22] text-balance">
                  {instructor.quote}
                </p>
                <p className="mt-5 max-w-xl text-kakao text-pretty">{instructor.quoteFollow}</p>
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-karamel" />
                <span className="font-display kurziv text-[1.35rem] leading-none text-bobica-tamna">{site.instructor}</span>
                <span className="text-[0.72rem] font-semibold tracking-[0.18em] text-kakao uppercase">osnivačica akademije</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
