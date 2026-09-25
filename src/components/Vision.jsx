import { vision } from '../data/content';
import { site } from '../data/site';
import { EnrollButton } from './Access';
import { Backdrop } from './ui';

export default function Vision() {
  const [first, second] = site.program.split(' do ');

  return (
    <section aria-labelledby="vizija-naslov" className="relative overflow-clip bg-bobica-noc py-16 text-vanila sm:py-24 lg:py-36">
      <Backdrop src="/assets/pozadine/gipsofila-vece-1920.webp" fade="noc" position="object-[35%_50%]" />
      <div aria-hidden="true" className="sjaj-tamni top-[-20%] left-[-10%] size-[48rem]" />
      <div aria-hidden="true" className="sjaj-tamni right-[-15%] bottom-[-25%] size-[56rem]" />

      <div className="wrap relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow text-med!">{vision.title}</p>
            <h2 id="vizija-naslov" className="font-display text-naslov mt-5">
              To zavisi <span className="kurziv text-med">od tebe</span>.
            </h2>
          </div>

          {/* „Možda…“ rečenice rastu kao spratovi: od najbližih do sopstvene radionice */}
          <ol className="space-y-7 lg:col-span-7 lg:pt-3">
            {vision.maybes.map((line, i) => (
              <li
                key={line}
                className="border-l border-med/30 pl-6 font-display text-balance text-vanila/90"
                style={{
                  marginLeft: `${i * 1.5}rem`,
                  fontSize: `clamp(${1.3 + i * 0.2}rem, ${1 + i * 0.15}rem + ${1 + i * 0.35}vw, ${1.7 + i * 0.35}rem)`,
                  lineHeight: 1.22,
                }}
              >
                {line}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 grid gap-8 border-t border-vanila/15 pt-12 lg:grid-cols-12 lg:gap-10">
          <p className="font-display kurziv text-[1.75rem] leading-[1.18] text-med lg:col-span-5">{vision.honest[0]}</p>
          <p className="text-[1.1rem] text-vanila/75 text-pretty lg:col-span-7">{vision.honest[1]}</p>
        </div>

        <div className="mt-24 text-center lg:mt-32">
          <p className="font-display text-hero">
            <span className="block">{first}</span>
            <span className="kurziv block text-med">do {second}</span>
          </p>
          <p className="mx-auto mt-10 max-w-md font-display text-podnaslov text-vanila/90">
            {vision.finaleLines[0]}
            <br />
            <span className="kurziv">{vision.finaleLines[1]}</span>
          </p>
          <p className="mx-auto mt-8 max-w-xl text-vanila/70 text-pretty">{vision.finaleBody}</p>
          <p className="mx-auto mt-4 max-w-xl text-vanila/90 text-pretty">{vision.welcome}</p>
          <EnrollButton variant="light" className="mt-10">
            Upiši program
          </EnrollButton>
        </div>
      </div>
    </section>
  );
}
