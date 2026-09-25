import { hero } from '../data/content';
import { site } from '../data/site';
import { EnrollButton } from './Access';
import { Backdrop, Button, Seal } from './ui';

export default function Hero() {
  return (
    <section id="pocetak" className="relative overflow-clip pt-32 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32">
      <Backdrop src="/assets/pozadine/karamel-prozor-1920.webp" flip priority />
      <div aria-hidden="true" className="sjaj -top-48 right-[-18%] size-[52rem]" />
      <div aria-hidden="true" className="sjaj top-[38%] left-[-26%] size-[40rem]" />

      <div className="wrap relative grid items-center gap-20 lg:grid-cols-12 lg:gap-12">
        <div className="@container lg:col-span-6">
          {/* Tačka ispred svake stavke; ona na početku reda je odsečena */}
          <div className="izroni overflow-hidden">
            <ul className="-ml-5 flex flex-wrap items-center gap-y-1.5 text-[0.7rem] font-semibold tracking-[0.2em] text-karamel-tamni uppercase">
              {hero.marks.map((m) => (
                <li
                  key={m}
                  className="relative pr-1 pl-5 before:absolute before:top-1/2 before:left-[0.45rem] before:size-[3px] before:-translate-y-1/2 before:rotate-45 before:bg-karamel"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Veličina naslova prati širinu kolone, pa „do savršenstva“ uvek staje u jedan red */}
          <h1 className="font-display mt-8 text-[clamp(2.5rem,14.4cqi,6.5rem)] leading-[0.98]">
            <span className="izroni block whitespace-nowrap [animation-delay:80ms]">{hero.titleTop}</span>
            {/* razmak za pretraživače i čitače ekrana (blokovi se vizuelno razdvajaju sami) */}
            {' '}
            <span className="izroni kurziv block pl-[0.6em] whitespace-nowrap text-bobica [animation-delay:180ms]">
              {hero.titleBottom}
            </span>
          </h1>

          <p className="izroni mt-9 max-w-[33rem] text-[1.1rem] leading-relaxed text-kakao text-pretty [animation-delay:300ms]">
            {hero.lead}
          </p>

          <div className="izroni mt-10 flex flex-wrap items-center gap-3 [animation-delay:400ms]">
            <EnrollButton>Upiši program</EnrollButton>
            <Button href="#program" variant="secondary" arrow={false}>
              Pregled modula
            </Button>
          </div>

          <p className="izroni mt-9 inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 rounded-2xl border border-zalfija/30 bg-zalfija-magla/85 px-4 py-2 text-[0.8rem] leading-snug text-zalfija-tamna backdrop-blur-sm sm:rounded-full [animation-delay:500ms]">
            <span aria-hidden="true" className="text-zalfija">✦</span>
            <span className="font-semibold text-espreso">Upis za {site.cohort}</span>
            <span aria-hidden="true" className="text-zalfija">•</span>
            <span>Ograničen broj mesta</span>
          </p>
        </div>

        <div className="lg:col-span-6">
          <Collage />
        </div>
      </div>
    </section>
  );
}

// Urednički kolaž: portret i detalj torte kao otisci na obojenim kartonima, pečat i citat
function Collage() {
  return (
    <div className="relative mx-auto mb-28 w-full max-w-[34rem] sm:mb-20 lg:mb-10 lg:max-w-none xl:pl-4">
      <div aria-hidden="true" className="sjaj top-[10%] left-[-10%] h-[90%] w-[120%]" />
      <div className="relative aspect-[10/11.6]">
        {/* Medeni karton pomeren 8px dijagonalno iza portreta */}
        <div aria-hidden="true" className="izroni absolute top-0 left-[26%] h-[70%] w-[64%] translate-x-2 translate-y-2 bg-med-svetli [animation-delay:60ms]" />

        <figure className="izroni absolute top-0 left-[26%] h-[70%] w-[64%] [animation-delay:140ms]">
          <div className="size-full border border-okvir bg-krem p-2 shadow-otisak sm:p-3">
            <img
              src="/assets/maja/portret-1080.webp"
              srcSet="/assets/maja/portret-640.webp 640w, /assets/maja/portret-1080.webp 1080w"
              sizes="(min-width: 1024px) 34vw, 62vw"
              alt="Maja, osnivačica Cool Cakes Akademije, pored spratne torte sa motivom džungle"
              width="1081"
              height="1455"
              fetchPriority="high"
              className="size-full object-cover object-[50%_32%]"
            />
          </div>
        </figure>

        {/* Ružičasti karton iza detalja torte */}
        <div aria-hidden="true" className="izroni absolute top-[44%] left-0 h-[38%] w-[36%] -translate-x-2 translate-y-2 bg-bobica-svetla [animation-delay:300ms]" />
        <figure className="izroni absolute top-[44%] left-0 h-[38%] w-[36%] [animation-delay:360ms]">
          <div className="size-full border border-okvir bg-krem p-1.5 shadow-otisak sm:p-2.5">
            <img
              src="/assets/detalji/bozur-zlatni-listic-480.webp"
              srcSet="/assets/detalji/bozur-zlatni-listic-480.webp 480w, /assets/detalji/bozur-zlatni-listic-780.webp 780w"
              sizes="(min-width: 1024px) 20vw, 36vw"
              alt="Detalj torte: božur, lepeza od suvog lista i zlatne linije na kremu"
              width="480"
              height="640"
              className="size-full object-cover"
            />
          </div>
        </figure>

        <div className="izroni absolute top-[-6%] right-0 w-[clamp(6.5rem,24%,9rem)] [animation-delay:520ms]">
          <Seal text="Cool Cakes Akademija • Beograd • 2026 •" />
        </div>

        <figure className="izroni absolute top-[74%] right-0 left-[6%] border border-okvir bg-krem px-5 pt-7 pb-5 shadow-otisak sm:top-[63%] sm:left-[34%] sm:px-6 sm:pt-8 [animation-delay:640ms]">
          <span aria-hidden="true" className="absolute -top-[2.6rem] left-4 font-display text-[4.25rem] leading-none text-bobica sm:left-5">
            „
          </span>
          <blockquote>
            <p className="font-display kurziv text-[clamp(1.05rem,0.85rem+0.75vw,1.32rem)] leading-[1.38] text-espreso text-pretty">
              {hero.quote.text}
            </p>
          </blockquote>
          <figcaption className="mt-3.5 flex items-center gap-2.5 text-[0.72rem] font-semibold tracking-[0.18em] text-bobica uppercase">
            <span aria-hidden="true" className="h-px w-5 bg-karamel" />
            {hero.quote.author}
            <span className="font-medium tracking-[0.12em] text-kakao normal-case">· osnivačica akademije</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
